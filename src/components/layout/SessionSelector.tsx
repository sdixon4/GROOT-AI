import { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { getCurrentSession, getAvailableSessions } from '@/data/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SessionSelectorProps {
  value: number;
  onChange: (year: number) => void;
}

export function SessionSelector({ value, onChange }: SessionSelectorProps) {
  const currentSession = getCurrentSession();
  const isArchived = value < currentSession;
  const sessions = getAvailableSessions();

  return (
    <div className="flex items-center gap-2">
      <Select value={value.toString()} onValueChange={(v) => onChange(parseInt(v))}>
        <SelectTrigger className="w-[140px] h-9 text-sm">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {sessions.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year} Session
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isArchived && (
        <a
          href={`https://data.capitol.hawaii.gov/sessions/session${value}/bills/`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-ring rounded"
          aria-label={`View ${value} session archives`}
        >
          <Badge variant="outline" className="text-xs hover:bg-accent">
            Archives <ExternalLink className="h-3 w-3 ml-1" />
          </Badge>
        </a>
      )}
    </div>
  );
}
