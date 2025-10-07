import { useState } from 'react';
import { Amendment } from '@/types/legislative';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, FileText, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AmendmentDiffProps {
  amendment: Amendment;
}

export function AmendmentDiff({ amendment }: AmendmentDiffProps) {
  const [showChangedOnly, setShowChangedOnly] = useState(false);

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
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowChangedOnly(!showChangedOnly)}
            className="gap-2"
            aria-label={showChangedOnly ? 'Show all sections' : 'Show changed sections only'}
          >
            {showChangedOnly ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            {showChangedOnly ? 'Show all' : 'Changed only'}
          </Button>
          
          {amendment.sectionsChanged.length > 0 && (
            <Badge variant="outline">
              {amendment.sectionsChanged.length} sections changed
            </Badge>
          )}
        </div>
      </div>

      {amendment.uhFirstMention && (
        <Alert className="border-danger bg-danger/10">
          <AlertTriangle className="h-4 w-4 text-danger" />
          <AlertDescription className="text-danger font-semibold">
            🎯 First mention of University of Hawaii detected in this amendment
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
        {showChangedOnly && (
          <div className="mb-4 text-sm text-muted-foreground italic">
            Showing changed sections only. Click "Show all" to see the full text.
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide border-b pb-2">
              {amendment.fromVersion} (Before)
            </div>
            <div className="prose prose-sm max-w-none">
              <style>{`
                .diff .removed {
                  background-color: hsl(var(--destructive) / 0.1);
                  color: hsl(var(--destructive));
                  text-decoration: line-through;
                  padding: 2px 4px;
                  border-radius: 3px;
                }
                .diff .added {
                  background-color: hsl(var(--success) / 0.1);
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
            <div className="text-sm font-semibold mb-3 text-success uppercase tracking-wide border-b pb-2 border-success/20">
              {amendment.toVersion} (After)
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
