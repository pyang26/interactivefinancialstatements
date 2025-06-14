import React, { useState } from 'react';
import './FinancialInfoPanel.css';

function FinancialInfoPanel({ category, explanation, importance, analysis, ratios, onClose }) {
  const [activeTab, setActiveTab] = useState('explanation');

  const renderContent = () => {
    switch (activeTab) {
      case 'explanation':
        return (
          <div className="info-content">
            <h3>What is {category}?</h3>
            <p>{explanation}</p>
          </div>
        );
      case 'importance':
        return (
          <div className="info-content">
            <h3>Why is {category} Important?</h3>
            <div className="importance-points">
              <div className="importance-point">
                <h4>Business Health</h4>
                <p>{importance}</p>
              </div>
              <div className="importance-point">
                <h4>Investor Insight</h4>
                <p>Helps investors evaluate the company's performance and potential</p>
              </div>
              <div className="importance-point">
                <h4>Strategic Planning</h4>
                <p>Guides management decisions and future business strategies</p>
              </div>
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="info-content">
            <h3>How to Analyze {category}</h3>
            <div className="analysis-steps">
              <div className="analysis-step">
                <span className="step-number">1</span>
                <h4>Compare to Previous Periods</h4>
                <p>{analysis}</p>
              </div>
              <div className="analysis-step">
                <span className="step-number">2</span>
                <h4>Industry Comparison</h4>
                <p>Compare with competitors and industry averages</p>
              </div>
              <div className="analysis-step">
                <span className="step-number">3</span>
                <h4>Ratio Analysis</h4>
                <p>Calculate relevant financial ratios</p>
              </div>
            </div>
          </div>
        );
      case 'ratios':
        return (
          <div className="info-content">
            <h3>Key Ratios for {category}</h3>
            <div className="ratios-container">
              {ratios ? ratios.map((ratio, index) => (
                <div key={index} className="ratio-card">
                  <h4>{ratio.name}</h4>
                  <div className="ratio-formula">
                    <span className="formula-label">Formula:</span>
                    <span className="formula">{ratio.formula}</span>
                  </div>
                  <p className="ratio-interpretation">{ratio.interpretation}</p>
                </div>
              )) : (
                <p>No specific ratios available for this category.</p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="financial-info-panel">
      <div className="info-header">
        <h2>{category}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="info-tabs">
        <button 
          className={`tab-button ${activeTab === 'explanation' ? 'active' : ''}`}
          onClick={() => setActiveTab('explanation')}
        >
          Explanation
        </button>
        <button 
          className={`tab-button ${activeTab === 'importance' ? 'active' : ''}`}
          onClick={() => setActiveTab('importance')}
        >
          Importance
        </button>
        <button 
          className={`tab-button ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          Analysis
        </button>
        <button 
          className={`tab-button ${activeTab === 'ratios' ? 'active' : ''}`}
          onClick={() => setActiveTab('ratios')}
        >
          Ratios
        </button>
      </div>
      {renderContent()}
    </div>
  );
}

export default FinancialInfoPanel; 