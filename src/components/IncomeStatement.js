import React, { useState, useEffect } from 'react';

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

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setIncomeData(initialData);
    }
  }, [initialData]);

  const categoryExplanations = {
    totalRevenue: "Total amount of money earned from selling goods and services before any deductions",
    costOfRevenue: "Direct costs attributable to the production of goods and services sold",
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
          Hover over any category to learn more about what it means.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Revenue</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.totalRevenue}>Total Revenue</td>
            <td>
              <input
                type="number"
                value={incomeData.totalRevenue}
                onChange={(e) => handleChange('totalRevenue', e.target.value)}
                data-tooltip={categoryExplanations.totalRevenue}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.costOfRevenue}>Cost of Revenue</td>
            <td>
              <input
                type="number"
                value={incomeData.costOfRevenue}
                onChange={(e) => handleChange('costOfRevenue', e.target.value)}
                data-tooltip={categoryExplanations.costOfRevenue}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td data-tooltip={categoryExplanations.grossProfit}>Gross Profit</td>
            <td>{formatCurrency(incomeData.grossProfit)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Operating Expenses</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.researchDevelopment}>Research & Development</td>
            <td>
              <input
                type="number"
                value={incomeData.researchDevelopment}
                onChange={(e) => handleChange('researchDevelopment', e.target.value)}
                data-tooltip={categoryExplanations.researchDevelopment}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.sellingGeneralAndAdmin}>Selling, General & Admin</td>
            <td>
              <input
                type="number"
                value={incomeData.sellingGeneralAndAdmin}
                onChange={(e) => handleChange('sellingGeneralAndAdmin', e.target.value)}
                data-tooltip={categoryExplanations.sellingGeneralAndAdmin}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.operatingExpense}>Operating Expense</td>
            <td>
              <input
                type="number"
                value={incomeData.operatingExpense}
                onChange={(e) => handleChange('operatingExpense', e.target.value)}
                data-tooltip={categoryExplanations.operatingExpense}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td data-tooltip={categoryExplanations.operatingIncome}>Operating Income</td>
            <td>{formatCurrency(incomeData.operatingIncome)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Other Income/Expenses</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.interestExpense}>Interest Expense</td>
            <td>
              <input
                type="number"
                value={incomeData.interestExpense}
                onChange={(e) => handleChange('interestExpense', e.target.value)}
                data-tooltip={categoryExplanations.interestExpense}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherIncomeExpense}>Other Income/Expense</td>
            <td>
              <input
                type="number"
                value={incomeData.otherIncomeExpense}
                onChange={(e) => handleChange('otherIncomeExpense', e.target.value)}
                data-tooltip={categoryExplanations.otherIncomeExpense}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td data-tooltip={categoryExplanations.incomeBeforeTax}>Income Before Tax</td>
            <td>{formatCurrency(incomeData.incomeBeforeTax)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Income Taxes</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.incomeTaxExpense}>Income Tax Expense</td>
            <td>
              <input
                type="number"
                value={incomeData.incomeTaxExpense}
                onChange={(e) => handleChange('incomeTaxExpense', e.target.value)}
                data-tooltip={categoryExplanations.incomeTaxExpense}
              />
            </td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Net Income</td>
          </tr>
          <tr className="total">
            <td data-tooltip={categoryExplanations.netIncome}>Net Income</td>
            <td>{formatCurrency(incomeData.netIncome)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Earnings Per Share</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.eps}>EPS</td>
            <td>
              <input
                type="number"
                step="0.01"
                value={incomeData.eps}
                onChange={(e) => handleChange('eps', e.target.value)}
                data-tooltip={categoryExplanations.eps}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.epsDiluted}>EPS Diluted</td>
            <td>
              <input
                type="number"
                step="0.01"
                value={incomeData.epsDiluted}
                onChange={(e) => handleChange('epsDiluted', e.target.value)}
                data-tooltip={categoryExplanations.epsDiluted}
              />
            </td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Weighted Average Shares</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.weightedAverageShares}>Weighted Average Shares</td>
            <td>
              <input
                type="number"
                value={incomeData.weightedAverageShares}
                onChange={(e) => handleChange('weightedAverageShares', e.target.value)}
                data-tooltip={categoryExplanations.weightedAverageShares}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.weightedAverageSharesDiluted}>Weighted Average Shares Diluted</td>
            <td>
              <input
                type="number"
                value={incomeData.weightedAverageSharesDiluted}
                onChange={(e) => handleChange('weightedAverageSharesDiluted', e.target.value)}
                data-tooltip={categoryExplanations.weightedAverageSharesDiluted}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default IncomeStatement; 