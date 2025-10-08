export type RollCall = {
  session: number;
  chamber: "House" | "Senate";
  stage: "Committee" | "Floor";
  committee?: string | null;
  date: string;
  result: "Passed" | "Failed";
  counts: { aye: number; no: number; aye_wr: number; excused: number; nv: number };
  members: { name: string; party: "D" | "R" | "I"; vote: "Aye" | "No" | "Aye w/ reservations" | "Excused" | "NV" }[];
  source_url: string;
  last_sync: string;
};

export const votesByBill: Record<string, RollCall[]> = {
  HB342: [
    {
      session: 2025,
      chamber: "House",
      stage: "Floor",
      committee: null,
      date: "2025-01-21",
      result: "Passed",
      counts: { aye: 40, no: 10, aye_wr: 1, excused: 0, nv: 0 },
      members: [
        { name: "Rep. Andrew G.", party: "D", vote: "Aye" },
        { name: "Rep. Barbara L.", party: "R", vote: "No" },
        { name: "Rep. Carlos K.", party: "D", vote: "Aye w/ reservations" },
        { name: "Rep. Diana M.", party: "D", vote: "Aye" },
        { name: "Rep. Edward T.", party: "R", vote: "No" },
        { name: "Rep. Fiona H.", party: "D", vote: "Aye" },
        { name: "Rep. George S.", party: "D", vote: "Aye" },
        { name: "Rep. Helen W.", party: "R", vote: "No" }
      ],
      source_url: "https://data.capitol.hawaii.gov/sessions/session2025/rollcalls/HB342_floor_2025-01-21.pdf",
      last_sync: "2025-10-07T12:00:00Z"
    },
    {
      session: 2025,
      chamber: "House",
      stage: "Committee",
      committee: "FIN",
      date: "2025-01-15",
      result: "Passed",
      counts: { aye: 8, no: 2, aye_wr: 1, excused: 0, nv: 0 },
      members: [
        { name: "Rep. Andrew G.", party: "D", vote: "Aye" },
        { name: "Rep. Barbara L.", party: "R", vote: "No" },
        { name: "Rep. Carlos K.", party: "D", vote: "Aye w/ reservations" },
        { name: "Rep. Diana M.", party: "D", vote: "Aye" },
        { name: "Rep. Edward T.", party: "R", vote: "No" }
      ],
      source_url: "https://data.capitol.hawaii.gov/sessions/session2025/rollcalls/HB342_FIN_2025-01-15.pdf",
      last_sync: "2025-10-07T11:30:00Z"
    }
  ],
  HB129: [
    {
      session: 2025,
      chamber: "House",
      stage: "Committee",
      committee: "HED",
      date: "2025-01-20",
      result: "Passed",
      counts: { aye: 9, no: 1, aye_wr: 0, excused: 1, nv: 0 },
      members: [
        { name: "Rep. Andrew G.", party: "D", vote: "Aye" },
        { name: "Rep. Fiona H.", party: "D", vote: "Aye" },
        { name: "Rep. George S.", party: "D", vote: "Aye" },
        { name: "Rep. Barbara L.", party: "R", vote: "No" },
        { name: "Rep. Helen W.", party: "R", vote: "Excused" }
      ],
      source_url: "https://data.capitol.hawaii.gov/sessions/session2025/rollcalls/HB129_HED_2025-01-20.pdf",
      last_sync: "2025-10-07T11:45:00Z"
    }
  ],
  SB247: [
    {
      session: 2025,
      chamber: "Senate",
      stage: "Floor",
      committee: null,
      date: "2025-01-18",
      result: "Passed",
      counts: { aye: 22, no: 3, aye_wr: 0, excused: 0, nv: 0 },
      members: [
        { name: "Sen. Alice P.", party: "D", vote: "Aye" },
        { name: "Sen. Brian K.", party: "R", vote: "No" },
        { name: "Sen. Catherine L.", party: "D", vote: "Aye" },
        { name: "Sen. David M.", party: "D", vote: "Aye" },
        { name: "Sen. Emily R.", party: "R", vote: "No" }
      ],
      source_url: "https://data.capitol.hawaii.gov/sessions/session2025/rollcalls/SB247_floor_2025-01-18.pdf",
      last_sync: "2025-10-07T11:20:00Z"
    }
  ]
};
