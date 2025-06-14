import React, { useState, useEffect } from 'react';
import FinancialInfoPanel from './FinancialInfoPanel';

function BalanceSheet({ initialData }) {
  const [balanceData, setBalanceData] = useState({
    // Current Assets
    cash: 0,
    shortTermInvestments: 0,
    netReceivables: 0,
    inventory: 0,
    otherCurrentAssets: 0,
    // Long-term Assets
    longTermInvestments: 0,
    propertyPlantEquipment: 0,
    goodwill: 0,
    intangibleAssets: 0,
    otherAssets: 0,
    // Current Liabilities
    accountsPayable: 0,
    shortTermDebt: 0,
    otherCurrentLiabilities: 0,
    // Long-term Liabilities
    longTermDebt: 0,
    otherLiabilities: 0,
    // Stockholders' Equity
    commonStock: 0,
    retainedEarnings: 0,
    treasuryStock: 0,
    capitalSurplus: 0,
    otherStockholderEquity: 0
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setBalanceData(initialData);
    }
  }, [initialData]);

  const formatCategoryName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const categoryExplanations = {
    cash: {
      short: "Cash and highly liquid investments that can be converted to cash immediately",
      long: "Cash and Cash Equivalents represent the most liquid assets of a company, including physical cash, bank deposits, and short-term investments that can be converted to cash within 90 days. This category is crucial for assessing a company's ability to meet its short-term obligations and fund its operations.",
      importance: "Cash and Cash Equivalents are essential for a company's day-to-day operations and financial stability. They provide a buffer against unexpected expenses and economic downturns.",
      analysis: "When analyzing Cash and Cash Equivalents, consider the company's cash flow patterns, industry standards, and the relationship between cash levels and current liabilities.",
      ratios: [
        {
          name: "Cash Ratio",
          formula: "Cash and Equivalents / Current Liabilities",
          interpretation: "Measures a company's ability to pay off its current liabilities using only cash and cash equivalents"
        },
        {
          name: "Cash to Total Assets",
          formula: "Cash and Equivalents / Total Assets",
          interpretation: "Indicates what percentage of a company's assets are held in cash"
        }
      ]
    },
    shortTermInvestments: {
      short: "Investments that can be converted to cash within one year",
      long: "Short-term Investments include marketable securities and other investments that can be converted to cash within one year. These investments typically earn a higher return than cash while maintaining relatively high liquidity.",
      importance: "Short-term investments help companies earn a return on excess cash while maintaining the ability to access funds when needed.",
      analysis: "Analyze the types of investments, their risk levels, and the returns they generate compared to market rates.",
      ratios: [
        {
          name: "Short-term Investments to Current Assets",
          formula: "Short-term Investments / Current Assets",
          interpretation: "Shows what portion of current assets is invested in short-term securities"
        }
      ]
    },
    netReceivables: {
      short: "Money owed to the company by customers for goods or services delivered",
      long: "Accounts Receivable represents money that customers owe to the company for goods or services that have been delivered but not yet paid for. It's a key component of working capital and reflects the company's credit and collection policies.",
      importance: "Accounts Receivable is crucial for understanding a company's cash flow cycle and its ability to collect payments from customers.",
      analysis: "Look at the aging of receivables, collection period, and bad debt ratios to assess the quality of accounts receivable.",
      ratios: [
        {
          name: "Days Sales Outstanding (DSO)",
          formula: "(Accounts Receivable / Total Sales) × 365",
          interpretation: "Measures the average number of days it takes to collect payment after a sale"
        },
        {
          name: "Accounts Receivable Turnover",
          formula: "Net Credit Sales / Average Accounts Receivable",
          interpretation: "Indicates how efficiently a company collects payments from customers"
        }
      ]
    },
    inventory: {
      short: "Raw materials, work in progress, and finished goods held for sale",
      long: "Inventory represents the goods a company holds for sale, including raw materials, work in progress, and finished products. It's a significant asset for manufacturing and retail companies.",
      importance: "Inventory management is crucial for maintaining optimal stock levels while minimizing holding costs and obsolescence.",
      analysis: "Consider inventory turnover, days inventory outstanding, and the relationship between inventory levels and sales.",
      ratios: [
        {
          name: "Inventory Turnover",
          formula: "Cost of Goods Sold / Average Inventory",
          interpretation: "Shows how many times a company's inventory is sold and replaced over a period"
        },
        {
          name: "Days Inventory Outstanding",
          formula: "(Inventory / Cost of Goods Sold) × 365",
          interpretation: "Measures the average number of days inventory is held before being sold"
        }
      ]
    },
    otherCurrentAssets: {
      short: "Other assets that can be converted to cash within one year",
      long: "Other Current Assets include various forms of assets that can be readily converted to cash within one year. These assets are important for a company's liquidity and day-to-day operations.",
      importance: "Other Current Assets are crucial for maintaining a company's liquidity and ensuring its ability to meet short-term obligations.",
      analysis: "Analyze the composition and maturity of other current assets to understand their liquidity and potential for conversion to cash.",
      ratios: [
        {
          name: "Other Current Assets to Current Assets",
          formula: "Other Current Assets / Current Assets",
          interpretation: "Shows what portion of current assets is made up of other current assets"
        }
      ]
    },
    longTermInvestments: {
      short: "Investments that cannot be converted to cash within one year",
      long: "Long-term Investments include securities and other assets that cannot be converted to cash within one year. These investments are typically held for longer-term growth or income generation.",
      importance: "Long-term investments are important for a company's growth and diversification strategy.",
      analysis: "Analyze the types of investments, their risk levels, and the returns they generate compared to market rates.",
      ratios: [
        {
          name: "Long-term Investments to Total Assets",
          formula: "Long-term Investments / Total Assets",
          interpretation: "Shows what portion of total assets is invested in long-term securities"
        }
      ]
    },
    propertyPlantEquipment: {
      short: "Value of physical assets used in operations",
      long: "Property, Plant, and Equipment (PPE) are tangible assets used in the operations of a company. They include land, buildings, machinery, and equipment.",
      importance: "PPE is crucial for a company's operations and production capacity.",
      analysis: "Consider the age, condition, and depreciation of PPE to assess its productivity and efficiency.",
      ratios: [
        {
          name: "Depreciation Expense to PPE",
          formula: "Depreciation Expense / PPE",
          interpretation: "Indicates the rate at which PPE is being depreciated"
        },
        {
          name: "PPE Turnover",
          formula: "Net Sales / Average PPE",
          interpretation: "Indicates how efficiently PPE is used to generate sales"
        }
      ]
    },
    goodwill: {
      short: "Premium paid for acquisitions above fair market value",
      long: "Goodwill is the excess of the purchase price over the fair market value of identifiable net assets acquired. It represents the value of intangible assets such as brand recognition, customer loyalty, and intellectual property.",
      importance: "Goodwill is important for assessing the value of a company's intangible assets.",
      analysis: "Analyze the purchase price, fair market value of net assets, and the expected future earnings potential of the acquired company.",
      ratios: [
        {
          name: "Goodwill to Total Assets",
          formula: "Goodwill / Total Assets",
          interpretation: "Indicates what portion of total assets is made up of goodwill"
        }
      ]
    },
    intangibleAssets: {
      short: "Non-physical assets like patents and trademarks",
      long: "Intangible Assets include non-physical assets such as patents, trademarks, and copyrights. They are important for a company's intellectual property and competitive advantage.",
      importance: "Intangible Assets are crucial for a company's innovation and differentiation.",
      analysis: "Analyze the value, lifespan, and legal protection of intangible assets.",
      ratios: [
        {
          name: "Intangible Assets to Total Assets",
          formula: "Intangible Assets / Total Assets",
          interpretation: "Indicates what portion of total assets is made up of intangible assets"
        }
      ]
    },
    otherAssets: {
      short: "Other long-term assets not classified elsewhere",
      long: "Other Assets include various forms of assets that do not fit into other categories. They are important for a company's overall asset base.",
      importance: "Other Assets are crucial for understanding a company's total asset composition.",
      analysis: "Analyze the composition and maturity of other assets to understand their potential for generating returns.",
      ratios: [
        {
          name: "Other Assets to Total Assets",
          formula: "Other Assets / Total Assets",
          interpretation: "Shows what portion of total assets is made up of other assets"
        }
      ]
    },
    accountsPayable: {
      short: "Money owed to suppliers for goods and services",
      long: "Accounts Payable represents the amount of money a company owes to suppliers for goods or services that have been received but not yet paid for. It's a key component of working capital and reflects the company's credit terms with suppliers.",
      importance: "Accounts Payable is crucial for understanding a company's cash flow cycle and its ability to pay its suppliers.",
      analysis: "Look at the aging of payables, payment period, and bad debt ratios to assess the quality of accounts payable.",
      ratios: [
        {
          name: "Accounts Payable Turnover",
          formula: "Purchases / Average Accounts Payable",
          interpretation: "Indicates how frequently a company pays its suppliers"
        },
        {
          name: "Days Payables Outstanding",
          formula: "(Accounts Payable / Total Purchases) × 365",
          interpretation: "Measures the average number of days it takes to pay suppliers"
        }
      ]
    },
    shortTermDebt: {
      short: "Debt that must be paid within one year",
      long: "Short-term Debt includes loans and other obligations that must be paid within one year. It's a key component of working capital and reflects the company's short-term borrowing needs.",
      importance: "Short-term Debt is crucial for understanding a company's liquidity and its ability to meet its short-term obligations.",
      analysis: "Analyze the maturity, interest rates, and covenants of short-term debt.",
      ratios: [
        {
          name: "Current Ratio",
          formula: "Current Assets / Current Liabilities",
          interpretation: "Indicates a company's ability to meet its short-term obligations"
        },
        {
          name: "Short-term Debt to Total Assets",
          formula: "Short-term Debt / Total Assets",
          interpretation: "Indicates what portion of total assets is financed by short-term debt"
        }
      ]
    },
    otherCurrentLiabilities: {
      short: "Other obligations due within one year",
      long: "Other Current Liabilities include various forms of obligations that must be paid within one year. They are important for understanding a company's liquidity and its ability to meet its short-term obligations.",
      importance: "Other Current Liabilities are crucial for understanding a company's liquidity and its ability to meet its short-term obligations.",
      analysis: "Analyze the maturity, interest rates, and covenants of other current liabilities.",
      ratios: [
        {
          name: "Other Current Liabilities to Current Assets",
          formula: "Other Current Liabilities / Current Assets",
          interpretation: "Shows what portion of current assets is financed by other current liabilities"
        }
      ]
    },
    longTermDebt: {
      short: "Debt that is due after one year",
      long: "Long-term Debt includes loans and other obligations that are due after one year. It's a key component of a company's capital structure and reflects its long-term borrowing needs.",
      importance: "Long-term Debt is crucial for understanding a company's capital structure and its ability to meet its long-term obligations.",
      analysis: "Analyze the maturity, interest rates, and covenants of long-term debt.",
      ratios: [
        {
          name: "Debt to Equity Ratio",
          formula: "Total Debt / Total Equity",
          interpretation: "Indicates the proportion of a company's financing that is provided by debt"
        },
        {
          name: "Interest Coverage Ratio",
          formula: "EBIT / Interest Expense",
          interpretation: "Indicates a company's ability to cover its interest expenses with its earnings before interest and taxes"
        }
      ]
    },
    otherLiabilities: {
      short: "Other long-term obligations",
      long: "Other Liabilities include various forms of long-term obligations that are not classified as debt. They are important for understanding a company's overall financial obligations.",
      importance: "Other Liabilities are crucial for understanding a company's overall financial obligations.",
      analysis: "Analyze the maturity, interest rates, and covenants of other liabilities.",
      ratios: [
        {
          name: "Other Liabilities to Total Assets",
          formula: "Other Liabilities / Total Assets",
          interpretation: "Shows what portion of total assets is financed by other liabilities"
        }
      ]
    },
    commonStock: {
      short: "Value of common stock issued",
      long: "Common Stock represents the ownership interest of shareholders in a company. It's a key component of equity financing and reflects the company's capital structure.",
      importance: "Common Stock is crucial for understanding a company's capital structure and its ability to raise capital.",
      analysis: "Analyze the par value, market price, and dividend history of common stock.",
      ratios: [
        {
          name: "Earnings Per Share",
          formula: "Net Income / Number of Common Shares Outstanding",
          interpretation: "Indicates a company's profitability on a per-share basis"
        },
        {
          name: "Price-to-Earnings Ratio",
          formula: "Market Price / Earnings Per Share",
          interpretation: "Indicates how much investors are willing to pay for each dollar of earnings"
        }
      ]
    },
    retainedEarnings: {
      short: "Cumulative profits not distributed as dividends",
      long: "Retained Earnings represent the cumulative profits of a company that have not been distributed as dividends to shareholders. They are a key component of equity financing and reflect the company's accumulated profits.",
      importance: "Retained Earnings are crucial for understanding a company's equity base and its ability to reinvest in its operations.",
      analysis: "Analyze the trend in retained earnings over time to understand the company's profitability and dividend policy.",
      ratios: [
        {
          name: "Retained Earnings to Total Equity",
          formula: "Retained Earnings / Total Equity",
          interpretation: "Indicates what portion of equity financing is provided by retained earnings"
        }
      ]
    },
    treasuryStock: {
      short: "Value of company's own stock that has been repurchased",
      long: "Treasury Stock represents shares of a company's own stock that have been repurchased by the company itself. They are not outstanding and do not receive dividends or voting rights.",
      importance: "Treasury Stock is important for understanding a company's equity base and its ability to manage its capital structure.",
      analysis: "Analyze the number of shares repurchased and the impact on the company's equity base.",
      ratios: [
        {
          name: "Treasury Stock to Total Equity",
          formula: "Treasury Stock / Total Equity",
          interpretation: "Indicates what portion of equity financing is provided by treasury stock"
        }
      ]
    },
    capitalSurplus: {
      short: "Additional paid-in capital above par value",
      long: "Capital Surplus represents the excess of paid-in capital over the par value of shares issued. It's a key component of equity financing and reflects the company's ability to raise capital.",
      importance: "Capital Surplus is crucial for understanding a company's equity base and its ability to raise capital.",
      analysis: "Analyze the trend in capital surplus over time to understand the company's ability to raise capital.",
      ratios: [
        {
          name: "Capital Surplus to Total Equity",
          formula: "Capital Surplus / Total Equity",
          interpretation: "Indicates what portion of equity financing is provided by capital surplus"
        }
      ]
    },
    otherStockholderEquity: {
      short: "Other equity accounts not classified elsewhere",
      long: "Other Stockholder Equity includes various forms of equity accounts that are not classified as common stock or retained earnings. They are important for understanding a company's equity base.",
      importance: "Other Stockholder Equity is crucial for understanding a company's equity base.",
      analysis: "Analyze the composition and maturity of other equity accounts.",
      ratios: [
        {
          name: "Other Stockholder Equity to Total Equity",
          formula: "Other Stockholder Equity / Total Equity",
          interpretation: "Indicates what portion of equity financing is provided by other stockholder equity"
        }
      ]
    }
  };

  const handleChange = (field, value) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setBalanceData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const formatCurrency = (value) => {
    if (isNaN(value)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calculate totals
  const currentAssets = balanceData.totalCurrentAssets || 
    ((balanceData.cash || 0) + 
    (balanceData.shortTermInvestments || 0) + 
    (balanceData.netReceivables || 0) + 
    (balanceData.inventory || 0) + 
    (balanceData.otherCurrentAssets || 0));
  
  const longTermAssets = balanceData.totalAssets ? 
    (balanceData.totalAssets - currentAssets) :
    ((balanceData.longTermInvestments || 0) + 
    (balanceData.propertyPlantEquipment || 0) + 
    (balanceData.goodwill || 0) + 
    (balanceData.intangibleAssets || 0) + 
    (balanceData.otherAssets || 0));
  
  const totalAssets = balanceData.totalAssets || (currentAssets + longTermAssets);
  
  const currentLiabilities = balanceData.totalCurrentLiabilities || 
    ((balanceData.accountsPayable || 0) + 
    (balanceData.shortTermDebt || 0) + 
    (balanceData.otherCurrentLiabilities || 0));
  
  const longTermLiabilities = balanceData.totalLiabilities ? 
    (balanceData.totalLiabilities - currentLiabilities) :
    ((balanceData.longTermDebt || 0) + 
    (balanceData.otherLiabilities || 0));
  
  const totalLiabilities = balanceData.totalLiabilities || (currentLiabilities + longTermLiabilities);
  
  const stockholderEquity = balanceData.totalStockholderEquity || 
    ((balanceData.commonStock || 0) + 
    (balanceData.retainedEarnings || 0) + 
    (balanceData.treasuryStock || 0) + 
    (balanceData.capitalSurplus || 0) + 
    (balanceData.otherStockholderEquity || 0));
  
  const totalLiabilitiesAndEquity = balanceData.totalLiabilitiesAndStockholdersEquity || (totalLiabilities + stockholderEquity);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseInfoPanel = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="balance-sheet">
      <div className="statement-header">
        <h2>Balance Sheet</h2>
        <p className="statement-description">
          The Balance Sheet shows the company's assets, liabilities, and shareholders' equity at a specific point in time.
          Click on any category to learn more about what it means and how to analyze it.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Assets</td>
          </tr>
          <tr className="subsection-header">
            <td colSpan="2">Current Assets</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('cash')}
              className="clickable-category"
              data-tooltip={categoryExplanations.cash.short}
            >
              {formatCategoryName('cash')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.cash}
                onChange={(e) => handleChange('cash', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('shortTermInvestments')}
              className="clickable-category"
              data-tooltip={categoryExplanations.shortTermInvestments.short}
            >
              {formatCategoryName('shortTermInvestments')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.shortTermInvestments}
                onChange={(e) => handleChange('shortTermInvestments', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('netReceivables')}
              className="clickable-category"
              data-tooltip={categoryExplanations.netReceivables.short}
            >
              {formatCategoryName('netReceivables')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.netReceivables}
                onChange={(e) => handleChange('netReceivables', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('inventory')}
              className="clickable-category"
              data-tooltip={categoryExplanations.inventory.short}
            >
              {formatCategoryName('inventory')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.inventory}
                onChange={(e) => handleChange('inventory', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherCurrentAssets')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherCurrentAssets.short}
            >
              {formatCategoryName('otherCurrentAssets')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.otherCurrentAssets}
                onChange={(e) => handleChange('otherCurrentAssets', e.target.value)}
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
            <td 
              onClick={() => handleCategoryClick('longTermInvestments')}
              className="clickable-category"
              data-tooltip={categoryExplanations.longTermInvestments.short}
            >
              {formatCategoryName('longTermInvestments')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.longTermInvestments}
                onChange={(e) => handleChange('longTermInvestments', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('propertyPlantEquipment')}
              className="clickable-category"
              data-tooltip={categoryExplanations.propertyPlantEquipment.short}
            >
              {formatCategoryName('propertyPlantEquipment')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.propertyPlantEquipment}
                onChange={(e) => handleChange('propertyPlantEquipment', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('goodwill')}
              className="clickable-category"
              data-tooltip={categoryExplanations.goodwill.short}
            >
              {formatCategoryName('goodwill')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.goodwill}
                onChange={(e) => handleChange('goodwill', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('intangibleAssets')}
              className="clickable-category"
              data-tooltip={categoryExplanations.intangibleAssets.short}
            >
              {formatCategoryName('intangibleAssets')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.intangibleAssets}
                onChange={(e) => handleChange('intangibleAssets', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherAssets')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherAssets.short}
            >
              {formatCategoryName('otherAssets')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.otherAssets}
                onChange={(e) => handleChange('otherAssets', e.target.value)}
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
          <tr className="subsection-header">
            <td colSpan="2">Current Liabilities</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('accountsPayable')}
              className="clickable-category"
              data-tooltip={categoryExplanations.accountsPayable.short}
            >
              {formatCategoryName('accountsPayable')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.accountsPayable}
                onChange={(e) => handleChange('accountsPayable', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('shortTermDebt')}
              className="clickable-category"
              data-tooltip={categoryExplanations.shortTermDebt.short}
            >
              {formatCategoryName('shortTermDebt')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.shortTermDebt}
                onChange={(e) => handleChange('shortTermDebt', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherCurrentLiabilities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherCurrentLiabilities.short}
            >
              {formatCategoryName('otherCurrentLiabilities')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.otherCurrentLiabilities}
                onChange={(e) => handleChange('otherCurrentLiabilities', e.target.value)}
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
            <td 
              onClick={() => handleCategoryClick('longTermDebt')}
              className="clickable-category"
              data-tooltip={categoryExplanations.longTermDebt.short}
            >
              {formatCategoryName('longTermDebt')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.longTermDebt}
                onChange={(e) => handleChange('longTermDebt', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherLiabilities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherLiabilities.short}
            >
              {formatCategoryName('otherLiabilities')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.otherLiabilities}
                onChange={(e) => handleChange('otherLiabilities', e.target.value)}
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
            <td 
              onClick={() => handleCategoryClick('commonStock')}
              className="clickable-category"
              data-tooltip={categoryExplanations.commonStock.short}
            >
              {formatCategoryName('commonStock')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.commonStock}
                onChange={(e) => handleChange('commonStock', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('retainedEarnings')}
              className="clickable-category"
              data-tooltip={categoryExplanations.retainedEarnings.short}
            >
              {formatCategoryName('retainedEarnings')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.retainedEarnings}
                onChange={(e) => handleChange('retainedEarnings', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('treasuryStock')}
              className="clickable-category"
              data-tooltip={categoryExplanations.treasuryStock.short}
            >
              {formatCategoryName('treasuryStock')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.treasuryStock}
                onChange={(e) => handleChange('treasuryStock', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('capitalSurplus')}
              className="clickable-category"
              data-tooltip={categoryExplanations.capitalSurplus.short}
            >
              {formatCategoryName('capitalSurplus')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.capitalSurplus}
                onChange={(e) => handleChange('capitalSurplus', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherStockholderEquity')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherStockholderEquity.short}
            >
              {formatCategoryName('otherStockholderEquity')}
            </td>
            <td>
              <input
                type="number"
                value={balanceData.otherStockholderEquity}
                onChange={(e) => handleChange('otherStockholderEquity', e.target.value)}
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

export default BalanceSheet; 