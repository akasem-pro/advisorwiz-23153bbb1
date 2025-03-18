
import { BlogPost } from '../types/blogTypes';

// This is mock data for the blog system
// In a real application, this would come from an API or CMS
export const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Choose the Right Financial Advisor for Your Needs',
    slug: 'how-to-choose-right-financial-advisor',
    excerpt: 'Finding the right financial advisor can be challenging. Learn about the key factors to consider when selecting a financial professional who aligns with your goals.',
    content: `
      <p>When it comes to your financial future, working with the right advisor can make all the difference. But how do you know who's right for you?</p>
      
      <h2>Understand the Different Types of Financial Advisors</h2>
      <p>Financial advisors come with different specializations, certifications, and compensation structures. Some of the common types include:</p>
      <ul>
        <li><strong>Certified Financial Planners (CFP)</strong> - Professionals who have completed extensive training and are held to a fiduciary standard</li>
        <li><strong>Registered Investment Advisors (RIA)</strong> - Firms or individuals who advise on securities and must register with the SEC or state securities authorities</li>
        <li><strong>Robo-advisors</strong> - Digital platforms that provide automated, algorithm-driven financial planning services</li>
      </ul>
      
      <h2>Determine What Services You Need</h2>
      <p>Before selecting an advisor, consider what specific help you're looking for:</p>
      <ul>
        <li>Comprehensive financial planning</li>
        <li>Retirement planning</li>
        <li>Investment management</li>
        <li>Tax planning</li>
        <li>Estate planning</li>
        <li>Insurance needs</li>
      </ul>
      
      <h2>Understand Fee Structures</h2>
      <p>Financial advisors typically charge for their services in one of these ways:</p>
      <ul>
        <li><strong>Fee-only</strong> - Charged as a percentage of assets managed, hourly rate, or flat fee</li>
        <li><strong>Commission-based</strong> - Earn money through commissions on products they sell</li>
        <li><strong>Fee-based</strong> - Combination of fees and commissions</li>
      </ul>
      
      <h2>Verify Credentials and Background</h2>
      <p>Always check an advisor's credentials, experience, and disciplinary history. You can use the following resources:</p>
      <ul>
        <li>FINRA's BrokerCheck</li>
        <li>SEC's Investment Adviser Public Disclosure website</li>
        <li>CFP Board's verification tool</li>
      </ul>
      
      <h2>Interview Potential Advisors</h2>
      <p>Prepare questions about their experience, investment philosophy, communication style, and how they handle conflicts of interest. Trust your instincts about whether you feel comfortable with them.</p>
      
      <h2>Using AdvisorWiz to Find Your Match</h2>
      <p>At AdvisorWiz, we've simplified this process by matching you with advisors who specifically meet your needs, preferences, and financial goals. Our algorithm considers factors like specialization, fee structure, communication style, and more to find your ideal financial partner.</p>
    `,
    featuredImage: '/lovable-uploads/d66162b8-d098-4ffe-a300-d14aa6ffe38e.png',
    publishDate: '2023-10-15T08:00:00Z',
    modifiedDate: '2023-10-20T10:30:00Z',
    author: {
      id: 'author1',
      name: 'Sarah Johnson',
      title: 'CFP®, Senior Financial Planner',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      bio: 'Sarah has over 15 years of experience in personal financial planning and retirement strategies.',
      certifications: ['CFP®', 'ChFC®'],
      profileLink: '/advisor-profile'
    },
    category: 'Financial Planning',
    tags: ['financial advisor', 'financial planning', 'retirement', 'investment strategy'],
    readingTime: 6
  },
  {
    id: '2',
    title: 'Retirement Planning in Your 40s: What You Need to Know',
    slug: 'retirement-planning-in-your-40s',
    excerpt: 'Your 40s are a crucial decade for retirement planning. Learn the essential strategies to maximize your retirement savings during this pivotal time.',
    content: `
      <p>If you're in your 40s, retirement planning takes on a new urgency. You're likely in your peak earning years, but you also have fewer years to save before retirement. Here's what you need to know.</p>
      
      <h2>Assess Where You Stand</h2>
      <p>The first step is to take an honest look at your current retirement savings. By your 40s, experts recommend having 2-3 times your annual salary saved. If you're behind, don't panic—you still have time to catch up.</p>
      
      <h2>Maximize Your Retirement Contributions</h2>
      <p>Take full advantage of tax-advantaged retirement accounts:</p>
      <ul>
        <li>Contribute the maximum to your 401(k) or workplace retirement plan, especially if your employer offers matching contributions</li>
        <li>Consider opening a Roth IRA if you qualify, or a traditional IRA if you don't</li>
        <li>If you're self-employed, explore SEP IRAs or Solo 401(k)s</li>
      </ul>
      
      <h2>Consider Catch-Up Contributions</h2>
      <p>Once you reach age 50, you can make additional "catch-up" contributions to retirement accounts. Plan for this increase in your financial strategy.</p>
      
      <h2>Rethink Your Asset Allocation</h2>
      <p>In your 40s, you still have 20+ years until retirement, which means you can afford to keep a significant portion of your portfolio in growth investments like stocks. However, it's also time to start gradually increasing your allocation to more conservative investments.</p>
      
      <h2>Create a Retirement Income Plan</h2>
      <p>Start thinking about how much income you'll need in retirement and where it will come from. Consider factors like:</p>
      <ul>
        <li>Social Security benefits (check your estimated benefits on the SSA website)</li>
        <li>Pension benefits if applicable</li>
        <li>Retirement account withdrawals</li>
        <li>Other income sources (rental properties, part-time work, etc.)</li>
      </ul>
      
      <h2>Pay Down High-Interest Debt</h2>
      <p>Eliminating high-interest debt, especially credit card debt, should be a priority. The interest you pay on this debt almost certainly exceeds the returns you're getting on your investments.</p>
      
      <h2>Consider Working with a Financial Advisor</h2>
      <p>A qualified financial advisor can help you create a comprehensive retirement plan tailored to your specific needs and goals. They can also help you navigate complex decisions about investments, tax planning, and more.</p>
    `,
    featuredImage: '/lovable-uploads/6212697e-73f6-458d-a12d-296c66576ee5.png',
    publishDate: '2023-09-28T09:15:00Z',
    author: {
      id: 'author2',
      name: 'Michael Chen',
      title: 'Retirement Planning Specialist',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      bio: 'Michael specializes in helping clients develop comprehensive retirement strategies.',
      certifications: ['CFA', 'RMA®'],
      profileLink: '/advisor-profile'
    },
    category: 'Retirement',
    tags: ['retirement planning', '401k', 'investment strategy', 'financial planning'],
    readingTime: 8
  },
  {
    id: '3',
    title: 'Tax-Efficient Investing: Strategies to Minimize Your Tax Burden',
    slug: 'tax-efficient-investing-strategies',
    excerpt: 'Taxes can significantly impact your investment returns. Discover proven strategies to make your investment portfolio more tax-efficient.',
    content: `
      <p>When it comes to investing, it's not just about what you earn—it's about what you keep after taxes. Tax-efficient investing can help you minimize your tax burden and maximize your returns.</p>
      
      <h2>Understand Different Types of Investment Income</h2>
      <p>The tax code treats different types of investment income differently:</p>
      <ul>
        <li><strong>Ordinary income</strong> - Interest from bonds and CDs is taxed at your marginal tax rate</li>
        <li><strong>Qualified dividends</strong> - Most dividends from U.S. companies are taxed at lower capital gains rates</li>
        <li><strong>Capital gains</strong> - Profits from selling investments held more than a year qualify for lower long-term capital gains rates</li>
      </ul>
      
      <h2>Use Tax-Advantaged Accounts Strategically</h2>
      <p>Properly using tax-advantaged accounts can significantly reduce your tax burden:</p>
      <ul>
        <li><strong>Traditional 401(k)s and IRAs</strong> - Contributions are tax-deductible now, but withdrawals are taxed as ordinary income in retirement</li>
        <li><strong>Roth 401(k)s and IRAs</strong> - Contributions are taxed now, but qualified withdrawals are tax-free in retirement</li>
        <li><strong>HSAs</strong> - Triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses</li>
      </ul>
      
      <h2>Asset Location: What Goes Where</h2>
      <p>Place investments in the right type of account based on their tax efficiency:</p>
      <ul>
        <li><strong>Tax-deferred accounts</strong> (traditional 401(k)s, IRAs): Hold tax-inefficient investments like bonds, REITs, and actively managed funds that generate significant short-term capital gains</li>
        <li><strong>Tax-exempt accounts</strong> (Roth 401(k)s, IRAs): Hold investments with the highest growth potential</li>
        <li><strong>Taxable accounts</strong>: Hold tax-efficient investments like index funds, ETFs, municipal bonds, and stocks you plan to hold long-term</li>
      </ul>
      
      <h2>Tax-Loss Harvesting</h2>
      <p>Tax-loss harvesting involves selling investments at a loss to offset capital gains. This strategy can help reduce your tax bill while keeping your investment strategy on track.</p>
      
      <h2>Consider Tax-Managed Funds</h2>
      <p>Some mutual funds and ETFs are specifically designed to minimize tax impacts through strategies like minimizing turnover and strategically harvesting losses.</p>
      
      <h2>Donate Appreciated Securities to Charity</h2>
      <p>Instead of selling appreciated securities and donating cash, consider donating the securities directly to charity. You'll avoid capital gains tax and still get a deduction for the fair market value.</p>
      
      <h2>Consult a Tax Professional</h2>
      <p>Tax laws are complex and constantly changing. Working with a tax professional or financial advisor who specializes in tax-efficient investing can help you develop a strategy tailored to your specific situation.</p>
    `,
    featuredImage: '/lovable-uploads/b3a65a71-f4f7-40ae-b3ef-dcc1ce0725c1.png',
    publishDate: '2023-08-12T14:30:00Z',
    author: {
      id: 'author3',
      name: 'Andrew Wilson',
      title: 'CPA, Tax Specialist',
      avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
      bio: 'Andrew helps clients optimize their tax strategies and minimize tax liabilities on investments.',
      certifications: ['CPA', 'CFP®'],
      profileLink: '/advisor-profile'
    },
    category: 'Tax Planning',
    tags: ['tax planning', 'investment strategy', 'capital gains', 'retirement accounts'],
    readingTime: 7
  }
];

// Sample authors for reference
export const blogAuthors = [
  {
    id: 'author1',
    name: 'Sarah Johnson',
    title: 'CFP®, Senior Financial Planner',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Sarah has over 15 years of experience in personal financial planning and retirement strategies.',
    certifications: ['CFP®', 'ChFC®'],
    profileLink: '/advisor-profile'
  },
  {
    id: 'author2',
    name: 'Michael Chen',
    title: 'Retirement Planning Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
    bio: 'Michael specializes in helping clients develop comprehensive retirement strategies.',
    certifications: ['CFA', 'RMA®'],
    profileLink: '/advisor-profile'
  },
  {
    id: 'author3',
    name: 'Andrew Wilson',
    title: 'CPA, Tax Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/52.jpg',
    bio: 'Andrew helps clients optimize their tax strategies and minimize tax liabilities on investments.',
    certifications: ['CPA', 'CFP®'],
    profileLink: '/advisor-profile'
  }
];
