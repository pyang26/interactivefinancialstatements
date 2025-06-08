import React, { useState } from 'react';
import './App.css';
import IncomeStatement from './components/IncomeStatement';
import BalanceSheet from './components/BalanceSheet';
import CashFlowStatement from './components/CashFlowStatement';
import TickerInput from './components/TickerInput';
import About from './components/About';

function App() {
  const [activeStatement, setActiveStatement] = useState('income');
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [financialData, setFinancialData] = useState(null);
  const [activePage, setActivePage] = useState('main'); // 'main' or 'about'

  const handleStatementChange = (statement) => {
    setActiveStatement(statement);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 500);
  };

  const handleDataLoaded = (data) => {
    console.log('Data loaded:', data);
    setFinancialData(data);
    setLastUpdated(new Date());
  };

  const renderStatement = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading"></div>
        </div>
      );
    }

    switch (activeStatement) {
      case 'income':
        return <IncomeStatement initialData={financialData?.incomeStatement} />;
      case 'balance':
        return <BalanceSheet initialData={financialData?.balanceSheet} />;
      case 'cashflow':
        return <CashFlowStatement initialData={financialData?.cashFlowStatement} />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (activePage === 'about') {
      return <About />;
    }

    return (
      <>
        <TickerInput onDataLoaded={handleDataLoaded} />
        
        <div className="nav-buttons">
          <button
            className={`nav-button ${activeStatement === 'income' ? 'active' : ''}`}
            onClick={() => handleStatementChange('income')}
            data-tooltip="View Income Statement"
          >
            Income Statement
          </button>
          <button
            className={`nav-button ${activeStatement === 'balance' ? 'active' : ''}`}
            onClick={() => handleStatementChange('balance')}
            data-tooltip="View Balance Sheet"
          >
            Balance Sheet
          </button>
          <button
            className={`nav-button ${activeStatement === 'cashflow' ? 'active' : ''}`}
            onClick={() => handleStatementChange('cashflow')}
            data-tooltip="View Cash Flow Statement"
          >
            Cash Flow Statement
          </button>
        </div>

        <div className="statement-container">
          {renderStatement()}
        </div>

        <div className="last-updated">
          Last updated: {lastUpdated.toLocaleString()}
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Interactive Financial Statements</h1>
        <nav className="main-nav">
          <button
            className={`nav-link ${activePage === 'main' ? 'active' : ''}`}
            onClick={() => setActivePage('main')}
          >
            Financial Data
          </button>
          <button
            className={`nav-link ${activePage === 'about' ? 'active' : ''}`}
            onClick={() => setActivePage('about')}
          >
            About
          </button>
        </nav>
      </header>
      
      {renderContent()}
    </div>
  );
}

export default App;
