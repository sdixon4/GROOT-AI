import { ExternalLink } from 'lucide-react';

interface ProvenanceFooterProps {
  billNumber?: string;
  year: number;
  lastSync: string;
}

export function ProvenanceFooter({ billNumber, year, lastSync }: ProvenanceFooterProps) {
  const sourceUrl = billNumber
    ? `https://data.capitol.hawaii.gov/api/v2/legislation/${year}/${billNumber}`
    : `https://data.capitol.hawaii.gov/api/v2/legislation/${year}`;

  return (
    <div className="mt-8 pt-4 border-t border-border">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <span>Source:</span>
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="View source data"
          >
            data.capitol.hawaii.gov
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <div className="flex items-center gap-1">
          <span>Last sync:</span>
          <time dateTime={lastSync}>{new Date(lastSync).toLocaleString()}</time>
        </div>
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/your-org/groot-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="View source code"
          >
            Open source
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
