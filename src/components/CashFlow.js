import React, { useState, useEffect } from 'react';
import FinancialInfoPanel from './FinancialInfoPanel';

function CashFlow({ initialData }) {
  const [cashFlowData, setCashFlowData] = useState({
    // Operating Activities
    netIncome: 0,
    depreciation: 0,
    changesInWorkingCapital: 0,
    otherOperatingActivities: 0,
    // Investing Activities
    capitalExpenditures: 0,
    acquisitions: 0,
    investments: 0,
    otherInvestingActivities: 0,
    // Financing Activities
    dividendsPaid: 0,
    stockRepurchases: 0,
    debtIssuance: 0,
    debtRepayment: 0,
    otherFinancingActivities: 0
  });

  const [selectedCategory, setSelectedCategory] = useState(null);

  // Update state when initialData changes
  useEffect(() => {
    if (initialData) {
      setCashFlowData(initialData);
    }
  }, [initialData]);

  const formatCategoryName = (name) => {
    return name
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const handleChange = (field, value) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setCashFlowData(prev => ({
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
  const operatingCashFlow = (cashFlowData.netIncome || 0) + 
    (cashFlowData.depreciation || 0) + 
    (cashFlowData.changesInWorkingCapital || 0) + 
    (cashFlowData.otherOperatingActivities || 0);

  const investingCashFlow = (cashFlowData.capitalExpenditures || 0) + 
    (cashFlowData.acquisitions || 0) + 
    (cashFlowData.investments || 0) + 
    (cashFlowData.otherInvestingActivities || 0);

  const financingCashFlow = (cashFlowData.dividendsPaid || 0) + 
    (cashFlowData.stockRepurchases || 0) + 
    (cashFlowData.debtIssuance || 0) + 
    (cashFlowData.debtRepayment || 0) + 
    (cashFlowData.otherFinancingActivities || 0);

  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;

  const categoryExplanations = {
    netIncome: {
      short: "Total profit or loss for the period",
      long: "Net Income represents the company's total profit or loss for the period after all expenses, taxes, and other deductions have been accounted for. It's the starting point for calculating operating cash flow.",
      importance: "Net Income is crucial for understanding a company's profitability and its ability to generate cash from operations.",
      analysis: "Analyze trends in net income over time and compare it to industry benchmarks to assess the company's performance.",
      ratios: [
        {
          name: "Net Income Margin",
          formula: "Net Income / Revenue",
          interpretation: "Indicates the percentage of revenue that translates into profit"
        },
        {
          name: "Return on Assets (ROA)",
          formula: "Net Income / Total Assets",
          interpretation: "Measures how efficiently a company uses its assets to generate profit"
        }
      ]
    },
    depreciation: {
      short: "Non-cash expense for the wear and tear of assets",
      long: "Depreciation is a non-cash expense that represents the wear and tear of tangible assets over time. It's added back to net income in the cash flow statement because it doesn't involve an actual cash outflow.",
      importance: "Depreciation is important for understanding the impact of asset usage on cash flow and profitability.",
      analysis: "Analyze the depreciation methods used, the age of assets, and the relationship between depreciation and capital expenditures.",
      ratios: [
        {
          name: "Depreciation to Revenue",
          formula: "Depreciation / Revenue",
          interpretation: "Indicates the proportion of revenue allocated to depreciation"
        },
        {
          name: "Depreciation to Total Assets",
          formula: "Depreciation / Total Assets",
          interpretation: "Shows the rate at which assets are being depreciated"
        }
      ]
    },
    changesInWorkingCapital: {
      short: "Changes in current assets and liabilities",
      long: "Changes in Working Capital represent the net effect of changes in current assets and liabilities. It reflects the company's ability to manage its short-term resources and obligations.",
      importance: "Changes in Working Capital are crucial for understanding a company's operational efficiency and cash flow management.",
      analysis: "Analyze the components of working capital, such as inventory, accounts receivable, and accounts payable, to identify trends and potential issues.",
      ratios: [
        {
          name: "Working Capital Ratio",
          formula: "Current Assets / Current Liabilities",
          interpretation: "Indicates a company's ability to meet its short-term obligations"
        },
        {
          name: "Working Capital Turnover",
          formula: "Revenue / Average Working Capital",
          interpretation: "Shows how efficiently a company uses its working capital to generate sales"
        }
      ]
    },
    capitalExpenditures: {
      short: "Investments in long-term assets",
      long: "Capital Expenditures represent investments in long-term assets such as property, plant, and equipment. They are crucial for a company's growth and operational capacity.",
      importance: "Capital Expenditures are important for understanding a company's investment in its future growth and operational efficiency.",
      analysis: "Analyze the types of assets being acquired, the expected returns on investment, and the impact on future cash flows.",
      ratios: [
        {
          name: "Capital Expenditures to Revenue",
          formula: "Capital Expenditures / Revenue",
          interpretation: "Indicates the proportion of revenue invested in long-term assets"
        },
        {
          name: "Capital Expenditures to Depreciation",
          formula: "Capital Expenditures / Depreciation",
          interpretation: "Shows whether a company is investing enough to maintain its asset base"
        }
      ]
    },
    // ... Add similar detailed explanations for other categories ...
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseInfoPanel = () => {
    setSelectedCategory(null);
  };

  return (
    <div className="cash-flow">
      <div className="statement-header">
        <h2>Cash Flow Statement</h2>
        <p className="statement-description">
          The Cash Flow Statement shows how cash moves in and out of the company over a period of time.
          Click on any category to learn more about what it means and how to analyze it.
        </p>
      </div>

      <table className="financial-table">
        <tbody>
          <tr className="section-header">
            <td colSpan="2">Operating Activities</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('netIncome')}
              className="clickable-category"
              data-tooltip={categoryExplanations.netIncome.short}
            >
              {formatCategoryName('netIncome')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.netIncome}
                onChange={(e) => handleChange('netIncome', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('depreciation')}
              className="clickable-category"
              data-tooltip={categoryExplanations.depreciation.short}
            >
              {formatCategoryName('depreciation')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.depreciation}
                onChange={(e) => handleChange('depreciation', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changesInWorkingCapital')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changesInWorkingCapital.short}
            >
              {formatCategoryName('changesInWorkingCapital')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changesInWorkingCapital}
                onChange={(e) => handleChange('changesInWorkingCapital', e.target.value)}
              />
            </td>
          </tr>
          {/* ... Continue updating other rows similarly ... */}
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

export default CashFlow; 