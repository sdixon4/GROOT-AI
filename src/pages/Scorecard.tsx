import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ChevronDown, Info, ExternalLink, ChevronRight } from 'lucide-react';
import { scorecardBills, ScorecardBill } from '@/data/scorecardBills';
import { legislatorVotes } from '@/data/legislatorVotes';
import { categories, Category } from '@/data/categories';
import { useDebounce } from '@/hooks/useDebounce';

export default function Scorecard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'bills';
  
  const [billsSearch, setBillsSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'score' | 'deadline' | 'relevance'>('score');
  const [expandedBills, setExpandedBills] = useState<Set<string>>(new Set());
  
  const [categoryView, setCategoryView] = useState<Set<Category>>(new Set(categories));
  
  const debouncedSearch = useDebounce(billsSearch, 200);

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const toggleBreakdown = (billId: string) => {
    setExpandedBills(prev => {
      const next = new Set(prev);
      if (next.has(billId)) {
        next.delete(billId);
      } else {
        next.add(billId);
      }
      return next;
    });
  };

  const toggleCategory = (cat: Category) => {
    setCategoryView(prev => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const filteredBills = useMemo(() => {
    let bills = [...scorecardBills];

    if (categoryFilter !== 'all') {
      bills = bills.filter(b => b.category === categoryFilter);
    }

    if (debouncedSearch) {
      const lower = debouncedSearch.toLowerCase();
      bills = bills.filter(
        b =>
          b.id.toLowerCase().includes(lower) ||
          b.title.toLowerCase().includes(lower) ||
          b.reasons.some(r => r.toLowerCase().includes(lower))
      );
    }

    bills.sort((a, b) => {
      if (sortBy === 'score') return b.score_total - a.score_total;
      if (sortBy === 'deadline') {
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
      }
      if (sortBy === 'relevance') return b.relevance_pct - a.relevance_pct;
      return 0;
    });

    return bills;
  }, [categoryFilter, debouncedSearch, sortBy]);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Scorecard</h1>

          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="legislators">Legislators</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </TabsList>

            <TabsContent value="bills" className="space-y-6">
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4">
                  <ChevronDown className="h-4 w-4" />
                  About bill scores
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Alert className="mb-6">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Scores consider how much a bill touches UH, how actively it's moving, next deadlines, who sponsors it, 
                      and whether new UH-related language was added. These are automated cues and should be confirmed by staff.
                    </AlertDescription>
                  </Alert>
                </CollapsibleContent>
              </Collapsible>

              <div className="flex flex-wrap gap-4">
                <Input
                  placeholder="Search by bill ID, title, or reason tags..."
                  value={billsSearch}
                  onChange={(e) => setBillsSearch(e.target.value)}
                  className="max-w-sm"
                />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v: any) => setSortBy(v)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="score">Score (high to low)</SelectItem>
                    <SelectItem value="deadline">Deadline (soonest)</SelectItem>
                    <SelectItem value="relevance">Relevance (high to low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredBills.map(bill => (
                  <Card key={bill.id}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Badge className="text-lg px-3 py-1 font-bold bg-primary">
                          {bill.score_total.toFixed(1)}
                        </Badge>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <Link
                                to={`/bills/${bill.id}`}
                                className="text-xl font-bold hover:underline"
                              >
                                {bill.id}: {bill.title}
                              </Link>
                              <p className="text-sm text-muted-foreground">{bill.session} Session</p>
                            </div>
                            <Badge variant="outline">{bill.category}</Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {bill.reasons.slice(0, 3).map((reason, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {reason}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span>Status: {bill.status}</span>
                            {bill.owner && <span>Owner: {bill.owner}</span>}
                            {bill.due_date && (
                              <span>
                                Due: {new Date(bill.due_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleBreakdown(bill.id)}
                          className="gap-2"
                        >
                          {expandedBills.has(bill.id) ? 'Hide' : 'View'} breakdown
                          <ChevronDown className={`h-4 w-4 transition-transform ${expandedBills.has(bill.id) ? 'rotate-180' : ''}`} />
                        </Button>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span>Source:</span>
                            <a
                              href={bill.source_url}
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
                            <time dateTime={bill.last_sync}>{new Date(bill.last_sync).toLocaleString()}</time>
                          </div>
                        </div>
                      </div>

                      {expandedBills.has(bill.id) && (
                        <div className="pt-4 border-t space-y-2">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Relevance</p>
                              <p className="text-lg font-semibold">{bill.score_breakdown.relevance.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Momentum</p>
                              <p className="text-lg font-semibold">{bill.score_breakdown.momentum.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Time Pressure</p>
                              <p className="text-lg font-semibold">{bill.score_breakdown.time_pressure.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Sponsor Strength</p>
                              <p className="text-lg font-semibold">{bill.score_breakdown.sponsor_strength.toFixed(1)}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-muted-foreground">Change Risk</p>
                              <p className="text-lg font-semibold">{bill.score_breakdown.change_risk.toFixed(1)}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground pt-2">
                            Total: {bill.score_total.toFixed(1)} (out of 100)
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredBills.length === 0 && (
                <p className="text-sm text-muted-foreground">No bills match the selected filters.</p>
              )}
            </TabsContent>

            <TabsContent value="legislators" className="space-y-6">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Party</TableHead>
                      <TableHead>UH Alignment %</TableHead>
                      <TableHead>Participation %</TableHead>
                      <TableHead>Since-intro Support %</TableHead>
                      <TableHead>Recent Votes</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {legislatorVotes.map((leg, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{leg.member}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">{leg.party}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={leg.uh_alignment >= 80 ? 'text-green-600 font-semibold' : leg.uh_alignment >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                            {leg.uh_alignment}%
                          </span>
                        </TableCell>
                        <TableCell>{leg.participation_rate}%</TableCell>
                        <TableCell>{leg.since_intro_support}%</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {leg.recent_votes.slice(0, 2).map((vote, vidx) => (
                              <Link key={vidx} to={`/bills/${vote.bill_id}`}>
                                <Badge variant="outline" className="text-xs hover:bg-accent">
                                  {vote.bill_id}
                                </Badge>
                              </Link>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Link to={`/scorecard/legislators/${leg.member.replace(/\s+/g, '-').toLowerCase()}`}>
                            <Button variant="ghost" size="sm" className="gap-1">
                              Detail
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={categoryView.has(cat) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleCategory(cat)}
                  >
                    {cat}
                  </Button>
                ))}
              </div>

              {categories.map(cat => {
                if (!categoryView.has(cat)) return null;
                
                const billsInCategory = scorecardBills.filter(b => b.category === cat);
                
                return (
                  <Card key={cat}>
                    <CardHeader>
                      <CardTitle>{cat}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {billsInCategory.map(bill => (
                          <div key={bill.id} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                            <Badge className="font-bold bg-primary">{bill.score_total.toFixed(1)}</Badge>
                            <div className="flex-1">
                              <Link to={`/bills/${bill.id}`} className="font-medium hover:underline">
                                {bill.id}: {bill.title}
                              </Link>
                              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mt-1">
                                <span>Status: {bill.status}</span>
                                {bill.owner && <span>Owner: {bill.owner}</span>}
                                {bill.due_date && (
                                  <span>Due: {new Date(bill.due_date).toLocaleDateString()}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
