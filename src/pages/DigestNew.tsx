import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function DigestNew() {
  const [title, setTitle] = useState('');
  const [audience, setAudience] = useState('');
  const [period, setPeriod] = useState('');

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
                    <SelectItem value="leadership">Leadership</SelectItem>
                    <SelectItem value="campus">Campus</SelectItem>
                    <SelectItem value="bor">Board of Regents</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button className="flex-1" aria-label="Save digest as draft">
                  Save as Draft
                </Button>
                <Button variant="outline" className="flex-1" aria-label="Preview digest">
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Select Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Bill selection interface coming soon. You'll be able to search and add bills to this
                digest.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
