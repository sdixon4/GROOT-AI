import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileDown, Eye } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { mockBills } from '@/data/mockBills';

export default function DigestNew() {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [period, setPeriod] = useState('');
  const [selectedBills, setSelectedBills] = useState<Set<string>>(new Set());

  const toggleBill = (billId: string) => {
    const newSelected = new Set(selectedBills);
    if (newSelected.has(billId)) {
      newSelected.delete(billId);
    } else {
      newSelected.add(billId);
    }
    setSelectedBills(newSelected);
  };

  const handleExportPDF = () => {
    // Create a basic HTML string for the digest
    const selectedBillData = mockBills.filter(b => selectedBills.has(b.id));
    const htmlContent = `
      <html>
        <head>
          <title>${title || 'Legislative Digest'}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #333; }
            .bill { margin: 20px 0; padding: 15px; border: 1px solid #ddd; }
          </style>
        </head>
        <body>
          <h1>${title || 'Legislative Digest'}</h1>
          <p><strong>Audience:</strong> ${audience || 'N/A'}</p>
          <p><strong>Period:</strong> ${period || 'N/A'}</p>
          <hr/>
          ${selectedBillData.map(bill => `
            <div class="bill">
              <h2>${bill.number}: ${bill.title}</h2>
              <p><strong>Status:</strong> ${bill.status}</p>
              <p><strong>Assigned to:</strong> ${bill.assignedTo || 'Unassigned'}</p>
            </div>
          `).join('')}
        </body>
      </html>
    `;

    // Create a blob and download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'groot-digest.pdf'; // Note: This will actually be HTML, but demonstrates the concept
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: 'Digest exported',
      description: 'groot-digest.pdf has been downloaded (stub PDF export)',
      duration: 3000,
    });
  };

  const handleSaveDraft = () => {
    toast({
      title: 'Coming soon—stubbed in MVP',
      description: 'Draft saving will be available in a future release',
      duration: 2000,
    });
  };

  const handlePreview = () => {
    toast({
      title: 'Preview',
      description: `${selectedBills.size} bills selected for ${audience || 'audience'}`,
      duration: 2000,
    });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/digests"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 focus:outline-none focus:ring-2 focus:ring-ring rounded"
            aria-label="Back to digests"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Digests
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Digest</h1>
            <p className="text-muted-foreground">Build a legislative summary for your audience</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Digest Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Weekly Leadership Brief - Week 5"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  aria-label="Digest title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="audience">Audience</Label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger id="audience" aria-label="Select audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Leadership">Leadership</SelectItem>
                    <SelectItem value="Campus">Campus</SelectItem>
                    <SelectItem value="Board of Regents">Board of Regents</SelectItem>
                  </SelectContent>
                </Select>
                {audience && (
                  <p className="text-xs text-muted-foreground">
                    Template adjusted for {audience} audience
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="period">Time Period</Label>
                <Input
                  id="period"
                  placeholder="e.g., Jan 29 - Feb 2, 2025"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  aria-label="Time period"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button onClick={handleSaveDraft} className="flex-1" aria-label="Save digest as draft">
                  Save as Draft
                </Button>
                <Button onClick={handlePreview} variant="outline" className="flex-1 gap-2" aria-label="Preview digest">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
                <Button 
                  onClick={handleExportPDF} 
                  variant="outline" 
                  className="flex-1 gap-2"
                  disabled={selectedBills.size === 0}
                  aria-label="Export digest as PDF"
                >
                  <FileDown className="h-4 w-4" />
                  Export PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Select Bills ({selectedBills.size} selected)</CardTitle>
                {selectedBills.size > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBills(new Set())}
                    aria-label="Clear selection"
                  >
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {mockBills.slice(0, 10).map((bill) => (
                  <div
                    key={bill.id}
                    className="flex items-start gap-3 p-3 border rounded-md hover:bg-accent/50 transition-colors"
                  >
                    <Checkbox
                      id={`bill-${bill.id}`}
                      checked={selectedBills.has(bill.id)}
                      onCheckedChange={() => toggleBill(bill.id)}
                      aria-label={`Select ${bill.number}`}
                    />
                    <label htmlFor={`bill-${bill.id}`} className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-semibold text-sm">{bill.number}</span>
                        <Badge variant="outline" className="text-xs">
                          {bill.chamber}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground line-clamp-1">{bill.title}</p>
                    </label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Showing first 10 bills. Full search coming soon.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
