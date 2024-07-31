import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kayit.css';

const languages = {
  en: 'English',
  ru: 'русский',
  tr: 'Türkçe',
  fr: 'Français',
  ar: 'اختر لغتك',
  zh: '中文',
  de: 'Deutsch',
  es: 'Español'
};

const languagePrompts = {
  en: 'Choose your language',
  ru: 'Выберите ваш язык',
  tr: 'Dil Seçiniz',
  fr: 'Choisissez votre langue',
  ar: 'اختر لغتك',
  zh: '选择你的语言',
  de: 'Wähle deine Sprache',
  es: 'Elige tu idioma'
};

const Kayit = ({ onSelectLanguage }) => {
  const [currentLanguage, setCurrentLanguage] = useState(languagePrompts.en);
  const languageKeys = Object.keys(languages);
  const languageIndex = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLanguage(languagePrompts[languageKeys[languageIndex.current]]);
      languageIndex.current = (languageIndex.current + 1) % languageKeys.length;
    }, 1000);

    return () => clearInterval(interval);
  }, [languageKeys]);

  const handleLanguageSelect = (language) => {
    localStorage.setItem('selectedLanguage', language);
    onSelectLanguage(language);
    navigate('/wallet');
  };

  return (
    <div className="container">
      <img src="/kayit/logoo.png" alt="Logo" className="logo" />
      <div className="current-language">{currentLanguage}</div>
      <div className="language-container">
        {languageKeys.map((key) => (
          <button
            key={key}
            className="language-button"
            onClick={() => handleLanguageSelect(key)}
          >
            <span className="language-text">{languages[key]}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Kayit;
