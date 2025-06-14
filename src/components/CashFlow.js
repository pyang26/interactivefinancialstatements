import React, { useState, useEffect } from 'react';
import FinancialInfoPanel from './FinancialInfoPanel';

function CashFlow({ initialData }) {
  const [cashFlowData, setCashFlowData] = useState({
    // Operating Activities
    netIncome: 0,
    depreciation: 0,
    changeToNetIncome: 0,
    changeToAccountReceivables: 0,
    changeToLiabilities: 0,
    changeToInventory: 0,
    changeToOperatingActivities: 0,
    totalCashFromOperatingActivities: 0,
    // Investing Activities
    capitalExpenditures: 0,
    investments: 0,
    otherCashflowsFromInvestingActivities: 0,
    totalCashflowsFromInvestingActivities: 0,
    // Financing Activities
    dividendsPaid: 0,
    netBorrowings: 0,
    otherCashflowsFromFinancingActivities: 0,
    totalCashflowsFromFinancingActivities: 0,
    // Other
    effectOfExchangeRate: 0,
    changeInCash: 0,
    changeInCashAndCashEquivalents: 0
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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleCloseInfoPanel = () => {
    setSelectedCategory(null);
  };

  // Calculate totals
  const operatingCashFlow = (cashFlowData.netIncome || 0) + 
    (cashFlowData.depreciation || 0) + 
    (cashFlowData.changeToNetIncome || 0) + 
    (cashFlowData.changeToAccountReceivables || 0) + 
    (cashFlowData.changeToLiabilities || 0) + 
    (cashFlowData.changeToInventory || 0) + 
    (cashFlowData.changeToOperatingActivities || 0);

  const investingCashFlow = (cashFlowData.capitalExpenditures || 0) + 
    (cashFlowData.investments || 0) + 
    (cashFlowData.otherCashflowsFromInvestingActivities || 0);

  const financingCashFlow = (cashFlowData.dividendsPaid || 0) + 
    (cashFlowData.netBorrowings || 0) + 
    (cashFlowData.otherCashflowsFromFinancingActivities || 0);

  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;

  const categoryExplanations = {
    netIncome: {
      short: "Starting point for cash flow calculation, representing the company's profit",
      long: "Net Income is the starting point for the cash flow statement using the indirect method. It represents the company's profit after all expenses, including operating expenses, interest, and taxes, have been deducted from revenue. This figure is taken directly from the income statement. The indirect method starts with net income because it's based on accrual accounting, which recognizes revenue when earned and expenses when incurred, regardless of when cash changes hands.",
      importance: "Net Income is crucial as it's the foundation for calculating operating cash flow and understanding the company's overall profitability. It helps investors understand how well the company converts its accounting profits into actual cash.",
      analysis: "Compare net income to operating cash flow to assess the quality of earnings and the company's ability to convert profits into cash. A significant difference between net income and operating cash flow may indicate aggressive revenue recognition or delayed expense recognition.",
      ratios: [
        {
          name: "Cash Flow to Net Income",
          formula: "Operating Cash Flow / Net Income",
          interpretation: "Measures how well net income is converted into cash. A ratio greater than 1 indicates strong cash generation relative to reported profits."
        },
        {
          name: "Quality of Earnings",
          formula: "Operating Cash Flow / Net Income",
          interpretation: "Indicates the reliability of reported earnings. A ratio consistently below 1 may suggest earnings quality issues."
        }
      ]
    },
    depreciation: {
      short: "Non-cash expense that reduces the value of assets over time",
      long: "Depreciation is a non-cash expense that represents the gradual reduction in the value of tangible assets over time. It's added back to net income in the cash flow statement because it doesn't involve an actual cash outflow. This is a key adjustment in the indirect method of cash flow calculation, as it represents an expense that reduces net income but doesn't affect cash. Different depreciation methods (straight-line, declining balance, units of production) can significantly impact reported earnings while having no effect on cash flow.",
      importance: "Depreciation is important for understanding the company's capital intensity and the impact of asset aging on cash flows. It also provides insights into the company's investment in long-term assets and its maintenance requirements.",
      analysis: "Compare depreciation to capital expenditures to assess whether the company is maintaining or growing its asset base. A ratio of capital expenditures to depreciation greater than 1 indicates the company is expanding its asset base.",
      ratios: [
        {
          name: "Depreciation to Revenue",
          formula: "Depreciation / Total Revenue",
          interpretation: "Shows the capital intensity of the business. Higher ratios indicate more capital-intensive operations."
        },
        {
          name: "Depreciation to Assets",
          formula: "Depreciation / Total Assets",
          interpretation: "Indicates the rate at which assets are being depreciated and helps assess the age of the asset base."
        }
      ]
    },
    changeToNetIncome: {
      short: "Adjustments to net income to arrive at operating cash flow",
      long: "Change to Net Income represents various adjustments made to net income to arrive at operating cash flow. These adjustments include non-cash items (like depreciation and amortization), changes in working capital, and other items that affect cash flow but not net income. This category is crucial for understanding the differences between accrual-based accounting (used in the income statement) and cash-based accounting (used in the cash flow statement).",
      importance: "These adjustments are crucial for understanding the differences between reported earnings and actual cash flows. They help investors identify potential red flags in earnings quality and assess the company's working capital management.",
      analysis: "Analyze the nature and magnitude of adjustments to assess the quality of earnings and the company's working capital management. Large or volatile adjustments may indicate aggressive accounting practices or operational issues.",
      ratios: [
        {
          name: "Adjustment Impact",
          formula: "Change to Net Income / Net Income",
          interpretation: "Shows the relative impact of adjustments on net income. Large ratios may indicate significant differences between reported earnings and cash flows."
        },
        {
          name: "Cash Flow Quality",
          formula: "Operating Cash Flow / (Net Income + Depreciation)",
          interpretation: "Indicates the quality of cash flow generation. Higher ratios suggest better cash flow quality."
        }
      ]
    },
    changeToAccountReceivables: {
      short: "Changes in amounts owed by customers",
      long: "Change to Accounts Receivables represents the net change in amounts owed by customers during the period. An increase in receivables (negative cash flow) means the company has made sales on credit but hasn't collected the cash yet, while a decrease (positive cash flow) means the company has collected more cash from previous credit sales. This is a key working capital metric that affects cash flow but not net income, as revenue is recognized when the sale is made, not when cash is collected.",
      importance: "This metric is crucial for understanding the company's credit and collection policies and their impact on cash flow. It helps assess the company's ability to convert sales into cash and manage its working capital effectively.",
      analysis: "Compare changes in receivables to revenue growth to assess the effectiveness of credit and collection policies. If receivables grow faster than revenue, it may indicate loosening credit terms or collection issues.",
      ratios: [
        {
          name: "Days Sales Outstanding",
          formula: "(Accounts Receivable / Revenue) × 365",
          interpretation: "Shows how long it takes to collect payment from customers. Lower days indicate better collection efficiency."
        },
        {
          name: "Receivables Turnover",
          formula: "Revenue / Average Accounts Receivable",
          interpretation: "Indicates how efficiently the company collects its receivables. Higher turnover suggests better collection efficiency."
        }
      ]
    },
    changeToLiabilities: {
      short: "Changes in amounts owed to suppliers and other creditors",
      long: "Change to Liabilities represents the net change in amounts owed to suppliers, employees, and other creditors during the period. An increase in liabilities (positive cash flow) means the company has deferred cash payments, while a decrease (negative cash flow) means the company has paid off more obligations. This is another key working capital metric that affects cash flow but not net income, as expenses are recognized when incurred, not when paid.",
      importance: "This metric is crucial for understanding the company's payment policies and their impact on cash flow. It helps assess the company's ability to manage its working capital and maintain good relationships with suppliers.",
      analysis: "Compare changes in liabilities to operating expenses to assess the company's ability to manage its payment obligations. If liabilities grow faster than expenses, it may indicate cash flow pressure or aggressive payment terms.",
      ratios: [
        {
          name: "Days Payable Outstanding",
          formula: "(Accounts Payable / Cost of Goods Sold) × 365",
          interpretation: "Shows how long the company takes to pay its suppliers. Higher days may indicate better working capital management but could also signal cash flow issues."
        },
        {
          name: "Payables Turnover",
          formula: "Cost of Goods Sold / Average Accounts Payable",
          interpretation: "Indicates how efficiently the company manages its payables. Lower turnover may suggest better working capital management."
        }
      ]
    },
    changeToInventory: {
      short: "Changes in the value of goods held for sale",
      long: "Change to Inventory represents the net change in the value of goods held for sale during the period. An increase in inventory (negative cash flow) means the company has purchased or produced more goods than it has sold, while a decrease (positive cash flow) means the company has sold more goods than it has purchased or produced. This is a critical working capital metric that affects cash flow but not net income, as cost of goods sold is recognized when the sale is made, not when inventory is purchased.",
      importance: "This metric is crucial for understanding the company's inventory management and its impact on cash flow. It helps assess the company's ability to manage its working capital and maintain efficient operations.",
      analysis: "Compare changes in inventory to cost of goods sold to assess the efficiency of inventory management. If inventory grows faster than sales, it may indicate overstocking or slowing sales.",
      ratios: [
        {
          name: "Days Inventory Outstanding",
          formula: "(Inventory / Cost of Goods Sold) × 365",
          interpretation: "Shows how long inventory is held before being sold. Lower days indicate better inventory management."
        },
        {
          name: "Inventory Turnover",
          formula: "Cost of Goods Sold / Average Inventory",
          interpretation: "Indicates how efficiently the company manages its inventory. Higher turnover suggests better inventory management."
        }
      ]
    },
    changeToOperatingActivities: {
      short: "Net changes in working capital affecting operating cash flow",
      long: "Change to Operating Activities represents the net effect of all changes in working capital items (receivables, inventory, payables, etc.) on operating cash flow. This metric shows how efficiently the company manages its short-term assets and liabilities. It's a crucial component of the cash flow statement as it bridges the gap between accrual-based net income and cash-based operating cash flow. Understanding these changes is essential for assessing the company's operational efficiency and cash flow management.",
      importance: "This metric is crucial for understanding the company's working capital management and its impact on cash flow. It helps assess the company's ability to generate cash from its operations and manage its short-term obligations.",
      analysis: "Compare changes in operating activities to revenue to assess the efficiency of working capital management. Positive changes indicate improved cash flow from operations, while negative changes may signal operational issues.",
      ratios: [
        {
          name: "Working Capital Ratio",
          formula: "Current Assets / Current Liabilities",
          interpretation: "Shows the company's ability to meet short-term obligations. A ratio above 1 indicates sufficient working capital."
        },
        {
          name: "Cash Conversion Cycle",
          formula: "Days Inventory Outstanding + Days Sales Outstanding - Days Payable Outstanding",
          interpretation: "Indicates how long it takes to convert investments in inventory into cash. Lower days suggest better working capital management."
        }
      ]
    },
    totalCashFromOperatingActivities: {
      short: "Net cash generated from core business operations",
      long: "Total Cash from Operating Activities represents the net amount of cash generated or used by the company's core business operations. It's calculated by adjusting net income for non-cash items and changes in working capital. This is often considered the most important section of the cash flow statement as it shows the company's ability to generate cash from its core business activities. It's a key indicator of the company's financial health and its ability to fund growth, pay dividends, and service debt.",
      importance: "This metric is crucial for understanding the company's ability to generate cash from its core business activities. It's a key indicator of the company's financial health and its ability to fund growth, pay dividends, and service debt.",
      analysis: "Compare operating cash flow to net income and capital expenditures to assess the company's ability to fund growth and return cash to shareholders. Consistently positive operating cash flow is essential for long-term sustainability.",
      ratios: [
        {
          name: "Operating Cash Flow Ratio",
          formula: "Operating Cash Flow / Current Liabilities",
          interpretation: "Shows the company's ability to pay short-term obligations from operating cash flow. A ratio above 1 indicates strong short-term liquidity."
        },
        {
          name: "Cash Flow Coverage",
          formula: "Operating Cash Flow / Total Debt",
          interpretation: "Indicates the company's ability to service its debt from operating cash flow. Higher ratios suggest better debt servicing capacity."
        }
      ]
    },
    capitalExpenditures: {
      short: "Cash spent on acquiring or upgrading physical assets",
      long: "Capital Expenditures (CapEx) represents the cash spent on acquiring or upgrading physical assets such as property, plant, and equipment. These investments are crucial for maintaining and growing the company's productive capacity. CapEx is a key indicator of the company's growth strategy and its commitment to maintaining its asset base. It's important to distinguish between maintenance CapEx (required to maintain current operations) and growth CapEx (investments in new capacity or capabilities).",
      importance: "Capital Expenditures are crucial for understanding the company's investment in its future growth and maintenance of its asset base. They represent a significant use of cash that must be funded from operating cash flow or external financing.",
      analysis: "Compare capital expenditures to depreciation to assess whether the company is maintaining or growing its asset base. A ratio greater than 1 indicates the company is expanding its asset base.",
      ratios: [
        {
          name: "CapEx to Revenue",
          formula: "Capital Expenditures / Total Revenue",
          interpretation: "Shows the capital intensity of the business. Higher ratios indicate more capital-intensive operations."
        },
        {
          name: "CapEx to Depreciation",
          formula: "Capital Expenditures / Depreciation",
          interpretation: "Indicates whether the company is maintaining or growing its asset base. A ratio above 1 suggests expansion."
        }
      ]
    },
    investments: {
      short: "Cash spent on acquiring other companies or financial assets",
      long: "Investments represent cash spent on acquiring other companies, financial assets, or other long-term investments. These investments can be strategic acquisitions, portfolio investments, or other long-term assets. They represent the company's growth strategy and its use of cash for strategic purposes. It's important to distinguish between strategic investments (aligned with the company's core business) and financial investments (made for returns).",
      importance: "Investments are crucial for understanding the company's growth strategy and its use of cash for strategic purposes. They represent a significant use of cash that must be funded from operating cash flow or external financing.",
      analysis: "Compare investments to operating cash flow to assess the company's ability to fund growth through acquisitions. Large investments relative to operating cash flow may indicate aggressive growth strategies.",
      ratios: [
        {
          name: "Investment to Revenue",
          formula: "Investments / Total Revenue",
          interpretation: "Shows the relative size of investments compared to business scale. Higher ratios indicate more aggressive investment strategies."
        },
        {
          name: "Investment to Operating Cash Flow",
          formula: "Investments / Operating Cash Flow",
          interpretation: "Indicates the proportion of operating cash flow used for investments. Higher ratios suggest more aggressive investment strategies."
        }
      ]
    },
    otherCashflowsFromInvestingActivities: {
      short: "Other cash flows related to investing activities",
      long: "Other Cashflows from Investing Activities includes all other cash flows related to investing activities that aren't classified as capital expenditures or investments. This can include proceeds from asset sales, changes in short-term investments, and other investing-related cash flows. These cash flows are important for understanding the company's complete investing activities and their impact on cash flow. They may include one-time transactions or regular investing activities not captured in other categories.",
      importance: "These cash flows are important for understanding the company's complete investing activities and their impact on cash flow. They may include significant one-time transactions that affect the company's cash position.",
      analysis: "Analyze the nature and consistency of these cash flows to assess their impact on the company's investing strategy. One-time transactions should be considered separately from recurring investing activities.",
      ratios: [
        {
          name: "Investing Cash Flow to Total Assets",
          formula: "Investing Cash Flow / Total Assets",
          interpretation: "Shows the relative impact of investing activities on the company's asset base. Higher ratios indicate more active investing strategies."
        },
        {
          name: "Investing Cash Flow to Revenue",
          formula: "Investing Cash Flow / Total Revenue",
          interpretation: "Indicates the proportion of revenue used for investing activities. Higher ratios suggest more aggressive investment strategies."
        }
      ]
    },
    totalCashflowsFromInvestingActivities: {
      short: "Net cash used in or generated from investing activities",
      long: "Total Cashflows from Investing Activities represents the net amount of cash used in or generated from all investing activities, including capital expenditures, investments, and other investing-related cash flows. This section shows how the company is investing its cash for future growth and maintenance. It's important to understand the company's investment strategy and its impact on cash flow. Negative cash flow is normal in this section as companies typically invest more than they receive from investing activities.",
      importance: "This metric is crucial for understanding the company's investment strategy and its impact on cash flow. It shows how the company is investing its cash for future growth and maintenance.",
      analysis: "Compare investing cash flow to operating cash flow to assess the company's ability to fund its investment activities. Companies should be able to fund their investments from operating cash flow or have a clear plan for external financing.",
      ratios: [
        {
          name: "Investing to Operating Cash Flow",
          formula: "Investing Cash Flow / Operating Cash Flow",
          interpretation: "Shows the proportion of operating cash flow used for investing activities. Higher ratios indicate more aggressive investment strategies."
        },
        {
          name: "Free Cash Flow",
          formula: "Operating Cash Flow - Capital Expenditures",
          interpretation: "Indicates the cash available for distribution to investors. Higher free cash flow suggests better ability to return cash to shareholders."
        }
      ]
    },
    dividendsPaid: {
      short: "Cash distributed to shareholders as dividends",
      long: "Dividends Paid represents the cash distributed to shareholders as dividends. This is a key component of the company's capital return strategy and its commitment to shareholder returns. Dividends are typically paid from free cash flow (operating cash flow minus capital expenditures) and represent a commitment to returning cash to shareholders. The sustainability of dividends depends on the company's ability to generate sufficient free cash flow.",
      importance: "Dividends Paid is crucial for understanding the company's dividend policy and its commitment to returning cash to shareholders. It represents a significant use of cash that must be funded from free cash flow.",
      analysis: "Compare dividends paid to net income and free cash flow to assess the sustainability of the dividend policy. Dividends should be covered by free cash flow to be sustainable.",
      ratios: [
        {
          name: "Dividend Payout Ratio",
          formula: "Dividends Paid / Net Income",
          interpretation: "Shows the proportion of earnings paid as dividends. Lower ratios suggest more conservative dividend policies."
        },
        {
          name: "Dividend Coverage Ratio",
          formula: "Free Cash Flow / Dividends Paid",
          interpretation: "Indicates the company's ability to maintain its dividend payments. A ratio above 1 suggests sustainable dividends."
        }
      ]
    },
    netBorrowings: {
      short: "Net cash received from or paid for debt financing",
      long: "Net Borrowings represents the net amount of cash received from or paid for debt financing activities. This includes new debt issuances, debt repayments, and other debt-related cash flows. It's a key component of the company's capital structure and its financing strategy. Companies may borrow to fund growth, refinance existing debt, or return cash to shareholders. The sustainability of debt levels depends on the company's ability to generate sufficient cash flow to service the debt.",
      importance: "Net Borrowings is crucial for understanding the company's debt management strategy and its impact on cash flow. It shows how the company is financing its operations and growth.",
      analysis: "Compare net borrowings to operating cash flow and total debt to assess the company's debt management and financial flexibility. Companies should be able to service their debt from operating cash flow.",
      ratios: [
        {
          name: "Debt to Operating Cash Flow",
          formula: "Total Debt / Operating Cash Flow",
          interpretation: "Shows the company's ability to service its debt from operating cash flow. Lower ratios suggest better debt servicing capacity."
        },
        {
          name: "Net Debt to EBITDA",
          formula: "(Total Debt - Cash) / EBITDA",
          interpretation: "Indicates the company's leverage relative to its earnings. Lower ratios suggest less financial risk."
        }
      ]
    },
    otherCashflowsFromFinancingActivities: {
      short: "Other cash flows related to financing activities",
      long: "Other Cashflows from Financing Activities includes all other cash flows related to financing activities that aren't classified as dividends or borrowings. This can include proceeds from stock issuances, stock repurchases, and other financing-related cash flows. These cash flows are important for understanding the company's complete financing activities and their impact on cash flow. They may include one-time transactions or regular financing activities not captured in other categories.",
      importance: "These cash flows are important for understanding the company's complete financing activities and their impact on cash flow. They may include significant one-time transactions that affect the company's capital structure.",
      analysis: "Analyze the nature and consistency of these cash flows to assess their impact on the company's capital structure. One-time transactions should be considered separately from recurring financing activities.",
      ratios: [
        {
          name: "Financing Cash Flow to Total Assets",
          formula: "Financing Cash Flow / Total Assets",
          interpretation: "Shows the relative impact of financing activities on the company's asset base. Higher ratios indicate more active financing strategies."
        },
        {
          name: "Financing Cash Flow to Revenue",
          formula: "Financing Cash Flow / Total Revenue",
          interpretation: "Indicates the proportion of revenue used for financing activities. Higher ratios suggest more aggressive financing strategies."
        }
      ]
    },
    totalCashflowsFromFinancingActivities: {
      short: "Net cash used in or generated from financing activities",
      long: "Total Cashflows from Financing Activities represents the net amount of cash used in or generated from all financing activities, including dividends, borrowings, and other financing-related cash flows. This section shows how the company is financing its operations and growth. It's important to understand the company's financing strategy and its impact on cash flow. Companies may use financing activities to fund growth, return cash to shareholders, or manage their capital structure.",
      importance: "This metric is crucial for understanding the company's financing strategy and its impact on cash flow. It shows how the company is financing its operations and growth.",
      analysis: "Compare financing cash flow to operating cash flow to assess the company's ability to fund its financing activities. Companies should have a sustainable financing strategy that doesn't rely too heavily on external financing.",
      ratios: [
        {
          name: "Financing to Operating Cash Flow",
          formula: "Financing Cash Flow / Operating Cash Flow",
          interpretation: "Shows the proportion of operating cash flow used for financing activities. Higher ratios indicate more aggressive financing strategies."
        },
        {
          name: "Cash Flow Adequacy",
          formula: "Operating Cash Flow / (Capital Expenditures + Dividends)",
          interpretation: "Indicates the company's ability to fund its capital needs and dividends. A ratio above 1 suggests sustainable operations."
        }
      ]
    },
    effectOfExchangeRate: {
      short: "Impact of currency exchange rate changes on cash",
      long: "Effect of Exchange Rate represents the impact of currency exchange rate changes on the company's cash and cash equivalents. This is particularly important for companies with international operations. Changes in exchange rates can significantly impact the value of foreign currency holdings and affect the company's cash position. This effect is separate from operating, investing, and financing activities and represents the impact of currency translation on cash balances.",
      importance: "This metric is crucial for understanding the impact of currency fluctuations on the company's cash position. It's particularly important for companies with significant international operations.",
      analysis: "Compare the effect of exchange rate to total cash flow to assess the impact of currency risk on the company's cash position. Companies with significant international operations should have currency risk management strategies.",
      ratios: [
        {
          name: "Exchange Rate Impact",
          formula: "Effect of Exchange Rate / Total Cash Flow",
          interpretation: "Shows the relative impact of currency fluctuations on cash flow. Higher ratios indicate greater currency risk."
        },
        {
          name: "Currency Exposure",
          formula: "Foreign Currency Assets / Total Assets",
          interpretation: "Indicates the company's exposure to currency risk. Higher ratios suggest greater currency risk."
        }
      ]
    },
    changeInCash: {
      short: "Net change in cash and cash equivalents during the period",
      long: "Change in Cash represents the net change in the company's cash and cash equivalents during the period. It's calculated by summing the cash flows from operating, investing, and financing activities, plus the effect of exchange rate changes. This is the bottom line of the cash flow statement and shows the overall impact of all cash flow activities on the company's cash position. It's important to understand the sources and uses of cash to assess the company's financial health.",
      importance: "This metric is crucial for understanding the overall impact of all cash flow activities on the company's cash position. It shows whether the company is generating or using cash overall.",
      analysis: "Compare change in cash to total cash flow to assess the company's ability to maintain and grow its cash position. Companies should aim to maintain sufficient cash reserves while efficiently deploying excess cash.",
      ratios: [
        {
          name: "Cash Flow Growth",
          formula: "(Current Cash Flow - Previous Cash Flow) / Previous Cash Flow",
          interpretation: "Shows the rate at which cash flow is growing. Positive growth suggests improving cash generation."
        },
        {
          name: "Cash to Total Assets",
          formula: "Cash and Equivalents / Total Assets",
          interpretation: "Indicates the proportion of assets held in cash. Higher ratios suggest more conservative cash management."
        }
      ]
    },
    changeInCashAndCashEquivalents: {
      short: "Net change in cash and cash equivalents, including short-term investments",
      long: "Change in Cash and Cash Equivalents represents the net change in the company's cash and cash equivalents, including short-term investments that can be readily converted to cash. This is the most comprehensive measure of changes in the company's liquid assets. It includes not only physical cash and bank deposits but also highly liquid investments that can be converted to cash quickly. This metric is crucial for understanding the company's overall liquidity position and its ability to meet short-term obligations.",
      importance: "This metric is crucial for understanding the company's overall liquidity position and its ability to meet short-term obligations. It shows the net effect of all cash flow activities on the company's liquid assets.",
      analysis: "Compare change in cash and cash equivalents to total assets and current liabilities to assess the company's liquidity position. Companies should maintain sufficient liquid assets to meet their short-term obligations.",
      ratios: [
        {
          name: "Cash Ratio",
          formula: "Cash and Equivalents / Current Liabilities",
          interpretation: "Shows the company's ability to meet short-term obligations with cash. A ratio above 1 indicates strong short-term liquidity."
        },
        {
          name: "Cash to Working Capital",
          formula: "Cash and Equivalents / Working Capital",
          interpretation: "Indicates the proportion of working capital held in cash. Higher ratios suggest more conservative working capital management."
        }
      ]
    }
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
              onClick={() => handleCategoryClick('changeToNetIncome')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeToNetIncome.short}
            >
              {formatCategoryName('changeToNetIncome')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToNetIncome}
                onChange={(e) => handleChange('changeToNetIncome', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changeToAccountReceivables')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeToAccountReceivables.short}
            >
              {formatCategoryName('changeToAccountReceivables')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToAccountReceivables}
                onChange={(e) => handleChange('changeToAccountReceivables', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changeToLiabilities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeToLiabilities.short}
            >
              {formatCategoryName('changeToLiabilities')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToLiabilities}
                onChange={(e) => handleChange('changeToLiabilities', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changeToInventory')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeToInventory.short}
            >
              {formatCategoryName('changeToInventory')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToInventory}
                onChange={(e) => handleChange('changeToInventory', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changeToOperatingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeToOperatingActivities.short}
            >
              {formatCategoryName('changeToOperatingActivities')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeToOperatingActivities}
                onChange={(e) => handleChange('changeToOperatingActivities', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('totalCashFromOperatingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.totalCashFromOperatingActivities.short}
            >
              {formatCategoryName('totalCashFromOperatingActivities')}
            </td>
            <td>{formatCurrency(cashFlowData.totalCashFromOperatingActivities)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Investing Activities</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('capitalExpenditures')}
              className="clickable-category"
              data-tooltip={categoryExplanations.capitalExpenditures.short}
            >
              {formatCategoryName('capitalExpenditures')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.capitalExpenditures}
                onChange={(e) => handleChange('capitalExpenditures', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('investments')}
              className="clickable-category"
              data-tooltip={categoryExplanations.investments.short}
            >
              {formatCategoryName('investments')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.investments}
                onChange={(e) => handleChange('investments', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherCashflowsFromInvestingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherCashflowsFromInvestingActivities.short}
            >
              {formatCategoryName('otherCashflowsFromInvestingActivities')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.otherCashflowsFromInvestingActivities}
                onChange={(e) => handleChange('otherCashflowsFromInvestingActivities', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('totalCashflowsFromInvestingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.totalCashflowsFromInvestingActivities.short}
            >
              {formatCategoryName('totalCashflowsFromInvestingActivities')}
            </td>
            <td>{formatCurrency(cashFlowData.totalCashflowsFromInvestingActivities)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Financing Activities</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('dividendsPaid')}
              className="clickable-category"
              data-tooltip={categoryExplanations.dividendsPaid.short}
            >
              {formatCategoryName('dividendsPaid')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.dividendsPaid}
                onChange={(e) => handleChange('dividendsPaid', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('netBorrowings')}
              className="clickable-category"
              data-tooltip={categoryExplanations.netBorrowings.short}
            >
              {formatCategoryName('netBorrowings')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.netBorrowings}
                onChange={(e) => handleChange('netBorrowings', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('otherCashflowsFromFinancingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.otherCashflowsFromFinancingActivities.short}
            >
              {formatCategoryName('otherCashflowsFromFinancingActivities')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.otherCashflowsFromFinancingActivities}
                onChange={(e) => handleChange('otherCashflowsFromFinancingActivities', e.target.value)}
              />
            </td>
          </tr>
          <tr className="subtotal">
            <td 
              onClick={() => handleCategoryClick('totalCashflowsFromFinancingActivities')}
              className="clickable-category"
              data-tooltip={categoryExplanations.totalCashflowsFromFinancingActivities.short}
            >
              {formatCategoryName('totalCashflowsFromFinancingActivities')}
            </td>
            <td>{formatCurrency(cashFlowData.totalCashflowsFromFinancingActivities)}</td>
          </tr>

          <tr className="section-header">
            <td colSpan="2">Other</td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('effectOfExchangeRate')}
              className="clickable-category"
              data-tooltip={categoryExplanations.effectOfExchangeRate.short}
            >
              {formatCategoryName('effectOfExchangeRate')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.effectOfExchangeRate}
                onChange={(e) => handleChange('effectOfExchangeRate', e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td 
              onClick={() => handleCategoryClick('changeInCash')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeInCash.short}
            >
              {formatCategoryName('changeInCash')}
            </td>
            <td>
              <input
                type="number"
                value={cashFlowData.changeInCash}
                onChange={(e) => handleChange('changeInCash', e.target.value)}
              />
            </td>
          </tr>
          <tr className="total">
            <td 
              onClick={() => handleCategoryClick('changeInCashAndCashEquivalents')}
              className="clickable-category"
              data-tooltip={categoryExplanations.changeInCashAndCashEquivalents.short}
            >
              {formatCategoryName('changeInCashAndCashEquivalents')}
            </td>
            <td>{formatCurrency(cashFlowData.changeInCashAndCashEquivalents)}</td>
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

export default CashFlow; 