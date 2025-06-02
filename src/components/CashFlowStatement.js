import React, { useState, useEffect } from 'react';

function CashFlowStatement({ initialData }) {
  const [cashFlowData, setCashFlowData] = useState({
    // Operating Activities
    netIncome: 96995000000,
    depreciation: 11104000000,
    changeToNetIncome: 0,
    changeToAccountReceivables: -2080000000,
    changeToLiabilities: 0,
    changeToInventory: -1910000000,
    changeToOperatingActivities: 0,
    // Investing Activities
    capitalExpenditures: -10949000000,
    investments: -110805000000,
    // Financing Activities
    dividendsPaid: -15081000000,
    salePurchaseOfStock: -77550000000,
    netBorrowings: 0,
    otherCashflowsFromFinancing: 0,
    // Effect of Exchange Rate
    effectOfExchangeRate: 0
  });

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setCashFlowData(initialData);
    }
  }, [initialData]);

  const categoryExplanations = {
    netIncome: "Profit or loss from the income statement",
    depreciation: "Non-cash expense for the wear and tear of assets",
    changeToNetIncome: "Other adjustments to net income",
    changeToAccountReceivables: "Changes in money owed by customers",
    changeToLiabilities: "Changes in money owed to suppliers and others",
    changeToInventory: "Changes in the value of goods held for sale",
    changeToOperatingActivities: "Other changes in operating activities",
    capitalExpenditures: "Money spent on long-term assets",
    investments: "Money spent on or received from investments",
    dividendsPaid: "Money paid to shareholders as dividends",
    salePurchaseOfStock: "Money spent on or received from buying/selling company stock",
    netBorrowings: "Money received from or paid for borrowing",
    otherCashflowsFromFinancing: "Other cash flows from financing activities",
    effectOfExchangeRate: "Impact of currency exchange rate changes"
  };

  const handleChange = (field, value) => {
    setCashFlowData(prev => ({
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

  // Calculate totals
  const cashFromOperating = cashFlowData.netIncome + cashFlowData.depreciation + 
    cashFlowData.changeToNetIncome + cashFlowData.changeToAccountReceivables + 
    cashFlowData.changeToLiabilities + cashFlowData.changeToInventory + 
    cashFlowData.changeToOperatingActivities;
  
  const cashFromInvesting = cashFlowData.capitalExpenditures + cashFlowData.investments;
  
  const cashFromFinancing = cashFlowData.dividendsPaid + cashFlowData.salePurchaseOfStock + 
    cashFlowData.netBorrowings + cashFlowData.otherCashflowsFromFinancing;
  
  const netChangeInCash = cashFromOperating + cashFromInvesting + cashFromFinancing + 
    cashFlowData.effectOfExchangeRate;

  return (
    <div className="cash-flow-statement">
      <div className="statement-header">
        <h2>Cash Flow Statement</h2>
        <p className="statement-description">
          The Cash Flow Statement shows how cash moves in and out of the company over a period of time.
          Hover over any category to learn more about what it means.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Operating Activities</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.netIncome}>Net Income</td>
            <td>
              <input
                type="number"
                value={cashFlowData.netIncome}
                onChange={(e) => handleChange('netIncome', e.target.value)}
                data-tooltip={categoryExplanations.netIncome}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.depreciation}>Depreciation</td>
            <td>
              <input
                type="number"
                value={cashFlowData.depreciation}
                onChange={(e) => handleChange('depreciation', e.target.value)}
                data-tooltip={categoryExplanations.depreciation}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.changeToNetIncome}>Changes to Net Income</td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToNetIncome}
                onChange={(e) => handleChange('changeToNetIncome', e.target.value)}
                data-tooltip={categoryExplanations.changeToNetIncome}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.changeToAccountReceivables}>Changes to Account Receivables</td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToAccountReceivables}
                onChange={(e) => handleChange('changeToAccountReceivables', e.target.value)}
                data-tooltip={categoryExplanations.changeToAccountReceivables}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.changeToLiabilities}>Changes to Liabilities</td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToLiabilities}
                onChange={(e) => handleChange('changeToLiabilities', e.target.value)}
                data-tooltip={categoryExplanations.changeToLiabilities}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.changeToInventory}>Changes to Inventory</td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToInventory}
                onChange={(e) => handleChange('changeToInventory', e.target.value)}
                data-tooltip={categoryExplanations.changeToInventory}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.changeToOperatingActivities}>Other Operating Activities</td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToOperatingActivities}
                onChange={(e) => handleChange('changeToOperatingActivities', e.target.value)}
                data-tooltip={categoryExplanations.changeToOperatingActivities}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Cash from Operating Activities</td>
            <td>{formatCurrency(cashFromOperating)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Investing Activities</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.capitalExpenditures}>Capital Expenditures</td>
            <td>
              <input
                type="number"
                value={cashFlowData.capitalExpenditures}
                onChange={(e) => handleChange('capitalExpenditures', e.target.value)}
                data-tooltip={categoryExplanations.capitalExpenditures}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.investments}>Investments</td>
            <td>
              <input
                type="number"
                value={cashFlowData.investments}
                onChange={(e) => handleChange('investments', e.target.value)}
                data-tooltip={categoryExplanations.investments}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Cash from Investing Activities</td>
            <td>{formatCurrency(cashFromInvesting)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Financing Activities</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.dividendsPaid}>Dividends Paid</td>
            <td>
              <input
                type="number"
                value={cashFlowData.dividendsPaid}
                onChange={(e) => handleChange('dividendsPaid', e.target.value)}
                data-tooltip={categoryExplanations.dividendsPaid}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.salePurchaseOfStock}>Sale/Purchase of Stock</td>
            <td>
              <input
                type="number"
                value={cashFlowData.salePurchaseOfStock}
                onChange={(e) => handleChange('salePurchaseOfStock', e.target.value)}
                data-tooltip={categoryExplanations.salePurchaseOfStock}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.netBorrowings}>Net Borrowings</td>
            <td>
              <input
                type="number"
                value={cashFlowData.netBorrowings}
                onChange={(e) => handleChange('netBorrowings', e.target.value)}
                data-tooltip={categoryExplanations.netBorrowings}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherCashflowsFromFinancing}>Other Financing Activities</td>
            <td>
              <input
                type="number"
                value={cashFlowData.otherCashflowsFromFinancing}
                onChange={(e) => handleChange('otherCashflowsFromFinancing', e.target.value)}
                data-tooltip={categoryExplanations.otherCashflowsFromFinancing}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Cash from Financing Activities</td>
            <td>{formatCurrency(cashFromFinancing)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Effect of Exchange Rate</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.effectOfExchangeRate}>Effect of Exchange Rate</td>
            <td>
              <input
                type="number"
                value={cashFlowData.effectOfExchangeRate}
                onChange={(e) => handleChange('effectOfExchangeRate', e.target.value)}
                data-tooltip={categoryExplanations.effectOfExchangeRate}
              />
            </td>
          </tr>

          <tr className="total">
            <td>Net Change in Cash</td>
            <td>{formatCurrency(netChangeInCash)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CashFlowStatement; 