import React, { useState } from 'react';

const TickerInput = ({ onDataLoaded }) => {
  const [ticker, setTicker] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const fetchFinancialData = async (ticker) => {
    try {
      const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      console.log('Environment variables:', {
        NODE_ENV: process.env.NODE_ENV,
        hasApiKey: !!apiKey,
        apiKeyLength: apiKey?.length
      });
      
      if (!apiKey) {
        throw new Error('API key not found. Please check your environment configuration.');
      }
      const baseUrl = 'https://www.alphavantage.co/query';
      
      // Fetch income statement
      const incomeResponse = await fetch(`${baseUrl}?function=INCOME_STATEMENT&symbol=${ticker}&apikey=${apiKey}`);
      if (!incomeResponse.ok) {
        const errorText = await incomeResponse.text();
        console.error('Income Statement Error:', errorText);
        throw new Error(`Failed to fetch income statement: ${incomeResponse.statusText}`);
      }
      const incomeData = await incomeResponse.json();
      console.log('Income Statement Response:', incomeData);
      
      // Check for API error messages
      if (incomeData.Note) {
        throw new Error(`API Error: ${incomeData.Note}`);
      }
      if (incomeData.Information) {
        throw new Error(`API Information: ${incomeData.Information}`);
      }
      
      // Fetch balance sheet
      const balanceResponse = await fetch(`${baseUrl}?function=BALANCE_SHEET&symbol=${ticker}&apikey=${apiKey}`);
      if (!balanceResponse.ok) {
        const errorText = await balanceResponse.text();
        console.error('Balance Sheet Error:', errorText);
        throw new Error(`Failed to fetch balance sheet: ${balanceResponse.statusText}`);
      }
      const balanceData = await balanceResponse.json();
      console.log('Balance Sheet Response:', balanceData);
      
      // Fetch cash flow
      const cashFlowResponse = await fetch(`${baseUrl}?function=CASH_FLOW&symbol=${ticker}&apikey=${apiKey}`);
      if (!cashFlowResponse.ok) {
        const errorText = await cashFlowResponse.text();
        console.error('Cash Flow Error:', errorText);
        throw new Error(`Failed to fetch cash flow: ${cashFlowResponse.statusText}`);
      }
      const cashFlowData = await cashFlowResponse.json();
      console.log('Cash Flow Response:', cashFlowData);

      // Check for API errors
      if (incomeData.Note || balanceData.Note || cashFlowData.Note) {
        throw new Error('API rate limit reached. Please try again in a minute.');
      }

      // Get the most recent quarter's data
      const incomeStatement = incomeData.quarterlyReports?.[0];
      const balanceSheet = balanceData.quarterlyReports?.[0];
      const cashFlow = cashFlowData.quarterlyReports?.[0];

      if (!incomeStatement || !balanceSheet || !cashFlow) {
        throw new Error(`No data available for ${ticker}. Please check if the ticker symbol is correct.`);
      }

      // Transform the data to match our format
      const transformedData = {
        incomeStatement: {
          totalRevenue: parseFloat(incomeStatement.totalRevenue) || 0,
          costOfRevenue: parseFloat(incomeStatement.costOfRevenue) || 0,
          grossProfit: parseFloat(incomeStatement.grossProfit) || 0,
          researchDevelopment: parseFloat(incomeStatement.researchAndDevelopment) || 0,
          sellingGeneralAndAdmin: parseFloat(incomeStatement.sellingGeneralAndAdministrative) || 0,
          operatingExpense: parseFloat(incomeStatement.operatingExpenses) || 0,
          operatingIncome: parseFloat(incomeStatement.operatingIncome) || 0,
          interestExpense: parseFloat(incomeStatement.interestExpense) || 0,
          otherIncomeExpense: parseFloat(incomeStatement.otherNonOperatingIncome) || 0,
          incomeBeforeTax: parseFloat(incomeStatement.incomeBeforeTax) || 0,
          incomeTaxExpense: parseFloat(incomeStatement.incomeTaxExpense) || 0,
          netIncome: parseFloat(incomeStatement.netIncome) || 0,
          eps: parseFloat(incomeStatement.basicEPS) || 0,
          epsDiluted: parseFloat(incomeStatement.dilutedEPS) || 0,
          weightedAverageShares: parseFloat(incomeStatement.basicAverageShares) || 0,
          weightedAverageSharesDiluted: parseFloat(incomeStatement.dilutedAverageShares) || 0
        },
        balanceSheet: {
          cash: parseFloat(balanceSheet.cashAndCashEquivalentsAtCarryingValue) || 0,
          shortTermInvestments: parseFloat(balanceSheet.shortTermInvestments) || 0,
          netReceivables: parseFloat(balanceSheet.netReceivables) || 0,
          inventory: parseFloat(balanceSheet.inventory) || 0,
          otherCurrentAssets: parseFloat(balanceSheet.otherCurrentAssets) || 0,
          longTermInvestments: parseFloat(balanceSheet.longTermInvestments) || 0,
          propertyPlantEquipment: parseFloat(balanceSheet.propertyPlantEquipmentNet) || 0,
          goodwill: parseFloat(balanceSheet.goodwill) || 0,
          intangibleAssets: parseFloat(balanceSheet.intangibleAssets) || 0,
          otherAssets: parseFloat(balanceSheet.otherAssets) || 0,
          accountsPayable: parseFloat(balanceSheet.accountPayables) || 0,
          shortTermDebt: parseFloat(balanceSheet.shortTermDebt) || 0,
          otherCurrentLiabilities: parseFloat(balanceSheet.otherCurrentLiabilities) || 0,
          longTermDebt: parseFloat(balanceSheet.longTermDebt) || 0,
          otherLiabilities: parseFloat(balanceSheet.otherLiabilities) || 0,
          commonStock: parseFloat(balanceSheet.commonStock) || 0,
          retainedEarnings: parseFloat(balanceSheet.retainedEarnings) || 0,
          treasuryStock: parseFloat(balanceSheet.treasuryStock) || 0,
          capitalSurplus: parseFloat(balanceSheet.additionalPaidInCapital) || 0,
          otherStockholderEquity: parseFloat(balanceSheet.otherStockholdersEquity) || 0,
          totalCurrentAssets: parseFloat(balanceSheet.totalCurrentAssets) || 0,
          totalAssets: parseFloat(balanceSheet.totalAssets) || 0,
          totalCurrentLiabilities: parseFloat(balanceSheet.totalCurrentLiabilities) || 0,
          totalLiabilities: parseFloat(balanceSheet.totalLiabilities) || 0,
          totalStockholderEquity: parseFloat(balanceSheet.totalStockholderEquity) || 0,
          totalLiabilitiesAndStockholdersEquity: parseFloat(balanceSheet.totalLiabilitiesAndStockholdersEquity) || 0
        },
        cashFlowStatement: {
          netIncome: parseFloat(cashFlow.netIncome) || 0,
          depreciation: parseFloat(cashFlow.depreciation) || 0,
          changeToNetIncome: parseFloat(cashFlow.changeInNetIncome) || 0,
          changeToAccountReceivables: parseFloat(cashFlow.changeInReceivables) || 0,
          changeToLiabilities: parseFloat(cashFlow.changeInLiabilities) || 0,
          changeToInventory: parseFloat(cashFlow.changeInInventory) || 0,
          changeToOperatingActivities: parseFloat(cashFlow.operatingCashflow) || 0,
          capitalExpenditures: parseFloat(cashFlow.capitalExpenditures) || 0,
          investments: parseFloat(cashFlow.investments) || 0,
          dividendsPaid: parseFloat(cashFlow.dividendPayout) || 0,
          salePurchaseOfStock: parseFloat(cashFlow.salePurchaseOfStock) || 0,
          netBorrowings: parseFloat(cashFlow.netBorrowings) || 0,
          otherCashflowsFromFinancing: parseFloat(cashFlow.otherCashflowsFromFinancing) || 0,
          effectOfExchangeRate: parseFloat(cashFlow.effectOfExchangeRate) || 0
        }
      };

      console.log('Transformed Data:', transformedData);
      return transformedData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error(error.message || `Failed to fetch data for ${ticker}. Please check if the ticker symbol is correct.`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      setError('Please enter a ticker symbol');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await fetchFinancialData(ticker.toUpperCase());
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
            placeholder="Enter any stock ticker (e.g., AAPL, GOOGL, MSFT)"
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