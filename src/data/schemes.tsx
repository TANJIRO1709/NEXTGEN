const schemesData = [
    {
      scheme_name: "Post Office Savings Account (SB)",
      category: ["Savings", "Universal"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Adults", "Minors 10+", "Joint Accounts"],
      key_features: ["₹500 min balance", "No deposit cap", "₹50 min withdrawal"],
      benefits: [
        "Tax-free interest earnings.",
        "Access for urban and rural areas.",
        "Digital banking and secure deposits.",
      ],
    },
    {
      scheme_name: "Recurring Deposit Account (RD)",
      category: ["Savings", "Recurring Deposit"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Adults", "Minors 10+", "Joint Accounts"],
      key_features: ["₹100 monthly deposit", "5 years tenure", "Quarterly interest"],
      benefits: [
        "Loan against account balance.",
        "Advance deposit discounts.",
        "Guaranteed compounding growth.",
      ],
    },
    {
      scheme_name: "Time Deposit Account (TD)",
      category: ["Fixed Deposit", "Tax Saving"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Individuals", "Minors 10+", "Joint Accounts"],
      key_features: ["₹1000 min deposit", "1-5 year terms", "Tax deductions"],
      benefits: [
        "Safe investment with annual interest.",
        "Loan facility using TD as collateral.",
        "Guaranteed secure returns.",
      ],
    },
    {
      scheme_name: "Monthly Income Scheme (MIS)",
      category: ["Income Generation", "Fixed Income"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Adults", "Minors 10+", "Joint Accounts"],
      key_features: ["₹1000 min deposit", "Monthly payouts", "₹9L deposit cap"],
      benefits: [
        "Guaranteed fixed income monthly.",
        "Ideal for retirees and households.",
        "Low-risk government-backed option.",
      ],
    },
    {
      scheme_name: "Senior Citizen Savings Scheme (SCSS)",
      category: ["Retirement", "High Interest"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["60+ years", "Retired personnel 50-60"],
      key_features: ["₹1000 min deposit", "₹30L max limit", "5+3 years tenure"],
      benefits: [
        "Tax benefits under Section 80C.",
        "Quarterly interest payments available.",
        "Financial security for seniors.",
      ],
    },
    {
      scheme_name: "Public Provident Fund (PPF)",
      category: ["Long-term", "Tax Saving"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Individuals", "Guardians for minors"],
      key_features: ["₹500 min/year", "₹1.5L max/year", "Partial withdrawals"],
      benefits: [
        "Tax-free principal and interest.",
        "Loan available for emergencies.",
        "Safe long-term investment plan.",
      ],
    },
    {
      scheme_name: "Sukanya Samriddhi Account (SSA)",
      category: ["Girl Child", "Savings"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Girl child <10", "Max 2 accounts per family"],
      key_features: ["₹250 min/year", "₹1.5L max/year", "Tax-free growth"],
      benefits: [
        "Supports girl’s education and marriage.",
        "Accessible in rural and urban areas.",
        "Guaranteed government-backed returns.",
      ],
    },
    {
      scheme_name: "National Savings Certificate (NSC)",
      category: ["Fixed Income", "Tax Saving"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Individuals", "Joint Accounts", "Minors 10+"],
      key_features: ["₹1000 min deposit", "5 years tenure", "Loan collateral"],
      benefits: [
        "Tax-saving investments under Section 80C.",
        "Safe option with fixed interest rate.",
        "Accessible through post offices.",
      ],
    },
    {
      scheme_name: "Kisan Vikas Patra (KVP)",
      category: ["Doubling Investment", "Long-term"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Adults", "Minors 10+", "Joint Accounts"],
      key_features: ["₹1000 min deposit", "115 months maturity", "Loan collateral"],
      benefits: [
        "Guaranteed fixed returns on maturity.",
        "Low-risk government-backed option.",
        "Accessible in rural post offices.",
      ],
    },
    {
      scheme_name: "Mahila Samman Certificate",
      category: ["Women Empowerment", "Short-term"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Women", "Guardians of minors"],
      key_features: ["₹1000 min deposit", "₹2L max limit", "2 years term"],
      benefits: [
        "Partial withdrawal after one year.",
        "High returns with short tenure.",
        "Designed for financial independence.",
      ],
    },
    {
      scheme_name: "PM CARES for Children",
      category: ["COVID Relief", "Children"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["COVID orphans <18"],
      key_features: ["₹10L corpus", "Monthly stipend", "Support till 23 years"],
      benefits: [
        "Comprehensive financial support.",
        "Educational and living aid provided.",
        "Full maturity benefits at 23.",
      ],
    },
    {
      scheme_name: "Soil Health Card (SHC)",
      category: ["Farming", "Sustainability"],
      overview: "lorem is a kfwsf rtere fgrgrg eree rere gtetiwew etrthgtgh rerrshglsrhg efekldgjdg dvdjb",
      eligibility: ["Farmers"],
      key_features: ["Soil testing", "Crop suggestions", "Periodic updates"],
      benefits: [
        "Boosts productivity using balanced fertilizers.",
        "Reduces farming input costs efficiently.",
        "Ensures long-term soil sustainability.",
      ],
    },
  ];
  
  export default schemesData;
  