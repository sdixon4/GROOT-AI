import { useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockTestimonies } from '@/data/mockBills';
import { mockSimilarBills } from '@/data/mockContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export default function Archive() {
  const [isLoading] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Context Archive</h1>
            <p className="text-muted-foreground">Historical testimony and similar bills</p>
          </div>

          <Tabs defaultValue="testimony" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="testimony" aria-label="View testimony archive">
                Testimony
              </TabsTrigger>
              <TabsTrigger value="similar" aria-label="View similar bills">
                Similar Bills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="testimony">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {mockTestimonies.map((testimony) => (
                    <Card key={testimony.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">
                            {testimony.year} Testimony
                          </CardTitle>
                          <Badge
                            variant={
                              testimony.stance === 'Support'
                                ? 'default'
                                : testimony.stance === 'Oppose'
                                ? 'destructive'
                                : 'secondary'
                            }
                            className="text-xs"
                          >
                            {testimony.stance}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{testimony.summary}</p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{testimony.author}</span>
                          <a
                            href={testimony.fileUrl}
                            className="flex items-center gap-1 text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded"
                            aria-label="View testimony PDF"
                          >
                            <FileText className="h-3 w-3" />
                            PDF
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="similar">
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {mockSimilarBills.map((bill) => (
                    <Card key={bill.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-sm">
                                {bill.billNumber}
                              </Badge>
                              <span className="text-xs text-muted-foreground">{bill.year}</span>
                              <Badge variant="secondary" className="text-xs ml-auto">
                                {Math.round(bill.similarity * 100)}% match
                              </Badge>
                            </div>
                            <h3 className="font-medium text-foreground mb-2">{bill.title}</h3>
                            <p className="text-sm text-muted-foreground">{bill.rationale}</p>
                          </div>
                          <a
                            href="#"
                            className="text-primary hover:text-primary/80 focus:outline-none focus:ring-2 focus:ring-ring rounded p-1"
                            aria-label={`View details for ${bill.billNumber}`}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
