import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { mockBills } from '@/data/mockBills';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Bills() {
  const [search, setSearch] = useState('');
  const [isLoading] = useState(false);

  const filteredBills = mockBills.filter(
    (bill) =>
      bill.number.toLowerCase().includes(search.toLowerCase()) ||
      bill.title.toLowerCase().includes(search.toLowerCase()) ||
      bill.assignedTo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">All Bills</h1>
            <p className="text-muted-foreground">Searchable list of all tracked bills</p>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by bill #, title, or owner..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                aria-label="Search bills"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredBills.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground">No bills found matching your search.</p>
            </div>
          ) : (
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Bill #</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Title</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Chamber</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Status</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Owner</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Due</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBills.map((bill) => (
                    <tr
                      key={bill.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer focus-within:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <Link
                          to={`/bills/${bill.id}`}
                          className="text-primary hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded"
                          aria-label={`View details for ${bill.number}`}
                        >
                          {bill.number}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-foreground">{bill.title}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className="text-xs">
                          {bill.chamber}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs',
                            bill.status === 'In Committee' && 'bg-warning/20 text-warning',
                            bill.status === 'Introduced' && 'bg-muted'
                          )}
                        >
                          {bill.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">{bill.assignedTo || '—'}</td>
                      <td className="px-4 py-3 text-muted-foreground text-sm">
                        {bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
