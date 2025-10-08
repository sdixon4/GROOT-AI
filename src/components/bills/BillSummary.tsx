import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { billAnalyses } from '@/data/billAnalyses';
import { ExternalLink } from 'lucide-react';

interface BillSummaryProps {
  billId: string;
}

export function BillSummary({ billId }: BillSummaryProps) {
  const analysis = billAnalyses.find(a => a.id === billId);

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bill Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No analysis available for this bill.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bill Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{analysis.summary}</p>

        <div>
          <h4 className="text-sm font-semibold mb-2">Key Sections</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.key_sections.map((section, idx) => (
              <Badge key={idx} variant="secondary">
                {section}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm font-medium">Relevance</p>
            <p className="text-2xl font-bold text-primary">{analysis.relevance_pct}%</p>
          </div>
          <div>
            <p className="text-sm font-medium">Reason Tags</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {analysis.reasons.map((reason, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-4 border-t">
          <div className="flex items-center gap-1">
            <span>Source:</span>
            <a
              href={analysis.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              data.capitol.hawaii.gov
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex items-center gap-1">
            <span>Last sync:</span>
            <time dateTime={analysis.last_sync}>{new Date(analysis.last_sync).toLocaleString()}</time>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
