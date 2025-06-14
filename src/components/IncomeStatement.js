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
    grossProfit: {
      short: "Revenue minus cost of revenue, showing the profit before operating expenses",
      long: "Gross Profit represents the profit a company makes after deducting the costs associated with making and selling its products or services. It's calculated by subtracting Cost of Revenue from Total Revenue. This metric shows how efficiently a company uses its resources to produce goods and services.",
      importance: "Gross Profit is essential for understanding a company's core profitability and its ability to cover operating expenses and generate net income.",
      analysis: "Analyze gross profit trends over time and compare gross profit margins with industry peers to assess competitive position and pricing power.",
      ratios: [
        {
          name: "Gross Profit Margin",
          formula: "Gross Profit / Total Revenue",
          interpretation: "Shows the percentage of revenue that remains after accounting for direct costs"
        },
        {
          name: "Gross Profit Growth",
          formula: "(Current Gross Profit - Previous Gross Profit) / Previous Gross Profit",
          interpretation: "Measures the rate at which gross profit is growing"
        }
      ]
    },
    researchDevelopment: {
      short: "Expenses incurred in developing new products and improving existing ones",
      long: "Research and Development (R&D) expenses represent the costs associated with developing new products, services, or processes, and improving existing ones. These expenses are crucial for companies that need to innovate to maintain their competitive edge.",
      importance: "R&D spending is vital for companies in technology, pharmaceuticals, and other innovation-driven industries. It indicates a company's commitment to future growth and competitiveness.",
      analysis: "Compare R&D spending to revenue and industry peers, and evaluate the effectiveness of R&D investments in generating new products or improvements.",
      ratios: [
        {
          name: "R&D to Revenue",
          formula: "R&D Expenses / Total Revenue",
          interpretation: "Shows what portion of revenue is invested in research and development"
        },
        {
          name: "R&D Growth Rate",
          formula: "(Current R&D - Previous R&D) / Previous R&D",
          interpretation: "Measures the rate at which R&D spending is growing"
        }
      ]
    },
    sellingGeneralAndAdmin: {
      short: "Expenses related to selling products and managing the business",
      long: "Selling, General, and Administrative (SG&A) expenses include all costs associated with selling products and managing the business. This includes marketing, sales commissions, administrative salaries, office expenses, and other overhead costs.",
      importance: "SG&A expenses are crucial for understanding a company's operational efficiency and its ability to manage costs while growing the business.",
      analysis: "Analyze SG&A expenses relative to revenue and compare with industry peers to assess operational efficiency and cost management.",
      ratios: [
        {
          name: "SG&A to Revenue",
          formula: "SG&A Expenses / Total Revenue",
          interpretation: "Shows what portion of revenue is spent on selling and administrative activities"
        },
        {
          name: "SG&A per Employee",
          formula: "SG&A Expenses / Number of Employees",
          interpretation: "Indicates the average cost of selling and administrative activities per employee"
        }
      ]
    },
    operatingExpense: {
      short: "Total expenses incurred in running the business operations",
      long: "Operating Expenses represent all costs incurred in running the day-to-day operations of the business. This includes SG&A expenses, R&D, and other operational costs. These expenses are essential for maintaining and growing the business.",
      importance: "Operating Expenses are crucial for understanding a company's operational efficiency and its ability to generate profit from its core business activities.",
      analysis: "Compare operating expenses to revenue and industry peers, and analyze trends over time to identify efficiency improvements or cost increases.",
      ratios: [
        {
          name: "Operating Expense Ratio",
          formula: "Operating Expenses / Total Revenue",
          interpretation: "Shows what portion of revenue is consumed by operating expenses"
        },
        {
          name: "Operating Leverage",
          formula: "Contribution Margin / Operating Income",
          interpretation: "Indicates how sensitive operating income is to changes in revenue"
        }
      ]
    },
    operatingIncome: {
      short: "Profit earned from core business operations before interest and taxes",
      long: "Operating Income (also known as EBIT - Earnings Before Interest and Taxes) represents the profit earned from a company's core business operations. It's calculated by subtracting operating expenses from gross profit. This metric shows how well a company is performing in its primary business activities.",
      importance: "Operating Income is crucial for understanding a company's core profitability and its ability to generate profit from its main business operations.",
      analysis: "Compare operating income to revenue and industry peers, and analyze trends over time to assess operational efficiency and profitability.",
      ratios: [
        {
          name: "Operating Margin",
          formula: "Operating Income / Total Revenue",
          interpretation: "Shows the percentage of revenue that remains after accounting for operating expenses"
        },
        {
          name: "Operating Income Growth",
          formula: "(Current Operating Income - Previous Operating Income) / Previous Operating Income",
          interpretation: "Measures the rate at which operating income is growing"
        }
      ]
    },
    interestExpense: {
      short: "Cost of borrowing money, including interest on loans and bonds",
      long: "Interest Expense represents the cost of borrowing money, including interest payments on loans, bonds, and other debt instruments. This expense reflects the company's cost of capital and its financial leverage.",
      importance: "Interest Expense is crucial for understanding a company's financial structure and its ability to service its debt obligations.",
      analysis: "Compare interest expense to operating income and analyze debt levels to assess financial risk and sustainability.",
      ratios: [
        {
          name: "Interest Coverage Ratio",
          formula: "Operating Income / Interest Expense",
          interpretation: "Indicates a company's ability to pay interest on its debt"
        },
        {
          name: "Interest to Revenue",
          formula: "Interest Expense / Total Revenue",
          interpretation: "Shows what portion of revenue is consumed by interest payments"
        }
      ]
    },
    otherIncomeExpense: {
      short: "Income or expenses from non-operating activities",
      long: "Other Income and Expenses include all income and expenses that are not related to the company's core business operations. This can include gains or losses from investments, foreign exchange, asset sales, or other non-operating activities.",
      importance: "Other Income and Expenses are important for understanding a company's total financial performance, including non-operating activities that can significantly impact profitability.",
      analysis: "Analyze the nature and consistency of other income and expenses to assess their impact on overall profitability.",
      ratios: [
        {
          name: "Other Income to Revenue",
          formula: "Other Income / Total Revenue",
          interpretation: "Shows what portion of revenue comes from non-operating activities"
        },
        {
          name: "Other Expenses to Revenue",
          formula: "Other Expenses / Total Revenue",
          interpretation: "Indicates the impact of non-operating expenses on revenue"
        }
      ]
    },
    incomeBeforeTax: {
      short: "Profit before income taxes are deducted",
      long: "Income Before Tax (also known as EBT - Earnings Before Tax) represents the company's profit before income taxes are deducted. It's calculated by adding other income and subtracting other expenses from operating income. This metric shows the company's profitability before tax obligations.",
      importance: "Income Before Tax is crucial for understanding a company's overall profitability and its ability to generate earnings before tax considerations.",
      analysis: "Compare income before tax to revenue and analyze trends over time to assess overall profitability and tax efficiency.",
      ratios: [
        {
          name: "Pre-tax Margin",
          formula: "Income Before Tax / Total Revenue",
          interpretation: "Shows the percentage of revenue that remains before taxes"
        },
        {
          name: "Pre-tax Income Growth",
          formula: "(Current Pre-tax Income - Previous Pre-tax Income) / Previous Pre-tax Income",
          interpretation: "Measures the rate at which pre-tax income is growing"
        }
      ]
    },
    incomeTaxExpense: {
      short: "Taxes owed to government based on taxable income",
      long: "Income Tax Expense represents the amount of taxes a company owes to government authorities based on its taxable income. This includes current and deferred taxes, and reflects the company's effective tax rate.",
      importance: "Income Tax Expense is crucial for understanding a company's tax burden and its impact on net profitability.",
      analysis: "Compare effective tax rates to statutory rates and industry peers to assess tax efficiency and potential tax risks.",
      ratios: [
        {
          name: "Effective Tax Rate",
          formula: "Income Tax Expense / Income Before Tax",
          interpretation: "Shows the actual tax rate paid by the company"
        },
        {
          name: "Tax to Revenue",
          formula: "Income Tax Expense / Total Revenue",
          interpretation: "Indicates what portion of revenue is paid in taxes"
        }
      ]
    },
    netIncome: {
      short: "Final profit after all expenses and taxes are deducted",
      long: "Net Income (also known as the bottom line) represents the company's final profit after all expenses, including operating expenses, interest, and taxes, have been deducted from revenue. It's the most comprehensive measure of a company's profitability.",
      importance: "Net Income is crucial for understanding a company's overall profitability and its ability to generate returns for shareholders.",
      analysis: "Compare net income to revenue and analyze trends over time to assess overall profitability and growth.",
      ratios: [
        {
          name: "Net Profit Margin",
          formula: "Net Income / Total Revenue",
          interpretation: "Shows the percentage of revenue that remains as profit"
        },
        {
          name: "Return on Equity (ROE)",
          formula: "Net Income / Shareholders' Equity",
          interpretation: "Measures the return generated on shareholders' investment"
        }
      ]
    },
    eps: {
      short: "Earnings per share, calculated as net income divided by number of shares",
      long: "Earnings Per Share (EPS) represents the portion of a company's profit allocated to each outstanding share of common stock. It's calculated by dividing net income by the weighted average number of common shares outstanding.",
      importance: "EPS is crucial for investors as it shows the company's profitability on a per-share basis and is a key metric for stock valuation.",
      analysis: "Compare EPS to historical values and industry peers, and analyze growth trends to assess profitability and shareholder value creation.",
      ratios: [
        {
          name: "EPS Growth",
          formula: "(Current EPS - Previous EPS) / Previous EPS",
          interpretation: "Measures the rate at which earnings per share are growing"
        },
        {
          name: "Price to Earnings (P/E)",
          formula: "Stock Price / EPS",
          interpretation: "Indicates how much investors are willing to pay for each dollar of earnings"
        }
      ]
    },
    epsDiluted: {
      short: "Earnings per share including potential shares from stock options and convertible securities",
      long: "Diluted Earnings Per Share (Diluted EPS) represents the company's earnings per share assuming all potential shares from stock options, convertible securities, and other dilutive instruments are exercised. It provides a more conservative view of earnings per share.",
      importance: "Diluted EPS is crucial for understanding the potential impact of stock-based compensation and convertible securities on shareholder value.",
      analysis: "Compare diluted EPS to basic EPS to assess the potential dilution impact, and analyze trends over time to evaluate the effectiveness of stock-based compensation.",
      ratios: [
        {
          name: "Dilution Impact",
          formula: "(Basic EPS - Diluted EPS) / Basic EPS",
          interpretation: "Shows the percentage impact of potential dilution on earnings per share"
        },
        {
          name: "Diluted P/E Ratio",
          formula: "Stock Price / Diluted EPS",
          interpretation: "Indicates the price-to-earnings ratio using diluted earnings"
        }
      ]
    },
    weightedAverageShares: {
      short: "Average number of shares outstanding during the period",
      long: "Weighted Average Shares represents the average number of common shares outstanding during a reporting period, weighted by the time they were outstanding. This metric is used to calculate basic earnings per share.",
      importance: "Weighted Average Shares is crucial for understanding the denominator in EPS calculations and the impact of share issuances or repurchases on per-share metrics.",
      analysis: "Analyze changes in weighted average shares over time to understand the impact of share issuances, repurchases, and other corporate actions.",
      ratios: [
        {
          name: "Shares Growth Rate",
          formula: "(Current Shares - Previous Shares) / Previous Shares",
          interpretation: "Measures the rate at which the number of shares is changing"
        },
        {
          name: "Market Cap per Share",
          formula: "Market Capitalization / Weighted Average Shares",
          interpretation: "Indicates the market value per share"
        }
      ]
    },
    weightedAverageSharesDiluted: {
      short: "Average number of shares including potential shares from stock options",
      long: "Weighted Average Shares Diluted represents the average number of common shares outstanding during a reporting period, including the potential impact of stock options, convertible securities, and other dilutive instruments. This metric is used to calculate diluted earnings per share.",
      importance: "Weighted Average Shares Diluted is crucial for understanding the potential dilution impact on per-share metrics and shareholder value.",
      analysis: "Compare diluted shares to basic shares to assess the potential dilution impact, and analyze trends over time to evaluate the effectiveness of stock-based compensation.",
      ratios: [
        {
          name: "Dilution Ratio",
          formula: "Weighted Average Shares Diluted / Weighted Average Shares",
          interpretation: "Shows the potential impact of dilution on per-share metrics"
        },
        {
          name: "Diluted Market Cap",
          formula: "Market Capitalization / Weighted Average Shares Diluted",
          interpretation: "Indicates the market value per diluted share"
        }
      ]
    }
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
              data-tooltip={categoryExplanations.grossProfit.short}
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
              data-tooltip={categoryExplanations.researchDevelopment.short}
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
              data-tooltip={categoryExplanations.sellingGeneralAndAdmin.short}
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
              data-tooltip={categoryExplanations.operatingExpense.short}
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
              data-tooltip={categoryExplanations.operatingIncome.short}
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
              data-tooltip={categoryExplanations.interestExpense.short}
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
              data-tooltip={categoryExplanations.otherIncomeExpense.short}
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
              data-tooltip={categoryExplanations.incomeBeforeTax.short}
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
              data-tooltip={categoryExplanations.incomeTaxExpense.short}
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
              data-tooltip={categoryExplanations.netIncome.short}
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
              data-tooltip={categoryExplanations.eps.short}
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
              data-tooltip={categoryExplanations.epsDiluted.short}
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
              data-tooltip={categoryExplanations.weightedAverageShares.short}
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
              data-tooltip={categoryExplanations.weightedAverageSharesDiluted.short}
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