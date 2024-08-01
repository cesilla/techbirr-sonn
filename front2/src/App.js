import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TonConnectUIProvider, THEME } from "@tonconnect/ui-react";
import WalletConnector from './components/WalletConnector';
import Kayit from './components/Kayit';
import MainPage from './components/MainPage';
import PrayerTimes from './components/PrayerTimes';
import DailyPrayers from './components/DailyPrayers';
import Hadiths from './components/Hadiths';
import Dhikr from './components/Dhikr';
import NamesOfAllah from './components/AllahIsimleri';
import Sacrifice from './components/Sacrifice';
import NonVisualization from './components/NonVisualization';
import DAO from './components/DAO';
import SurahList2 from './components/SurahList2';
import SurahTranslation from './components/SurahTranslation';
import SurahOriginal from './components/SurahOriginal';
import ProfilePage from './components/ProfilePage';
import NavBar from './components/Navbar';
import ToDoList from './components/ToDoList';
import NewPage from './components/NewPage';
import CalendarPage from './components/Calendar';
import SelectionPage from './components/SelectionPage';
import KiblaPage from './components/KiblaPage';
import SelectionPage2 from './components/SelectionPage21';
import './App.css';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [languageSelected, setLanguageSelected] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [data, setData] = useState(null);

  useEffect(() => {
    const walletStatus = localStorage.getItem('walletConnected') === 'true';
    const language = localStorage.getItem('selectedLanguage');
    setWalletConnected(walletStatus);
    setLanguageSelected(language !== null);
    setSelectedLanguage(language || 'en');

    axios.get('http://localhost:3000/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Network error:', error);
      });

    const botToken = '7309348405:AAEJmW2iw5zLkbhuEFg0kMlQIxyFpcEaZ0M';

    const setWebhook = async () => {
      const url = `https://api.telegram.org/bot${botToken}/setWebhook?url=https://main--lustrous-mousse-6b5222.netlify.app/`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error setting webhook:', error);
      }
    };

    setWebhook();
  }, []);

  return (
    <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
    >
      <Router>
        <AppWithRouter
          walletConnected={walletConnected}
          languageSelected={languageSelected}
          selectedLanguage={selectedLanguage}
          setWalletConnected={setWalletConnected}
          setSelectedLanguage={setSelectedLanguage}
          data={data}
        />
      </Router>
    </TonConnectUIProvider>
  );
}

function AppWithRouter({
  walletConnected,
  languageSelected,
  selectedLanguage,
  setWalletConnected,
  setSelectedLanguage,
  data
}) {
  const navigate = useNavigate();

  const handleWalletConnection = () => {
    setWalletConnected(true);
    localStorage.setItem('walletConnected', 'true');
    navigate('/main', { state: { language: selectedLanguage } }); // Dil bilgisi ile yönlendir
  };

  const handleLanguageSelection = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <div className="App">
      {walletConnected && languageSelected && <NavBar />}
      <Routes>
        <Route path="/wallet" element={<WalletConnector onConnectWallet={handleWalletConnection} selectedLanguage={selectedLanguage} />} />
        <Route path="/kayit" element={<Kayit onSelectLanguage={handleLanguageSelection} />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/prayer-times" element={<PrayerTimes />} />
        <Route path="/daily-prayers" element={<DailyPrayers />} />
        <Route path="/hadiths" element={<Hadiths />} />
        <Route path="/dhikr" element={<Dhikr />} />
        <Route path="/names-of-allah" element={<NamesOfAllah />} />
        <Route path="/quran-verses" element={<SurahList2 />} />
        <Route path="/surah-translation/:surahNumber" element={<SurahTranslation />} />
        <Route path="/sacrifice" element={<Sacrifice />} />
        <Route path="/non-visualization" element={<NonVisualization />} />
        <Route path="/dao" element={<DAO />} />
        <Route path="/surah-original/:surahNumber" element={<SurahOriginal />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/todo-list" element={<ToDoList />} />
        <Route path="/new-page" element={<NewPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/selection" element={<SelectionPage />} />
        <Route path="/kibla" element={<KiblaPage />} />
        <Route path="/selection21" element={<SelectionPage2 />} />
        <Route
          path="/"
          element={
            !languageSelected ? (
              <Navigate to="/kayit" />
            ) : !walletConnected ? (
              <Navigate to="/wallet" />
            ) : (
              <Navigate to="/main" />
            )
          }
        />
      </Routes>
      <header className="App-header">
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
