import React from 'react';
import './FinancialRatios.css';

function FinancialRatios() {
  const ratios = [
    {
      category: 'Liquidity Ratios',
      ratios: [
        {
          name: 'Current Ratio',
          formula: 'Current Assets / Current Liabilities',
          interpretation: 'Measures a company\'s ability to pay short-term obligations. A ratio above 1 indicates good short-term financial health.',
          calculation: 'Cash + Short-term Investments + Accounts Receivable + Inventory / Accounts Payable + Short-term Debt + Other Current Liabilities'
        },
        {
          name: 'Quick Ratio',
          formula: '(Current Assets - Inventory) / Current Liabilities',
          interpretation: 'A more conservative measure of liquidity that excludes inventory. A ratio above 1 is generally considered good.',
          calculation: '(Cash + Short-term Investments + Accounts Receivable) / (Accounts Payable + Short-term Debt + Other Current Liabilities)'
        }
      ]
    },
    {
      category: 'Profitability Ratios',
      ratios: [
        {
          name: 'Gross Profit Margin',
          formula: 'Gross Profit / Revenue',
          interpretation: 'Shows the percentage of revenue that exceeds the cost of goods sold. Higher margins indicate better efficiency.',
          calculation: '(Revenue - Cost of Goods Sold) / Revenue'
        },
        {
          name: 'Operating Margin',
          formula: 'Operating Income / Revenue',
          interpretation: 'Measures how much profit a company makes from its operations before interest and taxes.',
          calculation: 'Operating Income / Revenue'
        },
        {
          name: 'Net Profit Margin',
          formula: 'Net Income / Revenue',
          interpretation: 'Shows the percentage of revenue that remains as profit after all expenses.',
          calculation: 'Net Income / Revenue'
        },
        {
          name: 'Return on Assets (ROA)',
          formula: 'Net Income / Total Assets',
          interpretation: 'Indicates how efficiently a company uses its assets to generate profit.',
          calculation: 'Net Income / (Current Assets + Long-term Assets)'
        },
        {
          name: 'Return on Equity (ROE)',
          formula: 'Net Income / Shareholders\' Equity',
          interpretation: 'Measures the return generated on shareholders\' investment.',
          calculation: 'Net Income / (Common Stock + Retained Earnings + Capital Surplus)'
        }
      ]
    },
    {
      category: 'Efficiency Ratios',
      ratios: [
        {
          name: 'Asset Turnover',
          formula: 'Revenue / Total Assets',
          interpretation: 'Shows how efficiently a company uses its assets to generate sales.',
          calculation: 'Revenue / (Current Assets + Long-term Assets)'
        },
        {
          name: 'Inventory Turnover',
          formula: 'Cost of Goods Sold / Average Inventory',
          interpretation: 'Indicates how many times a company sells and replaces its inventory in a period.',
          calculation: 'Cost of Goods Sold / Inventory'
        },
        {
          name: 'Receivables Turnover',
          formula: 'Revenue / Accounts Receivable',
          interpretation: 'Measures how efficiently a company collects on its credit sales.',
          calculation: 'Revenue / Accounts Receivable'
        }
      ]
    },
    {
      category: 'Leverage Ratios',
      ratios: [
        {
          name: 'Debt-to-Equity Ratio',
          formula: 'Total Debt / Shareholders\' Equity',
          interpretation: 'Measures a company\'s financial leverage and risk. Lower ratios indicate less risk.',
          calculation: '(Short-term Debt + Long-term Debt) / (Common Stock + Retained Earnings + Capital Surplus)'
        },
        {
          name: 'Debt-to-Assets Ratio',
          formula: 'Total Debt / Total Assets',
          interpretation: 'Shows the percentage of assets financed by debt. Lower ratios indicate less risk.',
          calculation: '(Short-term Debt + Long-term Debt) / (Current Assets + Long-term Assets)'
        }
      ]
    }
  ];

  return (
    <div className="financial-ratios">
      <h2>Financial Ratios Guide</h2>
      <p className="ratios-intro">
        Financial ratios are powerful tools for analyzing a company's financial health and performance.
        Below are the key ratios organized by category, with their formulas and interpretations.
      </p>
      
      {ratios.map((category, index) => (
        <div key={index} className="ratio-category">
          <h3>{category.category}</h3>
          <div className="ratios-grid">
            {category.ratios.map((ratio, ratioIndex) => (
              <div key={ratioIndex} className="ratio-card">
                <h4>{ratio.name}</h4>
                <div className="ratio-formula">
                  <span className="formula-label">Formula:</span>
                  <span className="formula">{ratio.formula}</span>
                </div>
                <div className="ratio-calculation">
                  <span className="calculation-label">Calculation:</span>
                  <span className="calculation">{ratio.calculation}</span>
                </div>
                <p className="ratio-interpretation">{ratio.interpretation}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FinancialRatios; 