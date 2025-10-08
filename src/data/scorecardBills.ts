import { Category } from './categories';

export type ScorecardBill = {
  id: string;
  title: string;
  session: number;
  category: Category;
  status: "Introduced" | "In Committee" | "Hearing" | "Passed Committee" | "Crossover" | "Floor" | "Enrolled";
  owner?: string;
  due_date?: string;
  relevance_pct: number;
  reasons: string[];
  milestones: string[];
  sponsors?: { prime: string; cosponsors: number };
  change_flags?: string[];
  score_breakdown: {
    relevance: number;
    momentum: number;
    time_pressure: number;
    sponsor_strength: number;
    change_risk: number;
  };
  score_total: number;
  source_url: string;
  last_sync: string;
};

export const scorecardBills: ScorecardBill[] = [
  {
    id: "HB342",
    title: "UH Research Facilities Modernization",
    session: 2025,
    category: "Facilities",
    status: "In Committee",
    owner: "J. Yamada",
    due_date: "2025-01-18",
    relevance_pct: 97,
    reasons: ["explicit: UH", "facilities", "budget"],
    milestones: ["introduced", "hearing_scheduled"],
    sponsors: { prime: "Rep. Doe", cosponsors: 3 },
    change_flags: ["first UH mention in v3"],
    score_breakdown: {
      relevance: 29.1,
      momentum: 15,
      time_pressure: 12,
      sponsor_strength: 10,
      change_risk: 6
    },
    score_total: 72.1,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB342/",
    last_sync: "2025-10-07T10:10:00Z"
  },
  {
    id: "HB129",
    title: "Graduate Student Stipend Adjustment",
    session: 2025,
    category: "Higher Education",
    status: "Passed Committee",
    owner: "M. Santos",
    due_date: "2025-01-22",
    relevance_pct: 95,
    reasons: ["explicit: UH", "workforce", "budget"],
    milestones: ["introduced", "hearing_completed", "committee_passed"],
    sponsors: { prime: "Rep. Lee", cosponsors: 5 },
    change_flags: ["scope expanded in v2"],
    score_breakdown: {
      relevance: 28.5,
      momentum: 18,
      time_pressure: 10,
      sponsor_strength: 12,
      change_risk: 8
    },
    score_total: 76.5,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB129/",
    last_sync: "2025-10-07T10:05:00Z"
  },
  {
    id: "SB247",
    title: "Hawaiʻi Workforce Development Initiative",
    session: 2025,
    category: "Workforce",
    status: "Floor",
    owner: "K. Tanaka",
    due_date: "2025-01-25",
    relevance_pct: 89,
    reasons: ["implicit: UH community colleges", "workforce"],
    milestones: ["introduced", "hearing_completed", "committee_passed", "crossover"],
    sponsors: { prime: "Sen. Kim", cosponsors: 7 },
    score_breakdown: {
      relevance: 26.7,
      momentum: 20,
      time_pressure: 8,
      sponsor_strength: 14,
      change_risk: 0
    },
    score_total: 68.7,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/SB247/",
    last_sync: "2025-10-07T10:00:00Z"
  },
  {
    id: "HB415",
    title: "UH System Budget Appropriation FY 2025-26",
    session: 2025,
    category: "Budget",
    status: "Hearing",
    owner: "A. Chen",
    due_date: "2025-01-20",
    relevance_pct: 100,
    reasons: ["explicit: UH", "budget", "operating funds"],
    milestones: ["introduced", "hearing_scheduled"],
    sponsors: { prime: "Rep. Wong", cosponsors: 12 },
    score_breakdown: {
      relevance: 30,
      momentum: 12,
      time_pressure: 15,
      sponsor_strength: 18,
      change_risk: 0
    },
    score_total: 75,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB415/",
    last_sync: "2025-10-07T09:50:00Z"
  },
  {
    id: "SB189",
    title: "Research Grants and Federal Matching Program",
    session: 2025,
    category: "Research",
    status: "In Committee",
    owner: "T. Nguyen",
    due_date: "2025-01-23",
    relevance_pct: 92,
    reasons: ["explicit: UH", "research", "federal funding"],
    milestones: ["introduced", "hearing_scheduled"],
    sponsors: { prime: "Sen. Park", cosponsors: 4 },
    score_breakdown: {
      relevance: 27.6,
      momentum: 14,
      time_pressure: 11,
      sponsor_strength: 8,
      change_risk: 0
    },
    score_total: 60.6,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/SB189/",
    last_sync: "2025-10-07T09:45:00Z"
  },
  {
    id: "HB278",
    title: "UH Campus Safety and Security Improvements",
    session: 2025,
    category: "Facilities",
    status: "Introduced",
    owner: "L. Martinez",
    due_date: "2025-01-26",
    relevance_pct: 85,
    reasons: ["explicit: UH", "facilities", "safety"],
    milestones: ["introduced"],
    sponsors: { prime: "Rep. Garcia", cosponsors: 2 },
    score_breakdown: {
      relevance: 25.5,
      momentum: 8,
      time_pressure: 6,
      sponsor_strength: 4,
      change_risk: 0
    },
    score_total: 43.5,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB278/",
    last_sync: "2025-10-07T09:40:00Z"
  },
  {
    id: "SB312",
    title: "STEM Education and UH Partnership Expansion",
    session: 2025,
    category: "Higher Education",
    status: "Passed Committee",
    owner: "R. Patel",
    due_date: "2025-01-24",
    relevance_pct: 88,
    reasons: ["explicit: UH", "education", "STEM"],
    milestones: ["introduced", "hearing_completed", "committee_passed"],
    sponsors: { prime: "Sen. Johnson", cosponsors: 6 },
    score_breakdown: {
      relevance: 26.4,
      momentum: 16,
      time_pressure: 9,
      sponsor_strength: 12,
      change_risk: 0
    },
    score_total: 63.4,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/SB312/",
    last_sync: "2025-10-07T09:35:00Z"
  },
  {
    id: "HB501",
    title: "Hawaiian Language Revitalization at UH",
    session: 2025,
    category: "Higher Education",
    status: "In Committee",
    owner: "K. Kamaka",
    due_date: "2025-01-21",
    relevance_pct: 91,
    reasons: ["explicit: UH", "Hawaiian language", "cultural programs"],
    milestones: ["introduced", "hearing_scheduled"],
    sponsors: { prime: "Rep. Kalehua", cosponsors: 8 },
    score_breakdown: {
      relevance: 27.3,
      momentum: 13,
      time_pressure: 13,
      sponsor_strength: 16,
      change_risk: 0
    },
    score_total: 69.3,
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB501/",
    last_sync: "2025-10-07T09:30:00Z"
  }
];
