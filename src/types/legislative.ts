export type ConfidenceLevel = 'Provisional' | 'Confirmed';
export type ReviewState = 'Unreviewed' | 'Edited' | 'Approved';
export type BillStatus = 'Introduced' | 'In Committee' | 'Passed' | 'Vetoed' | 'Enacted';
export type Stance = 'Support' | 'Oppose' | 'Monitor' | 'Comment';

export interface Bill {
  id: string;
  number: string;
  title: string;
  chamber: 'House' | 'Senate';
  session: string;
  status: BillStatus;
  lastActionAt: string;
  relevanceScore?: number;
  reasonTags?: string[];
  assignedTo?: string;
  dueDate?: string;
  confidence?: ConfidenceLevel;
}

export interface BillText {
  id: string;
  billId: string;
  version: string;
  text: string;
  sourceUrl: string;
  uploadedAt: string;
}

export interface Amendment {
  id: string;
  billId: string;
  fromVersion: string;
  toVersion: string;
  diffHtml: string;
  uhFirstMention: boolean;
  sectionsChanged: string[];
  timestamp: string;
}

export interface Hearing {
  id: string;
  billId: string;
  datetime: string;
  room: string;
  committee: string;
  videoUrl?: string;
  speakers?: Speaker[];
  reconveneTime?: string;
  reconveneRoom?: string;
}

export interface Speaker {
  name: string;
  organization: string;
  timestamp: string;
  summary: string;
  stance?: Stance;
}

export interface Testimony {
  id: string;
  billId?: string;
  year: number;
  stance: Stance;
  summary: string;
  fileUrl: string;
  author: string;
}

export interface Assignment {
  id: string;
  billId: string;
  assignee: string;
  dueAt: string;
  status: 'Open' | 'In Progress' | 'Completed';
}
