import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Video, AlertCircle, Copy, Clock } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProvenanceFooter } from '@/components/layout/ProvenanceFooter';
import { mockHearings, mockBills } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

export default function HearingDetail() {
  const { id } = useParams();
  const hearing = mockHearings.find((h) => h.id === id);
  const bill = hearing ? mockBills.find((b) => b.id === hearing.billId) : null;

  const handleCopyReconvene = () => {
    if (hearing?.reconveneTime) {
      const time = new Date(hearing.reconveneTime).toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
      });
      const room = hearing.reconveneRoom || hearing.room;
      const text = `Reconvene ${time}, Room ${room}`;
      
      navigator.clipboard.writeText(text);
      toast({
        title: 'Copied to clipboard',
        description: text,
        duration: 2000,
      });
    }
  };

  const handleTimestampClick = (timestamp: string) => {
    // Convert HH:MM:SS to seconds
    const [hours, minutes, seconds] = timestamp.split(':').map(Number);
    const totalSeconds = hours * 3600 + minutes * 60 + (seconds || 0);
    
    // Update URL with timestamp (mock behavior)
    const url = new URL(window.location.href);
    url.searchParams.set('t', totalSeconds.toString());
    window.history.pushState({}, '', url);
    
    toast({
      title: 'Timestamp link created',
      description: `Video will start at ${timestamp}`,
      duration: 2000,
    });
  };

  if (!hearing || !bill) {
    return (
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-muted-foreground">Hearing not found.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/hearings"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="Back to hearings"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Hearings
          </Link>

          <div className="mb-6">
            <div className="flex items-start gap-3 mb-4">
              <Badge variant="outline" className="text-base px-3 py-1">
                {bill.number}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground flex-1">{bill.title}</h1>
            </div>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(hearing.datetime).toLocaleString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Room {hearing.room}
              </div>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Committee</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{hearing.committee}</p>
            </CardContent>
          </Card>

          {hearing.reconveneTime && (
            <Alert className="mb-6 border-accent bg-accent/10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    <AlertTitle className="text-accent">Reconvene Scheduled</AlertTitle>
                  </div>
                  <AlertDescription>
                    This hearing will reconvene on{' '}
                    {new Date(hearing.reconveneTime).toLocaleString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}{' '}
                    in Room {hearing.reconveneRoom || hearing.room}.
                  </AlertDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyReconvene}
                  className="gap-2"
                  aria-label="Copy reconvene information"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </Alert>
          )}

          {hearing.videoUrl && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video Recording
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={hearing.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                  aria-label="Watch hearing video"
                >
                  Watch hearing video →
                </a>
              </CardContent>
            </Card>
          )}

          {hearing.speakers && hearing.speakers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Testimony</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hearing.speakers.map((speaker, idx) => (
                    <div key={idx} className="pb-6 border-b border-border last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-foreground">{speaker.name}</p>
                          <p className="text-sm text-muted-foreground">{speaker.organization}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleTimestampClick(speaker.timestamp)}
                            className="h-auto p-1 hover:bg-accent"
                            aria-label={`Jump to ${speaker.timestamp}`}
                          >
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">{speaker.timestamp}</span>
                          </Button>
                          {speaker.stance && (
                            <Badge
                              variant={
                                speaker.stance === 'Support'
                                  ? 'default'
                                  : speaker.stance === 'Oppose'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {speaker.stance}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground">{speaker.summary}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <ProvenanceFooter
            year={parseInt(bill.session)}
            lastSync="2025-01-15T18:00:00Z"
          />
        </div>
      </main>
    </div>
  );
}
