import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Info } from 'lucide-react';
import { billAnalyses } from '@/data/billAnalyses';

interface ChangesExplanationProps {
  billId: string;
}

export function ChangesExplanation({ billId }: ChangesExplanationProps) {
  const analysis = billAnalyses.find(a => a.id === billId);

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bill Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No change analysis available for this bill.</p>
        </CardContent>
      </Card>
    );
  }

  if (analysis.what_changed.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Bill Changes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No amendments or changes tracked yet for this bill.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-4 border-t mt-4">
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

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription className="text-sm">
          Explains meaning and impact, not just wording.
        </AlertDescription>
      </Alert>

      {analysis.what_changed.map((change, idx) => (
        <Card key={idx}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge variant="outline">
                {change.version_from} → {change.version_to}
              </Badge>
              <CardTitle className="text-lg">Version Update</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">What changed</h4>
              <p className="text-sm text-foreground">{change.plain_explanation}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-1">Why it matters for UH</h4>
              <p className="text-sm text-foreground">{change.why_it_matters}</p>
            </div>

            {change.changed_passages.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Changed passages</h4>
                <div className="space-y-2">
                  {change.changed_passages.map((passage, pidx) => (
                    <div
                      key={pidx}
                      className="border-l-2 border-primary pl-3 py-1 bg-muted/30 rounded-r text-sm text-muted-foreground italic"
                    >
                      {passage}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-2">
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
    </div>
  );
}
