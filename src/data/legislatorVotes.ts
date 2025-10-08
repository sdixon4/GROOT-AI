export type LegislatorProfile = {
  member: string;
  chamber: "House" | "Senate";
  party: "D" | "R" | "I";
  uh_alignment: number;
  participation_rate: number;
  since_intro_support: number;
  recent_votes: {
    bill_id: string;
    title: string;
    vote: "Aye" | "No" | "Aye w/ reservations" | "Excused" | "NV";
    date: string;
    result?: "Passed" | "Failed";
  }[];
  topics: string[];
};

export const legislatorVotes: LegislatorProfile[] = [
  {
    member: "Rep. Andrew G.",
    chamber: "House",
    party: "D",
    uh_alignment: 88,
    participation_rate: 95,
    since_intro_support: 82,
    recent_votes: [
      {
        bill_id: "HB342",
        title: "UH Research Facilities Modernization",
        vote: "Aye",
        date: "2025-01-21",
        result: "Passed"
      },
      {
        bill_id: "HB129",
        title: "Graduate Student Stipend Adjustment",
        vote: "Aye",
        date: "2025-01-20",
        result: "Passed"
      },
      {
        bill_id: "HB415",
        title: "UH System Budget Appropriation FY 2025-26",
        vote: "Aye",
        date: "2025-01-19"
      }
    ],
    topics: ["Higher Education", "Workforce", "Budget"]
  },
  {
    member: "Rep. Barbara L.",
    chamber: "House",
    party: "R",
    uh_alignment: 45,
    participation_rate: 92,
    since_intro_support: 38,
    recent_votes: [
      {
        bill_id: "HB342",
        title: "UH Research Facilities Modernization",
        vote: "No",
        date: "2025-01-21",
        result: "Passed"
      },
      {
        bill_id: "HB129",
        title: "Graduate Student Stipend Adjustment",
        vote: "No",
        date: "2025-01-20",
        result: "Passed"
      },
      {
        bill_id: "HB415",
        title: "UH System Budget Appropriation FY 2025-26",
        vote: "Aye w/ reservations",
        date: "2025-01-19"
      }
    ],
    topics: ["Budget", "Facilities"]
  },
  {
    member: "Sen. Alice P.",
    chamber: "Senate",
    party: "D",
    uh_alignment: 92,
    participation_rate: 98,
    since_intro_support: 90,
    recent_votes: [
      {
        bill_id: "SB247",
        title: "Hawaiʻi Workforce Development Initiative",
        vote: "Aye",
        date: "2025-01-18",
        result: "Passed"
      },
      {
        bill_id: "SB189",
        title: "Research Grants and Federal Matching Program",
        vote: "Aye",
        date: "2025-01-17"
      },
      {
        bill_id: "SB312",
        title: "STEM Education and UH Partnership Expansion",
        vote: "Aye",
        date: "2025-01-16",
        result: "Passed"
      }
    ],
    topics: ["Higher Education", "Research", "Workforce"]
  },
  {
    member: "Rep. Carlos K.",
    chamber: "House",
    party: "D",
    uh_alignment: 76,
    participation_rate: 88,
    since_intro_support: 70,
    recent_votes: [
      {
        bill_id: "HB342",
        title: "UH Research Facilities Modernization",
        vote: "Aye w/ reservations",
        date: "2025-01-21",
        result: "Passed"
      },
      {
        bill_id: "HB501",
        title: "Hawaiian Language Revitalization at UH",
        vote: "Aye",
        date: "2025-01-20"
      },
      {
        bill_id: "HB278",
        title: "UH Campus Safety and Security Improvements",
        vote: "Aye",
        date: "2025-01-19"
      }
    ],
    topics: ["Facilities", "Higher Education"]
  },
  {
    member: "Sen. Brian K.",
    chamber: "Senate",
    party: "R",
    uh_alignment: 52,
    participation_rate: 85,
    since_intro_support: 48,
    recent_votes: [
      {
        bill_id: "SB247",
        title: "Hawaiʻi Workforce Development Initiative",
        vote: "No",
        date: "2025-01-18",
        result: "Passed"
      },
      {
        bill_id: "SB189",
        title: "Research Grants and Federal Matching Program",
        vote: "Aye w/ reservations",
        date: "2025-01-17"
      },
      {
        bill_id: "SB312",
        title: "STEM Education and UH Partnership Expansion",
        vote: "Aye",
        date: "2025-01-16",
        result: "Passed"
      }
    ],
    topics: ["Research", "Budget"]
  }
];
