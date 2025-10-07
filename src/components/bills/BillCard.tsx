import { useState } from 'react';
import { Bill, ConfidenceLevel } from '@/types/legislative';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Clock, User, Calendar as CalendarIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

const MOCK_USERS = ['J. Yamada', 'M. Chen', 'K. Tanaka', 'Unassigned'];

interface BillCardProps {
  bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
  const navigate = useNavigate();
  const [billData, setBillData] = useLocalStorage<Record<string, Partial<Bill>>>('bill-metadata', {});
  
  const currentBill = {
    ...bill,
    ...billData[bill.id],
  };

  const scoreColor = currentBill.relevanceScore && currentBill.relevanceScore >= 0.85 
    ? 'bg-danger text-danger-foreground' 
    : currentBill.relevanceScore && currentBill.relevanceScore >= 0.75
    ? 'bg-warning text-warning-foreground'
    : 'bg-muted text-muted-foreground';

  const updateBillField = <K extends keyof Bill>(field: K, value: Bill[K]) => {
    setBillData({
      ...billData,
      [bill.id]: {
        ...billData[bill.id],
        [field]: value,
      },
    });
    toast({
      title: 'Saved (local)',
      description: `${field} updated for ${bill.number}`,
      duration: 2000,
    });
  };

  const toggleConfidence = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newConfidence: ConfidenceLevel = currentBill.confidence === 'Confirmed' ? 'Provisional' : 'Confirmed';
    updateBillField('confidence', newConfidence);
  };

  const handleCardClick = () => {
    navigate(`/bills/${bill.id}`);
  };

  return (
    <Card 
      className="p-4 hover:shadow-md transition-all cursor-pointer border-l-4 hover:border-l-accent"
      onClick={handleCardClick}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono font-semibold text-primary">{currentBill.number}</span>
            <Badge variant="outline" className="text-xs">
              {currentBill.chamber}
            </Badge>
            {currentBill.confidence && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge 
                      onClick={toggleConfidence}
                      className={cn(
                        "text-xs cursor-pointer transition-colors",
                        currentBill.confidence === 'Confirmed' 
                          ? "bg-success-muted text-success border-success hover:opacity-80" 
                          : "bg-warning-muted text-warning border-warning hover:opacity-80"
                      )}
                      aria-label="Toggle confidence level"
                    >
                      {currentBill.confidence}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs font-semibold mb-1">
                      {currentBill.confidence === 'Confirmed' ? 'Confirmed' : 'Provisional'}
                    </p>
                    <p className="text-xs">
                      {currentBill.confidence === 'Confirmed' 
                        ? 'AI classification validated by staff review' 
                        : 'Auto-classified by AI, needs validation'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Click to toggle</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
            
            <h3 className="font-medium text-foreground mb-2 line-clamp-2">
              {currentBill.title}
            </h3>

            {currentBill.reasonTags && currentBill.reasonTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {currentBill.reasonTags.map((tag) => (
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
                  {new Date(currentBill.lastActionAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <User className="h-3.5 w-3.5" />
                <Select
                  value={currentBill.assignedTo || 'Unassigned'}
                  onValueChange={(value) => updateBillField('assignedTo', value === 'Unassigned' ? undefined : value)}
                >
                  <SelectTrigger className="h-6 border-0 shadow-none p-0 text-xs hover:bg-accent focus:ring-0" aria-label="Assign owner">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_USERS.map((user) => (
                      <SelectItem key={user} value={user} className="text-xs">
                        {user}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Badge variant="outline" className="text-xs ml-auto">
                {currentBill.status}
              </Badge>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {currentBill.relevanceScore && (
              <div className={cn("px-3 py-1.5 rounded-md font-bold text-sm", scoreColor)}>
                {(currentBill.relevanceScore * 100).toFixed(0)}%
              </div>
            )}
            
            <div onClick={(e) => e.stopPropagation()}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground hover:bg-transparent"
                    aria-label="Set due date"
                  >
                    <CalendarIcon className="h-3 w-3 mr-1" />
                    {currentBill.dueDate 
                      ? format(new Date(currentBill.dueDate), 'MMM d')
                      : 'Set due date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={currentBill.dueDate ? new Date(currentBill.dueDate) : undefined}
                    onSelect={(date) => {
                      if (date) {
                        updateBillField('dueDate', date.toISOString().split('T')[0]);
                      }
                    }}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </Card>
  );
}
