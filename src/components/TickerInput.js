import React, { useState } from 'react';

const TickerInput = ({ onDataLoaded }) => {
  const [ticker, setTicker] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const generateFinancialData = (ticker) => {
    // Generate random but realistic-looking financial data
    const baseRevenue = Math.floor(Math.random() * 500000000000) + 10000000000;
    const costOfRevenue = Math.floor(baseRevenue * 0.6);
    const grossProfit = baseRevenue - costOfRevenue;
    const operatingExpense = Math.floor(baseRevenue * 0.2);
    const operatingIncome = grossProfit - operatingExpense;
    const interestExpense = Math.floor(baseRevenue * 0.02);
    const otherIncomeExpense = Math.floor(baseRevenue * 0.01);
    const incomeBeforeTax = operatingIncome - interestExpense + otherIncomeExpense;
    const incomeTaxExpense = Math.floor(incomeBeforeTax * 0.2);
    const netIncome = incomeBeforeTax - incomeTaxExpense;
    
    // Calculate shares with dilution
    const basicShares = 1000000000;
    const dilutedShares = Math.floor(basicShares * 1.1); // 10% more shares for dilution

    // Calculate cash flow items
    const depreciation = Math.floor(baseRevenue * 0.05);
    const changeToAccountReceivables = -Math.floor(baseRevenue * 0.02);
    const changeToInventory = -Math.floor(baseRevenue * 0.01);
    const changeToLiabilities = Math.floor(baseRevenue * 0.03);
    const changeToOperatingActivities = netIncome + depreciation + changeToAccountReceivables + 
                                      changeToInventory + changeToLiabilities;

    return {
      incomeStatement: {
        totalRevenue: baseRevenue,
        costOfRevenue: costOfRevenue,
        grossProfit: grossProfit,
        researchDevelopment: Math.floor(baseRevenue * 0.1),
        sellingGeneralAndAdmin: Math.floor(baseRevenue * 0.1),
        operatingExpense: operatingExpense,
        operatingIncome: operatingIncome,
        interestExpense: interestExpense,
        otherIncomeExpense: otherIncomeExpense,
        incomeBeforeTax: incomeBeforeTax,
        incomeTaxExpense: incomeTaxExpense,
        netIncome: netIncome,
        eps: (netIncome / basicShares).toFixed(2),
        epsDiluted: (netIncome / dilutedShares).toFixed(2),
        weightedAverageShares: basicShares,
        weightedAverageSharesDiluted: dilutedShares
      },
      balanceSheet: {
        cash: Math.floor(baseRevenue * 0.2),
        shortTermInvestments: Math.floor(baseRevenue * 0.3),
        netReceivables: Math.floor(baseRevenue * 0.15),
        inventory: Math.floor(baseRevenue * 0.1),
        otherCurrentAssets: Math.floor(baseRevenue * 0.1),
        longTermInvestments: Math.floor(baseRevenue * 0.4),
        propertyPlantEquipment: Math.floor(baseRevenue * 0.3),
        goodwill: Math.floor(baseRevenue * 0.1),
        intangibleAssets: Math.floor(baseRevenue * 0.05),
        otherAssets: Math.floor(baseRevenue * 0.2),
        accountsPayable: Math.floor(baseRevenue * 0.2),
        shortTermDebt: Math.floor(baseRevenue * 0.1),
        otherCurrentLiabilities: Math.floor(baseRevenue * 0.15),
        longTermDebt: Math.floor(baseRevenue * 0.3),
        otherLiabilities: Math.floor(baseRevenue * 0.2),
        commonStock: Math.floor(baseRevenue * 0.2),
        retainedEarnings: Math.floor(baseRevenue * 0.1),
        treasuryStock: 0,
        capitalSurplus: Math.floor(baseRevenue * 0.1),
        otherStockholderEquity: Math.floor(baseRevenue * 0.05)
      },
      cashFlowStatement: {
        netIncome: netIncome,
        depreciation: depreciation,
        changeToNetIncome: 0,
        changeToAccountReceivables: changeToAccountReceivables,
        changeToLiabilities: changeToLiabilities,
        changeToInventory: changeToInventory,
        changeToOperatingActivities: changeToOperatingActivities,
        capitalExpenditures: -Math.floor(baseRevenue * 0.1),
        investments: -Math.floor(baseRevenue * 0.2),
        dividendsPaid: -Math.floor(netIncome * 0.2),
        salePurchaseOfStock: -Math.floor(netIncome * 0.3),
        netBorrowings: Math.floor(baseRevenue * 0.1),
        otherCashflowsFromFinancing: 0,
        effectOfExchangeRate: 0
      }
    };
  };

  const emptyFinancialData = {
    incomeStatement: {
      totalRevenue: 0,
      costOfRevenue: 0,
      grossProfit: 0,
      researchDevelopment: 0,
      sellingGeneralAndAdmin: 0,
      operatingExpense: 0,
      operatingIncome: 0,
      interestExpense: 0,
      otherIncomeExpense: 0,
      incomeBeforeTax: 0,
      incomeTaxExpense: 0,
      netIncome: 0,
      eps: 0,
      epsDiluted: 0,
      weightedAverageShares: 0,
      weightedAverageSharesDiluted: 0
    },
    balanceSheet: {
      cash: 0,
      shortTermInvestments: 0,
      netReceivables: 0,
      inventory: 0,
      otherCurrentAssets: 0,
      longTermInvestments: 0,
      propertyPlantEquipment: 0,
      goodwill: 0,
      intangibleAssets: 0,
      otherAssets: 0,
      accountsPayable: 0,
      shortTermDebt: 0,
      otherCurrentLiabilities: 0,
      longTermDebt: 0,
      otherLiabilities: 0,
      commonStock: 0,
      retainedEarnings: 0,
      treasuryStock: 0,
      capitalSurplus: 0,
      otherStockholderEquity: 0
    },
    cashFlowStatement: {
      netIncome: 0,
      depreciation: 0,
      changeToNetIncome: 0,
      changeToAccountReceivables: 0,
      changeToLiabilities: 0,
      changeToInventory: 0,
      changeToOperatingActivities: 0,
      capitalExpenditures: 0,
      investments: 0,
      dividendsPaid: 0,
      salePurchaseOfStock: 0,
      netBorrowings: 0,
      otherCashflowsFromFinancing: 0,
      effectOfExchangeRate: 0
    }
  };

  // Initialize with empty data
  React.useEffect(() => {
    onDataLoaded(emptyFinancialData);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError('Please enter a ticker symbol');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate a slight delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));

      // Generate financial data for the entered ticker
      const data = generateFinancialData(ticker);

      // Call the parent component's callback with the generated data
      onDataLoaded(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch financial data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ticker-input">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value.toUpperCase())}
            placeholder="Enter any stock ticker (e.g., AAPL, GOOGL, TSLA)"
            className="ticker-field"
          />
          <button 
            type="submit" 
            className="fetch-button"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Fetch Data'}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default TickerInput; 