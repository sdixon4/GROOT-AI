import { useParams } from 'react-router-dom';
import { mockBills, mockAmendments, mockHearings, mockTestimonies } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AmendmentDiff } from '@/components/bills/AmendmentDiff';
import { ArrowLeft, Clock, User, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function BillDetail() {
  const { id } = useParams();
  const bill = mockBills.find((b) => b.id === id);
  const amendments = mockAmendments.filter((a) => a.billId === id);
  const hearings = mockHearings.filter((h) => h.billId === id);
  const testimonies = mockTestimonies.filter((t) => t.billId === id);

  if (!bill) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Bill not found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-card border-b border-border px-6 py-4">
        <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Queue
        </Link>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold font-mono text-primary">{bill.number}</h1>
              <Badge variant="outline">{bill.chamber}</Badge>
              <Badge variant="outline">{bill.status}</Badge>
              {bill.confidence && (
                <Badge 
                  className={cn(
                    bill.confidence === 'Confirmed' 
                      ? "bg-success text-success-foreground" 
                      : "bg-warning text-warning-foreground"
                  )}
                >
                  {bill.confidence}
                </Badge>
              )}
            </div>
            <h2 className="text-lg text-foreground mb-4">{bill.title}</h2>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Last action: {new Date(bill.lastActionAt).toLocaleDateString()}
              </div>
              {bill.assignedTo && (
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  Assigned to: {bill.assignedTo}
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
              <div className="text-sm text-muted-foreground mb-1">Relevance Score</div>
              <div className="text-3xl font-bold text-primary">
                {(bill.relevanceScore * 100).toFixed(0)}%
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 overflow-auto p-6">
        <Tabs defaultValue="overview" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="text">Full Text</TabsTrigger>
            <TabsTrigger value="amendments">
              Amendments {amendments.length > 0 && `(${amendments.length})`}
            </TabsTrigger>
            <TabsTrigger value="hearings">
              Hearings {hearings.length > 0 && `(${hearings.length})`}
            </TabsTrigger>
            <TabsTrigger value="related">Related</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {bill.reasonTags && bill.reasonTags.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-3">AI Triage Analysis</h3>
                <div className="flex flex-wrap gap-2">
                  {bill.reasonTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Summary</h3>
              <p className="text-foreground leading-relaxed">
                This bill addresses key educational infrastructure needs in West Oʻahu, 
                allowing the University of Hawaii to enter into long-term lease arrangements 
                for facility development. The legislation has direct implications for campus 
                expansion and regional access to higher education.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Key Risks & Opportunities</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>Expands UH West Oʻahu facilities without direct capital appropriation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-success mt-1">✓</span>
                  <span>Aligns with strategic plan for regional campus growth</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-1">!</span>
                  <span>May require environmental review coordination with DLNR</span>
                </li>
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="space-y-6 mt-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Current Version: H/D2</h3>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Capitol Site
                </Button>
              </div>
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="font-semibold">SECTION 1. Legislative findings and purpose.</p>
                <p className="mt-4">
                  The legislature finds that the University of Hawaii at West Oʻahu serves a critical 
                  role in providing accessible higher education to the leeward coast communities. The 
                  campus has experienced significant enrollment growth and requires expanded facilities 
                  to meet demand.
                </p>
                <p className="mt-4 font-semibold">SECTION 2. Authority to lease.</p>
                <p className="mt-4">
                  The Board of Regents of the University of Hawaii may enter into one or more long-term 
                  leases of state land for the purpose of developing educational facilities at the 
                  University of Hawaii at West Oʻahu campus...
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="amendments" className="space-y-6 mt-6">
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

          <TabsContent value="hearings" className="space-y-6 mt-6">
            {hearings.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">No hearings scheduled</p>
              </Card>
            ) : (
              hearings.map((hearing) => (
                <Card key={hearing.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{hearing.committee}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {new Date(hearing.datetime).toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          Room {hearing.room}
                        </div>
                      </div>
                    </div>
                    {hearing.videoUrl && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    )}
                  </div>

                  {hearing.reconveneTime && (
                    <div className="p-3 bg-warning-muted border border-warning rounded-md mb-4">
                      <p className="text-sm font-medium text-warning">
                        Reconvene: {new Date(hearing.reconveneTime).toLocaleString()} • Room {hearing.reconveneRoom}
                      </p>
                    </div>
                  )}

                  {hearing.speakers && hearing.speakers.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm">Speakers</h4>
                      {hearing.speakers.map((speaker, idx) => (
                        <div key={idx} className="border-l-2 border-muted pl-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{speaker.name}</span>
                            <span className="text-xs text-muted-foreground">{speaker.organization}</span>
                            {speaker.stance && (
                              <Badge 
                                variant="outline" 
                                className={cn(
                                  "text-xs",
                                  speaker.stance === 'Support' && "border-success text-success",
                                  speaker.stance === 'Oppose' && "border-danger text-danger"
                                )}
                              >
                                {speaker.stance}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground">{speaker.summary}</p>
                          <span className="text-xs text-muted-foreground mt-1 inline-block">
                            {speaker.timestamp}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="related" className="space-y-6 mt-6">
            {testimonies.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Historical UH Testimony</h3>
                <div className="space-y-4">
                  {testimonies.map((testimony) => (
                    <div key={testimony.id} className="border-l-2 border-muted pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium">{testimony.year}</span>
                        <Badge 
                          variant="outline"
                          className={cn(
                            "text-xs",
                            testimony.stance === 'Support' && "border-success text-success"
                          )}
                        >
                          {testimony.stance}
                        </Badge>
                        <span className="text-xs text-muted-foreground">• {testimony.author}</span>
                      </div>
                      <p className="text-sm text-foreground mb-2">{testimony.summary}</p>
                      <Button variant="link" size="sm" className="p-0 h-auto">
                        View testimony PDF
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
