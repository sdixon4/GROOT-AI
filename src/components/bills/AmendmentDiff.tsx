import { Amendment } from '@/types/legislative';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, FileText } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AmendmentDiffProps {
  amendment: Amendment;
}

export function AmendmentDiff({ amendment }: AmendmentDiffProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <div>
            <h3 className="font-semibold text-lg">
              {amendment.fromVersion} → {amendment.toVersion}
            </h3>
            <p className="text-sm text-muted-foreground">
              Posted {new Date(amendment.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        
        {amendment.sectionsChanged.length > 0 && (
          <Badge variant="outline">
            {amendment.sectionsChanged.length} sections changed
          </Badge>
        )}
      </div>

      {amendment.uhFirstMention && (
        <Alert className="border-danger bg-danger-muted">
          <AlertTriangle className="h-4 w-4 text-danger" />
          <AlertDescription className="text-danger font-medium">
            First mention of University of Hawaii detected in this amendment
          </AlertDescription>
        </Alert>
      )}

      {amendment.sectionsChanged.length > 0 && (
        <Card className="p-4 bg-muted">
          <h4 className="font-medium mb-2 text-sm">Sections Modified:</h4>
          <div className="flex flex-wrap gap-2">
            {amendment.sectionsChanged.map((section) => (
              <Badge key={section} variant="secondary">
                {section}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      <Card className="p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
              {amendment.fromVersion}
            </div>
            <div className="prose prose-sm max-w-none">
              <style>{`
                .diff .removed {
                  background-color: hsl(var(--danger-muted));
                  color: hsl(var(--danger));
                  text-decoration: line-through;
                  padding: 2px 4px;
                  border-radius: 3px;
                }
                .diff .added {
                  background-color: hsl(var(--success-muted));
                  color: hsl(var(--success));
                  padding: 2px 4px;
                  border-radius: 3px;
                  font-weight: 500;
                }
              `}</style>
              <div 
                className="diff text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: amendment.diffHtml }}
              />
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-3 text-success uppercase tracking-wide">
              {amendment.toVersion}
            </div>
            <div className="prose prose-sm max-w-none">
              <div 
                className="diff text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: amendment.diffHtml }}
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
