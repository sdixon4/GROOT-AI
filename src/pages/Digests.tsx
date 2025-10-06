import { Link } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockDigests } from '@/data/mockDigests';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';

export default function Digests() {
  const [isLoading] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Digests</h1>
              <p className="text-muted-foreground">Legislative summaries and briefs</p>
            </div>
            <Link to="/digests/new">
              <Button className="gap-2" aria-label="Create new digest">
                <Plus className="h-4 w-4" />
                New Digest
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {mockDigests.map((digest) => (
                <Card key={digest.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <CardTitle className="text-lg">{digest.title}</CardTitle>
                        </div>
                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">{digest.audience}</Badge>
                          <span>•</span>
                          <span>{digest.period}</span>
                          <span>•</span>
                          <span>{digest.billCount} bills</span>
                        </div>
                      </div>
                      <Badge
                        variant={
                          digest.status === 'Distributed'
                            ? 'default'
                            : digest.status === 'Final'
                            ? 'secondary'
                            : 'outline'
                        }
                        className="ml-4"
                      >
                        {digest.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        Created by {digest.createdBy} on{' '}
                        {new Date(digest.createdAt).toLocaleDateString()}
                      </span>
                      <a
                        href="#"
                        className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                        aria-label={`View ${digest.title}`}
                      >
                        View →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
