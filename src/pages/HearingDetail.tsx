import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Video, AlertCircle } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockHearings, mockBills } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function HearingDetail() {
  const { id } = useParams();
  const hearing = mockHearings.find((h) => h.id === id);
  const bill = hearing ? mockBills.find((b) => b.id === hearing.billId) : null;

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
              <AlertCircle className="h-4 w-4 text-accent" />
              <AlertTitle className="text-accent">Reconvene Scheduled</AlertTitle>
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
                          <Badge variant="outline" className="text-xs">
                            {speaker.timestamp}
                          </Badge>
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
        </div>
      </main>
    </div>
  );
}
