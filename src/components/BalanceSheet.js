import React, { useState, useEffect } from 'react';

function BalanceSheet({ initialData }) {
  const [balanceData, setBalanceData] = useState({
    // Current Assets
    cash: 24500000000,
    shortTermInvestments: 31000000000,
    netReceivables: 29508000000,
    inventory: 6331000000,
    otherCurrentAssets: 14684000000,
    // Long-term Assets
    longTermInvestments: 120805000000,
    propertyPlantEquipment: 43680000000,
    goodwill: 0,
    intangibleAssets: 0,
    otherAssets: 54428000000,
    // Current Liabilities
    accountsPayable: 62611000000,
    shortTermDebt: 9596000000,
    otherCurrentLiabilities: 60844000000,
    // Long-term Liabilities
    longTermDebt: 95077000000,
    otherLiabilities: 53324000000,
    // Stockholders' Equity
    commonStock: 64849000000,
    retainedEarnings: -2140000000,
    treasuryStock: 0,
    capitalSurplus: 0,
    otherStockholderEquity: 0
  });

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setBalanceData(initialData);
    }
  }, [initialData]);

  const categoryExplanations = {
    cash: "Cash and cash equivalents held by the company",
    shortTermInvestments: "Investments that can be converted to cash within one year",
    netReceivables: "Amount of money owed to the company by customers, net of allowances",
    inventory: "Value of goods held for sale",
    otherCurrentAssets: "Other assets that can be converted to cash within one year",
    longTermInvestments: "Investments that cannot be converted to cash within one year",
    propertyPlantEquipment: "Value of physical assets used in operations",
    goodwill: "Premium paid for acquisitions above fair market value",
    intangibleAssets: "Non-physical assets like patents and trademarks",
    otherAssets: "Other long-term assets not classified elsewhere",
    accountsPayable: "Money owed to suppliers for goods and services",
    shortTermDebt: "Debt that must be paid within one year",
    otherCurrentLiabilities: "Other obligations due within one year",
    longTermDebt: "Debt that is due after one year",
    otherLiabilities: "Other long-term obligations",
    commonStock: "Value of common stock issued",
    retainedEarnings: "Cumulative profits not distributed as dividends",
    treasuryStock: "Value of company's own stock that has been repurchased",
    capitalSurplus: "Additional paid-in capital above par value",
    otherStockholderEquity: "Other equity accounts not classified elsewhere"
  };

  const handleChange = (field, value) => {
    setBalanceData(prev => ({
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
  const currentAssets = balanceData.cash + balanceData.shortTermInvestments + 
    balanceData.netReceivables + balanceData.inventory + balanceData.otherCurrentAssets;
  
  const longTermAssets = balanceData.longTermInvestments + balanceData.propertyPlantEquipment + 
    balanceData.goodwill + balanceData.intangibleAssets + balanceData.otherAssets;
  
  const totalAssets = currentAssets + longTermAssets;
  
  const currentLiabilities = balanceData.accountsPayable + balanceData.shortTermDebt + 
    balanceData.otherCurrentLiabilities;
  
  const longTermLiabilities = balanceData.longTermDebt + balanceData.otherLiabilities;
  
  const totalLiabilities = currentLiabilities + longTermLiabilities;
  
  const stockholderEquity = balanceData.commonStock + balanceData.retainedEarnings + 
    balanceData.treasuryStock + balanceData.capitalSurplus + balanceData.otherStockholderEquity;
  
  const totalLiabilitiesAndEquity = totalLiabilities + stockholderEquity;

  return (
    <div className="balance-sheet">
      <div className="statement-header">
        <h2>Balance Sheet</h2>
        <p className="statement-description">
          The Balance Sheet shows the company's assets, liabilities, and shareholders' equity at a specific point in time.
          Hover over any category to learn more about what it means.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Assets</td>
          </tr>
          <tr className="section-header">
            <td colSpan="2">Current Assets</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.cash}>Cash</td>
            <td>
              <input
                type="number"
                value={balanceData.cash}
                onChange={(e) => handleChange('cash', e.target.value)}
                data-tooltip={categoryExplanations.cash}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.shortTermInvestments}>Short Term Investments</td>
            <td>
              <input
                type="number"
                value={balanceData.shortTermInvestments}
                onChange={(e) => handleChange('shortTermInvestments', e.target.value)}
                data-tooltip={categoryExplanations.shortTermInvestments}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.netReceivables}>Net Receivables</td>
            <td>
              <input
                type="number"
                value={balanceData.netReceivables}
                onChange={(e) => handleChange('netReceivables', e.target.value)}
                data-tooltip={categoryExplanations.netReceivables}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.inventory}>Inventory</td>
            <td>
              <input
                type="number"
                value={balanceData.inventory}
                onChange={(e) => handleChange('inventory', e.target.value)}
                data-tooltip={categoryExplanations.inventory}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherCurrentAssets}>Other Current Assets</td>
            <td>
              <input
                type="number"
                value={balanceData.otherCurrentAssets}
                onChange={(e) => handleChange('otherCurrentAssets', e.target.value)}
                data-tooltip={categoryExplanations.otherCurrentAssets}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Total Current Assets</td>
            <td>{formatCurrency(currentAssets)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Long-term Assets</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.longTermInvestments}>Long Term Investments</td>
            <td>
              <input
                type="number"
                value={balanceData.longTermInvestments}
                onChange={(e) => handleChange('longTermInvestments', e.target.value)}
                data-tooltip={categoryExplanations.longTermInvestments}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.propertyPlantEquipment}>Property, Plant & Equipment</td>
            <td>
              <input
                type="number"
                value={balanceData.propertyPlantEquipment}
                onChange={(e) => handleChange('propertyPlantEquipment', e.target.value)}
                data-tooltip={categoryExplanations.propertyPlantEquipment}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.goodwill}>Goodwill</td>
            <td>
              <input
                type="number"
                value={balanceData.goodwill}
                onChange={(e) => handleChange('goodwill', e.target.value)}
                data-tooltip={categoryExplanations.goodwill}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.intangibleAssets}>Intangible Assets</td>
            <td>
              <input
                type="number"
                value={balanceData.intangibleAssets}
                onChange={(e) => handleChange('intangibleAssets', e.target.value)}
                data-tooltip={categoryExplanations.intangibleAssets}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherAssets}>Other Assets</td>
            <td>
              <input
                type="number"
                value={balanceData.otherAssets}
                onChange={(e) => handleChange('otherAssets', e.target.value)}
                data-tooltip={categoryExplanations.otherAssets}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Total Long-term Assets</td>
            <td>{formatCurrency(longTermAssets)}</td>
          </tr>
          <tr className="total">
            <td>Total Assets</td>
            <td>{formatCurrency(totalAssets)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Liabilities</td>
          </tr>
          <tr className="section-header">
            <td colSpan="2">Current Liabilities</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.accountsPayable}>Accounts Payable</td>
            <td>
              <input
                type="number"
                value={balanceData.accountsPayable}
                onChange={(e) => handleChange('accountsPayable', e.target.value)}
                data-tooltip={categoryExplanations.accountsPayable}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.shortTermDebt}>Short Term Debt</td>
            <td>
              <input
                type="number"
                value={balanceData.shortTermDebt}
                onChange={(e) => handleChange('shortTermDebt', e.target.value)}
                data-tooltip={categoryExplanations.shortTermDebt}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherCurrentLiabilities}>Other Current Liabilities</td>
            <td>
              <input
                type="number"
                value={balanceData.otherCurrentLiabilities}
                onChange={(e) => handleChange('otherCurrentLiabilities', e.target.value)}
                data-tooltip={categoryExplanations.otherCurrentLiabilities}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Total Current Liabilities</td>
            <td>{formatCurrency(currentLiabilities)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Long-term Liabilities</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.longTermDebt}>Long Term Debt</td>
            <td>
              <input
                type="number"
                value={balanceData.longTermDebt}
                onChange={(e) => handleChange('longTermDebt', e.target.value)}
                data-tooltip={categoryExplanations.longTermDebt}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherLiabilities}>Other Liabilities</td>
            <td>
              <input
                type="number"
                value={balanceData.otherLiabilities}
                onChange={(e) => handleChange('otherLiabilities', e.target.value)}
                data-tooltip={categoryExplanations.otherLiabilities}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Total Long-term Liabilities</td>
            <td>{formatCurrency(longTermLiabilities)}</td>
          </tr>
          <tr className="total">
            <td>Total Liabilities</td>
            <td>{formatCurrency(totalLiabilities)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Stockholders' Equity</td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.commonStock}>Common Stock</td>
            <td>
              <input
                type="number"
                value={balanceData.commonStock}
                onChange={(e) => handleChange('commonStock', e.target.value)}
                data-tooltip={categoryExplanations.commonStock}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.retainedEarnings}>Retained Earnings</td>
            <td>
              <input
                type="number"
                value={balanceData.retainedEarnings}
                onChange={(e) => handleChange('retainedEarnings', e.target.value)}
                data-tooltip={categoryExplanations.retainedEarnings}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.treasuryStock}>Treasury Stock</td>
            <td>
              <input
                type="number"
                value={balanceData.treasuryStock}
                onChange={(e) => handleChange('treasuryStock', e.target.value)}
                data-tooltip={categoryExplanations.treasuryStock}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.capitalSurplus}>Capital Surplus</td>
            <td>
              <input
                type="number"
                value={balanceData.capitalSurplus}
                onChange={(e) => handleChange('capitalSurplus', e.target.value)}
                data-tooltip={categoryExplanations.capitalSurplus}
              />
            </td>
          </tr>
          <tr>
            <td data-tooltip={categoryExplanations.otherStockholderEquity}>Other Stockholder Equity</td>
            <td>
              <input
                type="number"
                value={balanceData.otherStockholderEquity}
                onChange={(e) => handleChange('otherStockholderEquity', e.target.value)}
                data-tooltip={categoryExplanations.otherStockholderEquity}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td>Total Stockholder Equity</td>
            <td>{formatCurrency(stockholderEquity)}</td>
          </tr>
          <tr className="total">
            <td>Total Liabilities and Equity</td>
            <td>{formatCurrency(totalLiabilitiesAndEquity)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BalanceSheet; 