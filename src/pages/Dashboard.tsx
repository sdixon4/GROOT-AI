import { useState } from 'react';
import { BillCard } from '@/components/bills/BillCard';
import { mockBills } from '@/data/mockBills';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Download, RefreshCw } from 'lucide-react';

const filterOptions = [
  { label: 'All', value: 'all' },
  { label: 'High Priority', value: 'high' },
  { label: 'Implicit UH', value: 'implicit' },
  { label: 'Budget Impact', value: 'budget' },
  { label: 'Land/Facilities', value: 'land' },
  { label: 'Workforce', value: 'workforce' },
];

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredBills = mockBills.filter((bill) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'high' && bill.relevanceScore && bill.relevanceScore >= 0.85) return true;
    if (activeFilter === 'implicit' && bill.reasonTags?.some(tag => tag.includes('implicit'))) return true;
    if (activeFilter === 'budget' && bill.reasonTags?.some(tag => tag.includes('budget'))) return true;
    if (activeFilter === 'land' && bill.reasonTags?.some(tag => tag.includes('land') || tag.includes('facilities'))) return true;
    if (activeFilter === 'workforce' && bill.reasonTags?.some(tag => tag.includes('workforce'))) return true;
    return false;
  });

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
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
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

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-3 max-w-5xl">
            {filteredBills.map((bill) => (
              <BillCard key={bill.id} bill={bill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
