import React, { useState, useEffect } from 'react';
import './App.css';
import IncomeStatement from './components/IncomeStatement';
import BalanceSheet from './components/BalanceSheet';
import CashFlow from './components/CashFlow';
import TickerInput from './components/TickerInput';
import About from './components/About';
import FinancialRatios from './components/FinancialRatios';
import Settings from './components/Settings';

function App() {
  const [activeTab, setActiveTab] = useState('balance');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [financialData, setFinancialData] = useState(null);
  const [theme, setTheme] = useState({
    darkMode: false,
    secondaryColor: '#00bcd4'
  });

  useEffect(() => {
    // Load saved theme preferences
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const savedColor = localStorage.getItem('secondaryColor') || '#00bcd4';
    setTheme({
      darkMode: savedDarkMode,
      secondaryColor: savedColor
    });
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    // Update CSS variables
    document.documentElement.style.setProperty('--secondary-color', newTheme.secondaryColor);
    if (newTheme.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const handleDataLoaded = (data) => {
    setFinancialData(data);
    setLastUpdated(new Date());
  };

  const handleStatementChange = (statement) => {
    setActiveTab(statement);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Interactive Financial Statements</h1>
        <TickerInput onDataLoaded={handleDataLoaded} />
      </header>

      <nav className="app-nav">
        <button
          className={activeTab === 'balance' ? 'active' : ''}
          onClick={() => handleStatementChange('balance')}
        >
          Balance Sheet
        </button>
        <button
          className={activeTab === 'income' ? 'active' : ''}
          onClick={() => handleStatementChange('income')}
        >
          Income Statement
        </button>
        <button
          className={activeTab === 'cashflow' ? 'active' : ''}
          onClick={() => handleStatementChange('cashflow')}
        >
          Cash Flow
        </button>
        <button
          className={activeTab === 'ratios' ? 'active' : ''}
          onClick={() => handleStatementChange('ratios')}
        >
          Financial Ratios
        </button>
        <button
          className={activeTab === 'about' ? 'active' : ''}
          onClick={() => handleStatementChange('about')}
        >
          About
        </button>
        <button
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => handleStatementChange('settings')}
        >
          Settings
        </button>
      </nav>

      <main className="app-main">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          <>
            {activeTab === 'balance' && <BalanceSheet initialData={financialData?.balanceSheet} />}
            {activeTab === 'income' && <IncomeStatement initialData={financialData?.incomeStatement} />}
            {activeTab === 'cashflow' && <CashFlow initialData={financialData?.cashFlowStatement} />}
            {activeTab === 'ratios' && <FinancialRatios financialData={financialData} />}
            {activeTab === 'about' && <About />}
            {activeTab === 'settings' && <Settings onThemeChange={handleThemeChange} />}
          </>
        )}
      </main>

      <div className="last-updated">
        Last updated: {lastUpdated.toLocaleString()}
      </div>
    </div>
  );
}

export default App;
