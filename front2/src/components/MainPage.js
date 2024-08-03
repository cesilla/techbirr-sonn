import React, { useEffect, useState, useMemo } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import './WalletConnector.css';
import { TonProofDemoApi } from './TonProofDemoApiService';

const WalletConnector = ({ onConnectWallet, selectedLanguage }) => {
  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [currentLanguageIndex, setCurrentLanguageIndex] = useState(0);

  const navigate = useNavigate(); // Initialize navigate function

  const languages = useMemo(
    () => ({
      en: ['Connect Wallet'],
      tr: ['Cüzdanı Bağla'],
      es: ['Conectar Cartera'],
      fr: ['Connecter le Portefeuille'],
      zh: ['接钱包'],
      ar: ['اتصل بالمحفظة'],
      de: ['Verbinden Sie die Geldbörse'],
      ru: ['Подключить кошелек'],
    }),
    []
  );

  const [tonConnectUI] = useTonConnectUI();

  useEffect(() => {
    const storedWallet = localStorage.getItem('wallet');
    if (storedWallet) {
      const walletData = JSON.parse(storedWallet);
      setWallet(walletData);
      setAddress(walletData.account.address);
      setBalance(walletData.balance);

      // Eğer cüzdan bağlıysa, otomatik olarak yönlendir
      console.log('Wallet is already connected. Redirecting to /main.');
      navigate('/main');
    }

    const languageInterval = setInterval(() => {
      setCurrentLanguageIndex((prev) => (prev + 1) % (languages[selectedLanguage]?.length || languages['en'].length));
    }, 3000);

    return () => clearInterval(languageInterval);
  }, [languages, selectedLanguage, navigate]);

  const isMobile = () => {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  };

  const connectWallet = async () => {
    try {
      if (wallet) {
        console.log('Wallet is already connected. Redirecting to /main.');
        navigate('/main'); // Yönlendirme
        return;
      }

      console.log('Attempting to connect to the wallet...');

      const connectResult = await tonConnectUI.connectWallet({
        universalLink: isMobile() ? undefined : 'https://tonkeeper.app',
      });

      console.log('Wallet connection result:', connectResult);

      if (connectResult.wallet) {
        const walletState = connectResult.wallet;
        const walletAddress = walletState.account.address;
        console.log('Connected wallet address:', walletAddress);

        const balance = await fetchBalance(walletAddress);
        console.log('Fetched balance:', balance);

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
          console.log('Checking Ton Proof...');
          await TonProofDemoApi.checkProof(connectResult.tonProof.proof, connectResult.account);
        }

        // Başarılı bağlantıdan sonra yönlendirme
        navigate('/main');
      }
    } catch (error) {
      console.error('Ton Wallet connection failed:', error);
    }
  };

  const disconnectWallet = () => {
    console.log('Disconnecting wallet...');
    tonConnectUI.disconnect();
    setWallet(null);
    setAddress('');
    setBalance('');
    localStorage.removeItem('wallet');
    TonProofDemoApi.reset();
  };

  const fetchBalance = async (address) => {
    try {
      console.log('Fetching balance for address:', address);
      const response = await fetch(`https://tonapi.io/v1/account/getInfo?account=${address}`);
      const data = await response.json();
      console.log('Balance fetched:', data.balance);
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
            <button className="wallet-button" onClick={disconnectWallet}>
              Disconnect Wallet
            </button>
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
