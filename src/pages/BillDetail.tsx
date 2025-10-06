import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { ProvenanceFooter } from '@/components/layout/ProvenanceFooter';
import { mockBills, mockAmendments, mockHearings, mockTestimonies } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { AmendmentDiff } from '@/components/bills/AmendmentDiff';
import { ArrowLeft, Clock, User, Calendar, MapPin, ExternalLink, FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BillDetail() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const bill = mockBills.find((b) => b.id === id);
  const amendments = mockAmendments.filter((a) => a.billId === id);
  const hearings = mockHearings.filter((h) => h.billId === id);
  const testimonies = mockTestimonies.filter((t) => t.billId === id);

  // Mock similar bills for Related tab
  const similarBills = mockBills
    .filter((b) => b.id !== id)
    .slice(0, 3)
    .map((b) => ({
      ...b,
      similarity: 0.75 + Math.random() * 0.2,
      reason: 'Shared keywords: education, facilities, West Oʻahu'
    }));

  if (!bill) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Bill not found</p>
      </div>
    );
  }

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  // Mock timeline events for History tab
  const historyEvents = [
    { date: '2025-01-15T10:30:00Z', action: 'Introduced in House', actor: 'Rep. Smith' },
    { date: '2025-01-15T14:00:00Z', action: 'Referred to Committee on Higher Education', actor: 'House Clerk' },
    { date: '2025-01-16T09:00:00Z', action: 'Hearing scheduled for 1/18/25', actor: 'Committee Chair' },
    { date: '2025-01-17T11:00:00Z', action: 'Amendment H/D1 posted', actor: 'Committee' },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      {/* Sticky Back Button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-6 py-3">
        <Link 
          to="/triage" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Triage
        </Link>
      </div>

      {/* Header */}
      <header className="bg-card border-b border-border px-6 py-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl font-bold font-mono text-primary">{bill.number}</h1>
              <Badge variant="outline">{bill.chamber}</Badge>
              <Badge variant="outline">{bill.status}</Badge>
              {bill.confidence && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge 
                        className={cn(
                          "cursor-help",
                          bill.confidence === 'Confirmed' 
                            ? "bg-success-muted text-success border-success" 
                            : "bg-warning-muted text-warning border-warning"
                        )}
                      >
                        {bill.confidence}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">
                        {bill.confidence === 'Confirmed' 
                          ? 'AI classification verified by staff' 
                          : 'AI classification pending review'}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <h2 className="text-xl text-foreground mb-4 leading-tight">{bill.title}</h2>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Last action: {new Date(bill.lastActionAt).toLocaleDateString()}
              </div>
              {bill.assignedTo && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  Owner: <span className="font-medium text-foreground">{bill.assignedTo}</span>
                </div>
              )}
              {bill.dueDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  Due: {new Date(bill.dueDate).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {bill.relevanceScore && (
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Relevance</div>
              <div className="text-4xl font-bold text-primary">
                {(bill.relevanceScore * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Tabs Content */}
      <div className="flex-1 overflow-auto p-6 bg-muted/20">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="amendments">
              Amendments {amendments.length > 0 && `(${amendments.length})`}
            </TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4 mt-0">
            <Card className="p-6">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Summary</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This bill addresses key educational infrastructure needs in West Oʻahu, 
                    allowing the University of Hawaii to enter into long-term lease arrangements 
                    for facility development. The legislation has direct implications for campus 
                    expansion and regional access to higher education.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Key Risks</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Environmental review timeline may delay implementation. Requires coordination 
                    with DLNR on land use approvals. Community engagement essential to address 
                    concerns about campus footprint expansion.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Next Steps</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Hearing scheduled for January 18, 2025 before Higher Education & Technology Committee. 
                    Draft testimony supporting with suggested amendments due by January 17. 
                    Coordinate with VP Government Relations for final approval.
                  </p>
                </div>
              </div>
            </Card>

            {bill.reasonTags && bill.reasonTags.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-3 text-foreground">AI Triage Analysis</h3>
                <div className="flex flex-wrap gap-2">
                  {bill.reasonTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>

          {/* Text Tab */}
          <TabsContent value="text" className="space-y-4 mt-0">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Current Version: H/D2</h3>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Capitol Site
                </Button>
              </div>
              <div className="prose prose-sm max-w-none text-foreground space-y-4">
                <div>
                  <p className="font-semibold text-base">SECTION 1. Legislative findings and purpose.</p>
                  <p className="mt-3 text-muted-foreground">
                    The legislature finds that the University of Hawaii at West Oʻahu serves a critical 
                    role in providing accessible higher education to the leeward coast communities. The 
                    campus has experienced significant enrollment growth and requires expanded facilities 
                    to meet demand.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-base">SECTION 2. Authority to lease.</p>
                  <p className="mt-3 text-muted-foreground">
                    The Board of Regents of the University of Hawaii may enter into one or more long-term 
                    leases of state land for the purpose of developing educational facilities at the 
                    University of Hawaii at West Oʻahu campus. Such leases may be for a term not to exceed 
                    sixty-five years, including any extension or renewal options.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-base">SECTION 3. Terms and conditions.</p>
                  <p className="mt-3 text-muted-foreground">
                    Any lease entered into pursuant to this Act shall include provisions ensuring that 
                    the facilities developed shall be used primarily for educational purposes and shall 
                    remain under the operational control of the University of Hawaii.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Amendments Tab */}
          <TabsContent value="amendments" className="space-y-4 mt-0">
            {amendments.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No amendments posted yet</p>
              </Card>
            ) : (
              amendments.map((amendment) => (
                <AmendmentDiff key={amendment.id} amendment={amendment} />
              ))
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-0">
            <Card className="p-6">
              <h3 className="font-semibold mb-6 text-foreground">Legislative Timeline</h3>
              <div className="space-y-6">
                {historyEvents.map((event, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary flex-shrink-0" />
                      {idx < historyEvents.length - 1 && (
                        <div className="w-0.5 h-full bg-border mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-medium text-foreground">{event.action}</p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{event.actor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Related Tab */}
          <TabsContent value="related" className="space-y-6 mt-0">
            {/* Historical UH Testimony */}
            {testimonies.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Historical UH Testimony</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Prior UH positions on similar legislation to ensure consistency.
                </p>
                <div className="space-y-4">
                  {testimonies.map((testimony) => (
                    <div key={testimony.id} className="border-l-2 border-primary/30 pl-4 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{testimony.year}</span>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-xs",
                            testimony.stance === 'Support' && "border-success text-success",
                            testimony.stance === 'Oppose' && "border-danger text-danger"
                          )}
                        >
                          {testimony.stance}
                        </Badge>
                        <span className="text-xs text-muted-foreground">• {testimony.author}</span>
                      </div>
                      <p className="text-sm text-foreground mb-2">{testimony.summary}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                        <FileText className="h-3 w-3 mr-1" />
                        View testimony PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Similar Bills */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4 text-foreground">Similar Bills</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Other legislation with related themes or UH implications.
              </p>
              <div className="space-y-4">
                {similarBills.map((similar) => (
                  <Link 
                    key={similar.id} 
                    to={`/bills/${similar.id}`}
                    className="block border rounded-lg p-4 hover:border-primary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-primary">{similar.number}</span>
                        <Badge variant="outline" className="text-xs">{similar.chamber}</Badge>
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">
                        {(similar.similarity * 100).toFixed(0)}% match
                      </span>
                    </div>
                    <p className="text-sm text-foreground mb-2 line-clamp-2">{similar.title}</p>
                    <p className="text-xs text-muted-foreground">{similar.reason}</p>
                  </Link>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <ProvenanceFooter
          billNumber={bill.number}
          year={parseInt(bill.session)}
          lastSync="2025-01-15T18:00:00Z"
        />
      </div>
    </div>
    </div>
  );
}
