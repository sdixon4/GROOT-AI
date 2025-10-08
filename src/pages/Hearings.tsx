import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { TranscriptSearch } from '@/components/hearings/TranscriptSearch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockHearings, mockBills } from '@/data/mockBills';
import { cn } from '@/lib/utils';

export default function Hearings() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');
  const [isLoading] = useState(false);

  const now = new Date();
  const filteredHearings = mockHearings.filter((hearing) => {
    const hearingDate = new Date(hearing.datetime);
    if (filter === 'upcoming') return hearingDate > now;
    if (filter === 'past') return hearingDate <= now;
    return true;
  });

  const getBillNumber = (billId: string) => {
    const bill = mockBills.find((b) => b.id === billId);
    return bill?.number || 'Unknown';
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Hearings</h1>

          <Tabs defaultValue="upcoming">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="search">Search Transcripts</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setFilter('upcoming')}
                  className={cn(
                    'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                    'bg-primary text-primary-foreground'
                  )}
                >
                  Upcoming
                </button>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : filteredHearings.filter(h => new Date(h.datetime) > now).length === 0 ? (
                <div className="text-center py-12 bg-card rounded-lg border">
                  <p className="text-muted-foreground">No upcoming hearings found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredHearings.filter(h => new Date(h.datetime) > now).map((hearing) => (
                    <Link key={hearing.id} to={`/hearings/${hearing.id}`}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader>
                          <CardTitle className="text-lg">
                            <Badge variant="outline" className="mr-2">{getBillNumber(hearing.billId)}</Badge>
                            {hearing.committee}
                          </CardTitle>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(hearing.datetime).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Room {hearing.room}
                            </div>
                            {hearing.speakers && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {hearing.speakers.length} speakers
                              </div>
                            )}
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {filteredHearings.filter(h => new Date(h.datetime) <= now).map((hearing) => (
                  <Link key={hearing.id} to={`/hearings/${hearing.id}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          <Badge variant="outline" className="mr-2">{getBillNumber(hearing.billId)}</Badge>
                          {hearing.committee}
                        </CardTitle>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(hearing.datetime).toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            Room {hearing.room}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="search">
              <TranscriptSearch />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
