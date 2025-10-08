import { legislatorVotes, LegislatorProfile } from '@/data/legislatorVotes';
import { votesByBill, RollCall } from '@/data/votesByBill';

/**
 * Calculate UH alignment percentage for a legislator
 * Based on supportive votes on UH-important bills that passed
 */
export function calculateUHAlignment(member: string): number {
  const profile = legislatorVotes.find(l => l.member === member);
  if (!profile) return 0;
  
  return profile.uh_alignment;
}

/**
 * Calculate participation rate for a legislator
 * Based on roll calls attended on UH-important bills
 */
export function calculateParticipationRate(member: string): number {
  const profile = legislatorVotes.find(l => l.member === member);
  if (!profile) return 0;
  
  return profile.participation_rate;
}

/**
 * Calculate since-introduction support percentage
 * Based on supportive votes since bill introduction (regardless of outcome)
 */
export function calculateSinceIntroSupport(member: string): number {
  const profile = legislatorVotes.find(l => l.member === member);
  if (!profile) return 0;
  
  return profile.since_intro_support;
}

/**
 * Get all legislators sorted by UH alignment
 */
export function getLegislatorsByAlignment(): LegislatorProfile[] {
  return [...legislatorVotes].sort((a, b) => b.uh_alignment - a.uh_alignment);
}

/**
 * Get legislator profile by name
 */
export function getLegislatorProfile(member: string): LegislatorProfile | undefined {
  return legislatorVotes.find(l => l.member === member);
}

/**
 * Get vote counts for a bill
 */
export function getVoteCountsForBill(billId: string): RollCall[] | undefined {
  return votesByBill[billId];
}

/**
 * Format alignment percentage with color coding
 */
export function getAlignmentColor(alignment: number): string {
  if (alignment >= 80) return 'text-green-600';
  if (alignment >= 60) return 'text-yellow-600';
  return 'text-red-600';
}
