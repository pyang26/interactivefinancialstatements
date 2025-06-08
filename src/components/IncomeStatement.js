import React, { useState, useEffect } from 'react';
import FinancialInfoPanel from './FinancialInfoPanel';

function IncomeStatement({ initialData }) {
  const [incomeData, setIncomeData] = useState({
    // Revenue
    totalRevenue: 394328000000,
    costOfRevenue: 214137000000,
    grossProfit: 180191000000,
    // Operating Expenses
    researchDevelopment: 29915000000,
    sellingGeneralAndAdmin: 24916000000,
    operatingExpense: 24916000000,
    operatingIncome: 125377000000,
    // Other Income/Expenses
    interestExpense: 3931000000,
    otherIncomeExpense: 0,
    incomeBeforeTax: 121446000000,
    // Income Taxes
    incomeTaxExpense: 16741000000,
    // Net Income
    netIncome: 96995000000,
    // EPS
    eps: 6.13,
    epsDiluted: 6.11,
    // Weighted Average Shares
    weightedAverageShares: 15821900000,
    weightedAverageSharesDiluted: 15821900000
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setIncomeData(initialData);
    }
  }, [initialData]);

  const formatCategoryName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1') // Add space before capital letters
      .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
      .trim();
  };

  const categoryExplanations = {
    totalRevenue: {
      short: "Total amount of money earned from selling goods and services before any deductions",
      long: "Total Revenue represents the total amount of money earned by a company from its business activities before any deductions. This includes all income from sales of products and services, as well as any other operating revenue. It's the starting point for calculating a company's profitability and is often referred to as the 'top line' of the income statement.",
      importance: "Total Revenue is crucial because it shows the company's ability to generate sales and grow its business. It's the foundation for all other financial metrics and directly impacts profitability.",
      analysis: "When analyzing Total Revenue, look for consistent growth over time, compare it to industry peers, and consider the company's market position and competitive advantages.",
      ratios: [
        {
          name: "Revenue Growth Rate",
          formula: "(Current Revenue - Previous Revenue) / Previous Revenue",
          interpretation: "Measures the rate at which a company's revenue is growing over time"
        },
        {
          name: "Revenue per Employee",
          formula: "Total Revenue / Number of Employees",
          interpretation: "Indicates how efficiently a company is generating revenue relative to its workforce"
        }
      ]
    },
    costOfRevenue: {
      short: "Direct costs attributable to the production of goods and services sold",
      long: "Cost of Revenue (also known as Cost of Goods Sold or COGS) represents the direct costs incurred in producing the goods or services that a company sells. This includes raw materials, direct labor, and manufacturing overhead. It's a key metric for understanding a company's gross profit margin.",
      importance: "Understanding Cost of Revenue helps investors and analysts determine how efficiently a company is producing its goods or services and how much profit it can make from each sale.",
      analysis: "Compare Cost of Revenue to Total Revenue to calculate gross margin, and track changes over time to identify efficiency improvements or cost increases.",
      ratios: [
        {
          name: "Gross Margin",
          formula: "(Total Revenue - Cost of Revenue) / Total Revenue",
          interpretation: "Shows the percentage of revenue that remains after accounting for direct costs"
        },
        {
          name: "Cost of Revenue to Revenue",
          formula: "Cost of Revenue / Total Revenue",
          interpretation: "Indicates what portion of revenue is consumed by direct costs"
        }
      ]
    },
    grossProfit: "Revenue minus cost of revenue, showing the profit before operating expenses",
    researchDevelopment: "Expenses incurred in developing new products and improving existing ones",
    sellingGeneralAndAdmin: "Expenses related to selling products and managing the business",
    operatingExpense: "Total expenses incurred in running the business operations",
    operatingIncome: "Profit earned from core business operations before interest and taxes",
    interestExpense: "Cost of borrowing money, including interest on loans and bonds",
    otherIncomeExpense: "Income or expenses from non-operating activities",
    incomeBeforeTax: "Profit before income taxes are deducted",
    incomeTaxExpense: "Taxes owed to government based on taxable income",
    netIncome: "Final profit after all expenses and taxes are deducted",
    eps: "Earnings per share, calculated as net income divided by number of shares",
    epsDiluted: "Earnings per share including potential shares from stock options and convertible securities",
    weightedAverageShares: "Average number of shares outstanding during the period",
    weightedAverageSharesDiluted: "Average number of shares including potential shares from stock options"
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseInfoPanel = () => {
    setSelectedCategory(null);
  };

  const handleChange = (field, value) => {
    setIncomeData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="income-statement">
      <div className="statement-header">
        <h2>Income Statement</h2>
        <p className="statement-description">
          The Income Statement shows the company's revenues, expenses, and profits over a period of time.
          Click on any category to learn more about what it means and how to analyze it.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Revenue</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('totalRevenue')}
              className="clickable-category"
              data-tooltip={categoryExplanations.totalRevenue.short}
            >
              {formatCategoryName('totalRevenue')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.totalRevenue}
                onChange={(e) => handleChange('totalRevenue', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('costOfRevenue')}
              className="clickable-category"
              data-tooltip={categoryExplanations.costOfRevenue.short}
            >
              {formatCategoryName('costOfRevenue')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.costOfRevenue}
                onChange={(e) => handleChange('costOfRevenue', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('grossProfit')}
              className="clickable-category"
              data-tooltip={categoryExplanations.grossProfit}
            >
              {formatCategoryName('grossProfit')}
            </td>
            <td>{formatCurrency(incomeData.grossProfit)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Operating Expenses</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('researchDevelopment')}
              className="clickable-category"
              data-tooltip={categoryExplanations.researchDevelopment}
            >
              {formatCategoryName('researchDevelopment')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.researchDevelopment}
                onChange={(e) => handleChange('researchDevelopment', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('sellingGeneralAndAdmin')}
              className="clickable-category"
              data-tooltip={categoryExplanations.sellingGeneralAndAdmin}
            >
              {formatCategoryName('sellingGeneralAndAdmin')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.sellingGeneralAndAdmin}
                onChange={(e) => handleChange('sellingGeneralAndAdmin', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('operatingExpense')}
              className="clickable-category"
              data-tooltip={categoryExplanations.operatingExpense}
            >
              {formatCategoryName('operatingExpense')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.operatingExpense}
                onChange={(e) => handleChange('operatingExpense', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('operatingIncome')}
              className="clickable-category"
              data-tooltip={categoryExplanations.operatingIncome}
            >
              {formatCategoryName('operatingIncome')}
            </td>
            <td>{formatCurrency(incomeData.operatingIncome)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Other Income/Expenses</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('interestExpense')}
              className="clickable-category"
              data-tooltip={categoryExplanations.interestExpense}
            >
              {formatCategoryName('interestExpense')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.interestExpense}
                onChange={(e) => handleChange('interestExpense', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherIncomeExpense')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherIncomeExpense}
            >
              {formatCategoryName('otherIncomeExpense')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.otherIncomeExpense}
                onChange={(e) => handleChange('otherIncomeExpense', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('incomeBeforeTax')}
              className="clickable-category"
              data-tooltip={categoryExplanations.incomeBeforeTax}
            >
              {formatCategoryName('incomeBeforeTax')}
            </td>
            <td>{formatCurrency(incomeData.incomeBeforeTax)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Income Taxes</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('incomeTaxExpense')}
              className="clickable-category"
              data-tooltip={categoryExplanations.incomeTaxExpense}
            >
              {formatCategoryName('incomeTaxExpense')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.incomeTaxExpense}
                onChange={(e) => handleChange('incomeTaxExpense', e.target.value)}
              />
            </td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Net Income</td>
          </tr>
          <tr className="total">
            <td 
              onClick={() => handleCategoryClick('netIncome')}
              className="clickable-category"
              data-tooltip={categoryExplanations.netIncome}
            >
              {formatCategoryName('netIncome')}
            </td>
            <td>{formatCurrency(incomeData.netIncome)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Earnings Per Share</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('eps')}
              className="clickable-category"
              data-tooltip={categoryExplanations.eps}
            >
              {formatCategoryName('eps')}
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                value={incomeData.eps}
                onChange={(e) => handleChange('eps', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('epsDiluted')}
              className="clickable-category"
              data-tooltip={categoryExplanations.epsDiluted}
            >
              {formatCategoryName('epsDiluted')}
            </td>
            <td>
              <input
                type="number"
                step="0.01"
                value={incomeData.epsDiluted}
                onChange={(e) => handleChange('epsDiluted', e.target.value)}
              />
            </td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Weighted Average Shares</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('weightedAverageShares')}
              className="clickable-category"
              data-tooltip={categoryExplanations.weightedAverageShares}
            >
              {formatCategoryName('weightedAverageShares')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.weightedAverageShares}
                onChange={(e) => handleChange('weightedAverageShares', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('weightedAverageSharesDiluted')}
              className="clickable-category"
              data-tooltip={categoryExplanations.weightedAverageSharesDiluted}
            >
              {formatCategoryName('weightedAverageSharesDiluted')}
            </td>
            <td>
              <input
                type="number"
                value={incomeData.weightedAverageSharesDiluted}
                onChange={(e) => handleChange('weightedAverageSharesDiluted', e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </table>

      {selectedCategory && (
        <FinancialInfoPanel
          category={formatCategoryName(selectedCategory)}
          explanation={categoryExplanations[selectedCategory].long}
          importance={categoryExplanations[selectedCategory].importance}
          analysis={categoryExplanations[selectedCategory].analysis}
          ratios={categoryExplanations[selectedCategory].ratios}
          onClose={handleCloseInfoPanel}
        />
      )}
    </div>
  );
}

export default IncomeStatement; 