export type TranscriptHit = {
  hearing_id: string;
  committee: string;
  date: string;
  video_url: string;
  source: "HawaiiCapitolTV";
  last_sync: string;
  segments: Array<{
    t0: string;
    t1: string;
    speaker?: string;
    text: string;
    keywords?: string[];
  }>;
};

export const transcripts: TranscriptHit[] = [
  {
    hearing_id: "HED-2025-01-21",
    committee: "HED",
    date: "2025-01-21",
    video_url: "https://youtu.be/xxxxx",
    source: "HawaiiCapitolTV",
    last_sync: "2025-10-07T10:20:00Z",
    segments: [
      {
        t0: "00:14:22",
        t1: "00:14:52",
        speaker: "Chair",
        text: "We'll reconvene at 2:15 PM in Room 325.",
        keywords: ["reconvene"]
      },
      {
        t0: "00:22:05",
        t1: "00:22:40",
        speaker: "Member A",
        text: "Regarding University of Hawaiʻi West Oʻahu land use, this is critical for campus expansion.",
        keywords: ["University of Hawaiʻi", "West Oʻahu", "land"]
      },
      {
        t0: "00:35:10",
        t1: "00:35:45",
        speaker: "Testimony - Dr. Smith",
        text: "The University of Hawaiʻi System requires modern research facilities to remain competitive.",
        keywords: ["University of Hawaiʻi", "research", "facilities"]
      }
    ]
  },
  {
    hearing_id: "FIN-2025-01-19",
    committee: "FIN",
    date: "2025-01-19",
    video_url: "https://youtu.be/yyyyy",
    source: "HawaiiCapitolTV",
    last_sync: "2025-10-07T09:15:00Z",
    segments: [
      {
        t0: "01:12:30",
        t1: "01:13:15",
        speaker: "Rep. Johnson",
        text: "This funding allocation for University of Hawaiʻi Mānoa graduate programs is essential.",
        keywords: ["University of Hawaiʻi", "Mānoa", "funding", "graduate"]
      },
      {
        t0: "01:45:00",
        t1: "01:45:20",
        speaker: "Chair",
        text: "We will reconvene tomorrow at 10:00 AM in Conference Room 211.",
        keywords: ["reconvene"]
      }
    ]
  }
];
