export type BillAnalysis = {
  id: string;
  session: number;
  summary: string;
  key_sections: string[];
  what_changed: Array<{
    version_from: string;
    version_to: string;
    plain_explanation: string;
    why_it_matters: string;
    changed_passages: string[];
  }>;
  relevance_pct: number;
  reasons: string[];
  source_url: string;
  last_sync: string;
};

export const billAnalyses: BillAnalysis[] = [
  {
    id: "HB342",
    session: 2025,
    summary: "Modernizes UH research facilities across the system. Authorizes general obligation bonds for infrastructure improvements. Requires annual reporting to the legislature on facility utilization and research outcomes. Establishes a capital improvement priority framework.",
    key_sections: ["Facilities modernization", "Bond financing", "Reporting requirements", "Capital planning"],
    what_changed: [
      {
        version_from: "v2",
        version_to: "v3",
        plain_explanation: "Adds a specific clause referencing University of Hawaiʻi – West Oʻahu research facilities and laboratory spaces.",
        why_it_matters: "Could affect capital planning priorities and budget allocation for the West Oʻahu campus, potentially redirecting resources from other campuses.",
        changed_passages: [
          "… University of Hawaiʻi – West Oʻahu research complex and associated laboratory facilities …",
          "… priority consideration for West Oʻahu STEM infrastructure …"
        ]
      }
    ],
    relevance_pct: 97,
    reasons: ["explicit: UH", "facilities", "budget"],
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB342/",
    last_sync: "2025-10-07T10:10:00Z"
  },
  {
    id: "HB129",
    session: 2025,
    summary: "Adjusts graduate student stipends at University of Hawaiʻi to match federal poverty guidelines. Phases in increases over three years. Covers teaching assistants, research assistants, and graduate fellows. Funded through UH general funds and external grants.",
    key_sections: ["Graduate stipends", "Phased implementation", "Funding sources"],
    what_changed: [
      {
        version_from: "v1",
        version_to: "v2",
        plain_explanation: "Extends stipend increases to include graduate students in professional programs (MBA, JD, etc.), not just research-focused degrees.",
        why_it_matters: "Significantly increases the cost and broadens the scope beyond the original intent, affecting more graduate programs and potentially straining the budget.",
        changed_passages: [
          "… all graduate students enrolled in degree-granting programs …",
          "… professional degree programs including but not limited to …"
        ]
      }
    ],
    relevance_pct: 95,
    reasons: ["explicit: UH", "workforce", "budget"],
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/HB129/",
    last_sync: "2025-10-07T10:05:00Z"
  },
  {
    id: "SB247",
    session: 2025,
    summary: "Establishes the Hawaiʻi Workforce Development Initiative with partnerships between UH community colleges and industry. Creates apprenticeship pathways in high-demand fields. Provides tax incentives for participating employers.",
    key_sections: ["Workforce development", "Community college partnerships", "Tax incentives"],
    what_changed: [],
    relevance_pct: 89,
    reasons: ["implicit: UH community colleges", "workforce"],
    source_url: "https://data.capitol.hawaii.gov/sessions/session2025/bills/SB247/",
    last_sync: "2025-10-07T10:00:00Z"
  }
];
