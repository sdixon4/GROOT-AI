import { useState } from 'react';
import { BillCard } from '@/components/bills/BillCard';
import { mockBills } from '@/data/mockBills';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Filter, Download, RefreshCw, Search } from 'lucide-react';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'High Priority', value: 'high' },
  { label: 'Implicit UH', value: 'implicit' },
  { label: 'Budget Impact', value: 'budget' },
  { label: 'Land/Facilities', value: 'land' },
  { label: 'Workforce', value: 'workforce' },
];

export default function Triage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const filteredBills = mockBills.filter((bill) => {
    // Apply filter
    let matchesFilter = false;
    if (activeFilter === 'all') matchesFilter = true;
    else if (activeFilter === 'high' && bill.relevanceScore && bill.relevanceScore >= 0.85) matchesFilter = true;
    else if (activeFilter === 'implicit' && bill.reasonTags?.some(tag => tag.toLowerCase().includes('implicit'))) matchesFilter = true;
    else if (activeFilter === 'budget' && bill.reasonTags?.some(tag => tag.toLowerCase().includes('budget'))) matchesFilter = true;
    else if (activeFilter === 'land' && bill.reasonTags?.some(tag => tag.toLowerCase().includes('land') || tag.toLowerCase().includes('facilities'))) matchesFilter = true;
    else if (activeFilter === 'workforce' && bill.reasonTags?.some(tag => tag.toLowerCase().includes('workforce'))) matchesFilter = true;
    
    if (!matchesFilter) return false;
    
    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return (
        bill.number.toLowerCase().includes(query) ||
        bill.title.toLowerCase().includes(query) ||
        bill.reasonTags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Triage Queue</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {filteredBills.length} bills requiring review • Last updated 2 minutes ago
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm" onClick={handleRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Filters Sidebar */}
        <div className="w-64 border-r border-border bg-muted/30 p-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-sm">Filters</h3>
          </div>
          
          <div className="space-y-1">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setActiveFilter(option.value)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  activeFilter === option.value
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              Legend
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Badge className="bg-success-muted text-success border-success">Confirmed</Badge>
                <span className="text-muted-foreground">Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-warning-muted text-warning border-warning">Provisional</Badge>
                <span className="text-muted-foreground">Needs review</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Search Bar */}
            <div className="mb-6 max-w-5xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by bill number, title, or reason tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Bills List */}
            <div className="space-y-3 max-w-5xl">
              {isLoading ? (
                // Skeleton loading state
                <>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-16" />
                            <Skeleton className="h-5 w-12" />
                            <Skeleton className="h-5 w-20" />
                          </div>
                          <Skeleton className="h-6 w-3/4" />
                          <div className="flex gap-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-28" />
                          </div>
                        </div>
                        <Skeleton className="h-10 w-16" />
                      </div>
                    </div>
                  ))}
                </>
              ) : filteredBills.length > 0 ? (
                filteredBills.map((bill) => (
                  <BillCard key={bill.id} bill={bill} />
                ))
              ) : (
                // Empty state
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No bills found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    {searchQuery
                      ? `No bills match "${searchQuery}". Try a different search term or filter.`
                      : 'No bills match the selected filter. Try selecting a different filter.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
