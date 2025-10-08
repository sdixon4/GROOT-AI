import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, ExternalLink } from 'lucide-react';
import { votesByBill, RollCall } from '@/data/votesByBill';
import { toast } from '@/hooks/use-toast';

interface VotesTabProps {
  billId: string;
}

export function VotesTab({ billId }: VotesTabProps) {
  const votes = votesByBill[billId] || [];
  const [stageFilter, setStageFilter] = useState<'all' | 'Committee' | 'Floor'>('all');
  const [chamberFilter, setChamberFilter] = useState<'all' | 'House' | 'Senate'>('all');
  const [resultFilter, setResultFilter] = useState<'all' | 'Passed' | 'Failed'>('all');

  const filteredVotes = votes.filter(vote => {
    if (stageFilter !== 'all' && vote.stage !== stageFilter) return false;
    if (chamberFilter !== 'all' && vote.chamber !== chamberFilter) return false;
    if (resultFilter !== 'all' && vote.result !== resultFilter) return false;
    return true;
  });

  const handleExportCSV = (vote: RollCall) => {
    const headers = ['Member', 'Party', 'Vote'];
    const rows = vote.members.map(m => [m.name, m.party, m.vote]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${billId}_votes_${vote.stage}_${vote.date}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'CSV exported',
      description: `${billId}_votes_${vote.stage}_${vote.date}.csv`,
      duration: 2000
    });
  };

  const getVoteBadgeVariant = (vote: string) => {
    if (vote === 'Aye') return 'default';
    if (vote === 'No') return 'destructive';
    if (vote === 'Aye w/ reservations') return 'secondary';
    return 'outline';
  };

  if (votes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Votes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No vote records available for this bill yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Select value={stageFilter} onValueChange={(v: any) => setStageFilter(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stages</SelectItem>
            <SelectItem value="Committee">Committee</SelectItem>
            <SelectItem value="Floor">Floor</SelectItem>
          </SelectContent>
        </Select>

        <Select value={chamberFilter} onValueChange={(v: any) => setChamberFilter(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Chamber" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Both chambers</SelectItem>
            <SelectItem value="House">House</SelectItem>
            <SelectItem value="Senate">Senate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={resultFilter} onValueChange={(v: any) => setResultFilter(v)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Result" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All results</SelectItem>
            <SelectItem value="Passed">Passed</SelectItem>
            <SelectItem value="Failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredVotes.map((vote, idx) => (
        <Card key={idx}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {vote.chamber} {vote.stage}
                  {vote.committee && ` - ${vote.committee}`}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(vote.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <Badge variant={vote.result === 'Passed' ? 'default' : 'destructive'}>
                {vote.result}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <div>
                <p className="text-sm font-medium">Aye</p>
                <p className="text-2xl font-bold text-green-600">{vote.counts.aye}</p>
              </div>
              <div>
                <p className="text-sm font-medium">No</p>
                <p className="text-2xl font-bold text-red-600">{vote.counts.no}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Aye w/ reservations</p>
                <p className="text-2xl font-bold text-yellow-600">{vote.counts.aye_wr}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Excused</p>
                <p className="text-2xl font-bold text-muted-foreground">{vote.counts.excused}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Not voting</p>
                <p className="text-2xl font-bold text-muted-foreground">{vote.counts.nv}</p>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Party</TableHead>
                    <TableHead>Vote</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vote.members.map((member, midx) => (
                    <TableRow key={midx}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {member.party}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getVoteBadgeVariant(member.vote)}>
                          {member.vote}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span>Source:</span>
                  <a
                    href={vote.source_url}
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
                  <time dateTime={vote.last_sync}>{new Date(vote.last_sync).toLocaleString()}</time>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExportCSV(vote)}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredVotes.length === 0 && (
        <p className="text-sm text-muted-foreground">No votes match the selected filters.</p>
      )}
    </div>
  );
}
