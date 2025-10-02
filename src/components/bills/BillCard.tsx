import { Bill } from '@/types/legislative';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BillCardProps {
  bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
  const scoreColor = bill.relevanceScore && bill.relevanceScore >= 0.85 
    ? 'bg-danger text-danger-foreground' 
    : bill.relevanceScore && bill.relevanceScore >= 0.75
    ? 'bg-warning text-warning-foreground'
    : 'bg-muted text-muted-foreground';

  return (
    <Link to={`/bill/${bill.id}`}>
      <Card className="p-4 hover:shadow-md transition-all cursor-pointer border-l-4 hover:border-l-accent">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono font-semibold text-primary">{bill.number}</span>
              <Badge variant="outline" className="text-xs">
                {bill.chamber}
              </Badge>
              {bill.confidence && (
                <Badge 
                  className={cn(
                    "text-xs",
                    bill.confidence === 'Confirmed' 
                      ? "bg-success-muted text-success border-success" 
                      : "bg-warning-muted text-warning border-warning"
                  )}
                >
                  {bill.confidence}
                </Badge>
              )}
            </div>
            
            <h3 className="font-medium text-foreground mb-2 line-clamp-2">
              {bill.title}
            </h3>

            {bill.reasonTags && bill.reasonTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {bill.reasonTags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">
                  {new Date(bill.lastActionAt).toLocaleDateString()}
                </span>
              </div>
              {bill.assignedTo && (
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  <span className="text-xs">{bill.assignedTo}</span>
                </div>
              )}
              <Badge variant="outline" className="text-xs ml-auto">
                {bill.status}
              </Badge>
            </div>
          </div>

          {bill.relevanceScore && (
            <div className="flex flex-col items-end gap-2">
              <div className={cn("px-3 py-1.5 rounded-md font-bold text-sm", scoreColor)}>
                {(bill.relevanceScore * 100).toFixed(0)}%
              </div>
              {bill.dueDate && (
                <span className="text-xs text-muted-foreground">
                  Due {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
