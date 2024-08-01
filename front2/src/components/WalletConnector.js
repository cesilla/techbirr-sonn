import React, { useEffect, useState, useMemo } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom'; // useNavigate import edin
import './WalletConnector.css';
import { TonProofDemoApi } from './TonProofDemoApiService';

const WalletConnector = ({ onConnectWallet, selectedLanguage }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const navigate = useNavigate(); // useNavigate hook'u kullanarak navigate fonksiyonunu alın

  const languages = useMemo(() => ({
    en: ['Connect Wallet'],
    tr: ['Cüzdanı Bağla'],
    es: ['Conectar Cartera'],
    fr: ['Connecter le Portefeuille'],
    zh: ['接钱包'],
    ar: ['اتصل بالمحفظة'],
    de: ['Verbinden Sie die Geldbörse'],
    ru: ['Подключить кошелек']
  }), []);

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      setAddress(walletData.account.address);
      setBalance(walletData.balance);
    }

    const languageInterval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % (languages[selectedLanguage]?.length || languages['en'].length));
    }, 3000);

    return () => clearInterval(languageInterval);
  }, [languages, selectedLanguage]);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const connectWallet = async () => {
    try {
      if (tonConnectUI.connected) {
        return;
      }

      const connectResult = await tonConnectUI.connectWallet({
        universalLink: isMobile() ? undefined : 'https://tonkeeper.app',
      });

      const walletState = connectResult.wallet;
      const walletAddress = walletState.account.address;
      const balance = await fetchBalance(walletAddress);

      const walletData = {
        account: { address: walletAddress },
        balance,
      };

      setWallet(walletData);
      setAddress(walletAddress);
      setBalance(balance);

      localStorage.setItem('wallet', JSON.stringify(walletData));
      onConnectWallet(walletData);

      if (connectResult.tonProof) {
        await TonProofDemoApi.checkProof(connectResult.tonProof.proof, connectResult.account);
      }

      navigate('/main'); // Cüzdana bağlanır bağlanmaz MainPage'e yönlendir

    } catch (error) {
      console.error('Ton Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    tonConnectUI.disconnect();
    setWallet(null);
    setAddress('');
    setBalance('');
    localStorage.removeItem('wallet');
    TonProofDemoApi.reset();
  };

  const fetchBalance = async (address) => {
    try {
      const response = await fetch(`https://tonapi.io/v1/account/getInfo?account=${address}`);
      const data = await response.json();
      return data.balance;
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      return 'N/A';
    }
  };

  return (
    <div className="wallet-connector-container">
      <div className="wallet-connector">
        {wallet ? (
          <div className="wallet-info slide-in">
            <p>Connected wallet address: {address}</p>
            <p>Your balance: {balance}</p>
            <button className="wallet-button" onClick={disconnectWallet}>Disconnect Wallet</button>
          </div>
        ) : (
          <button className="wallet-button slide-in-bottom" onClick={connectWallet}>
            {languages[selectedLanguage]?.[currentLanguageIndex] || languages['en'][currentLanguageIndex]}
          </button>
        )}
      </div>
    </div>
  );
};

export default WalletConnector;
