import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About Interactive Financial Statements</h1>
      
      <section className="about-section">
        <h2>Our Purpose</h2>
        <p>
          Interactive Financial Statements is an educational tool designed to make financial data more accessible and understandable. 
          Our goal is to help users not only view company financial data but also understand what each metric means and how it impacts 
          a company's financial health.
        </p>
      </section>

      <section className="about-section">
        <h2>Understanding Financial Statements</h2>
        
        <div className="statement-section">
          <h3>Income Statement</h3>
          <p>
            The Income Statement shows a company's financial performance over a specific period. Key metrics include:
          </p>
          <ul>
            <li><strong>Total Revenue:</strong> The total amount of money earned from sales of goods or services</li>
            <li><strong>Gross Profit:</strong> Revenue minus the cost of goods sold</li>
            <li><strong>Operating Income:</strong> Profit after operating expenses but before interest and taxes</li>
            <li><strong>Net Income:</strong> The final profit after all expenses, including taxes and interest</li>
          </ul>
        </div>

        <div className="statement-section">
          <h3>Balance Sheet</h3>
          <p>
            The Balance Sheet provides a snapshot of a company's financial position at a specific point in time. It shows:
          </p>
          <ul>
            <li><strong>Assets:</strong> What the company owns (cash, investments, property, etc.)</li>
            <li><strong>Liabilities:</strong> What the company owes (debts, accounts payable, etc.)</li>
            <li><strong>Shareholders' Equity:</strong> The difference between assets and liabilities</li>
          </ul>
        </div>

        <div className="statement-section">
          <h3>Cash Flow Statement</h3>
          <p>
            The Cash Flow Statement tracks the movement of cash in and out of the business. It includes:
          </p>
          <ul>
            <li><strong>Operating Activities:</strong> Cash generated from day-to-day business operations</li>
            <li><strong>Investing Activities:</strong> Cash used for or generated from investments</li>
            <li><strong>Financing Activities:</strong> Cash from loans, stock sales, or dividend payments</li>
          </ul>
        </div>
      </section>

      <section className="about-section">
        <h2>How to Use This Tool</h2>
        <ol>
          <li>Enter a stock ticker symbol (e.g., AAPL for Apple Inc.)</li>
          <li>View the company's financial statements</li>
          <li>Hover over any metric to see its definition and importance</li>
          <li>Compare different metrics to understand the company's financial health</li>
        </ol>
      </section>

      <section className="about-section">
        <h2>Data Source</h2>
        <p>
          This application uses real-time financial data from Alpha Vantage, providing accurate and up-to-date information 
          about publicly traded companies. The data is refreshed regularly to ensure you have access to the latest financial information.
        </p>
      </section>
    </div>
  );
};

export default About; 