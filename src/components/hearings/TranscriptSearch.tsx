import { useState } from 'react';
import { Search, ExternalLink, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { transcripts, TranscriptHit } from '@/data/transcripts';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown } from 'lucide-react';

export function TranscriptSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TranscriptHit[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const lowercaseQuery = query.toLowerCase();
    const filtered = transcripts.filter(t =>
      t.segments.some(s =>
        s.text.toLowerCase().includes(lowercaseQuery) ||
        s.keywords?.some(k => k.toLowerCase().includes(lowercaseQuery))
      )
    );

    setResults(filtered);
    setSearched(true);
  };

  const handleTimestampClick = (videoUrl: string, timestamp: string) => {
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    window.open(`${videoUrl}?t=${totalSeconds}`, '_blank');
  };

  return (
    <div className="space-y-4">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ChevronDown className="h-4 w-4" />
          About transcript search
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2">
          <Alert>
            <AlertDescription className="text-sm">
              Searches public hearing captions for UH-related mentions (e.g., University of Hawaiʻi, campuses, programs).
              Links jump to the official video at the specified timestamp.
            </AlertDescription>
          </Alert>
        </CollapsibleContent>
      </Collapsible>

      <div className="flex gap-2">
        <Input
          placeholder="Search transcripts (e.g., University of Hawaiʻi, research, facilities)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {searched && results.length === 0 && (
        <p className="text-sm text-muted-foreground">No transcript matches found.</p>
      )}

      <div className="space-y-4">
        {results.map((hit) => (
          <Card key={hit.hearing_id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{hit.committee} Committee</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date(hit.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <Badge variant="outline">{hit.hearing_id}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {hit.segments
                .filter(s =>
                  s.text.toLowerCase().includes(query.toLowerCase()) ||
                  s.keywords?.some(k => k.toLowerCase().includes(query.toLowerCase()))
                )
                .map((segment, idx) => (
                  <div key={idx} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      {segment.speaker && (
                        <p className="font-medium text-sm">{segment.speaker}</p>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleTimestampClick(hit.video_url, segment.t0)}
                        className="gap-1 h-auto p-1"
                        aria-label={`Jump to ${segment.t0}`}
                      >
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{segment.t0}</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.text}</p>
                    {segment.keywords && segment.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {segment.keywords.map((kw, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {kw}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <span>Source:</span>
                  <a
                    href={hit.video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    {hit.source}
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center gap-1">
                  <span>Last sync:</span>
                  <time dateTime={hit.last_sync}>{new Date(hit.last_sync).toLocaleString()}</time>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
