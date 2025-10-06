import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockHearings, mockBills } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
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
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Hearings</h1>
            <p className="text-muted-foreground">Committee hearings and testimony opportunities</p>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
                filter === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              aria-label="Show all hearings"
            >
              All
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
                filter === 'upcoming'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              aria-label="Show upcoming hearings"
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('past')}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring',
                filter === 'past'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
              aria-label="Show past hearings"
            >
              Past
            </button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : filteredHearings.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">No hearings found for this filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredHearings.map((hearing) => (
                <Link
                  key={hearing.id}
                  to={`/hearings/${hearing.id}`}
                  className="block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg"
                  aria-label={`View hearing details for ${getBillNumber(hearing.billId)}`}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg mb-2">
                            <Badge variant="outline" className="mr-2">
                              {getBillNumber(hearing.billId)}
                            </Badge>
                            {hearing.committee}
                          </CardTitle>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(hearing.datetime).toLocaleString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                              })}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              Room {hearing.room}
                            </div>
                            {hearing.speakers && (
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {hearing.speakers.length} speaker{hearing.speakers.length !== 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </div>
                        {hearing.reconveneTime && (
                          <Badge variant="secondary" className="bg-accent/20 text-accent">
                            Reconvene
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    {hearing.speakers && hearing.speakers.length > 0 && (
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            {hearing.speakers[0].name}
                          </span>{' '}
                          ({hearing.speakers[0].organization}): {hearing.speakers[0].summary}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
