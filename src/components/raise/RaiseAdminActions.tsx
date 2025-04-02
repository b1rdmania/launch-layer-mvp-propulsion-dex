
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RaiseStatus, cancelRaise, finalizeRaise, sweepFunds } from '@/services/api';
import { toast } from "sonner";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RaiseAdminActionsProps {
  raiseAddress: string;
  status: RaiseStatus;
  isFinalized: boolean;
  presaleStart: number;
  endTime: number;
  onActionSuccess: () => void;
}

const RaiseAdminActions: React.FC<RaiseAdminActionsProps> = ({
  raiseAddress,
  status,
  isFinalized,
  presaleStart,
  endTime,
  onActionSuccess
}) => {
  const [actionType, setActionType] = useState<'cancel' | 'finalize' | 'sweep' | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const now = Date.now();
  const canCancel = !isFinalized && now < presaleStart;
  const canFinalize = !isFinalized && now >= endTime;
  const canSweep = isFinalized && status !== 'cancelled';

  const getActionConfig = () => {
    switch (actionType) {
      case 'cancel':
        return {
          title: 'Cancel Sale',
          description: 'Are you sure you want to cancel this sale? This action cannot be undone.',
          action: cancelRaise,
          successMessage: 'Sale cancelled successfully',
          buttonText: 'Cancel Sale',
          buttonClass: 'bg-red-600 hover:bg-red-500',
        };
      case 'finalize':
        return {
          title: 'Finalize Raise',
          description: 'Finalizing the raise will end the sale and allow contributors to claim their tokens. Continue?',
          action: finalizeRaise,
          successMessage: 'Raise finalized successfully',
          buttonText: 'Finalize Raise',
          buttonClass: 'bg-purple-600 hover:bg-purple-500',
        };
      case 'sweep':
        return {
          title: 'Sweep Funds',
          description: 'Sweeping funds will transfer all raised tokens to your wallet. Continue?',
          action: sweepFunds,
          successMessage: 'Funds swept successfully',
          buttonText: 'Sweep Funds',
          buttonClass: 'bg-amber-600 hover:bg-amber-500',
        };
      default:
        return {
          title: '',
          description: '',
          action: async () => false,
          successMessage: '',
          buttonText: '',
          buttonClass: '',
        };
    }
  };

  const handleAction = async () => {
    if (!actionType) return;
    
    const config = getActionConfig();
    
    try {
      setIsProcessing(true);
      const success = await config.action(raiseAddress);
      
      if (success) {
        toast.success(config.successMessage);
        setIsDialogOpen(false);
        onActionSuccess();
      } else {
        toast.error("Action failed");
      }
    } catch (error) {
      console.error(`${actionType} error:`, error);
      toast.error(`Failed to ${actionType} sale`);
    } finally {
      setIsProcessing(false);
    }
  };

  const openDialog = (type: 'cancel' | 'finalize' | 'sweep') => {
    setActionType(type);
    setIsDialogOpen(true);
  };

  const config = getActionConfig();

  return (
    <div className="bg-cradle-surface-light p-6 rounded-xl mb-6">
      <h3 className="text-lg font-medium mb-4">Admin Actions</h3>
      
      <div className="flex flex-col space-y-3">
        {canCancel && (
          <Button
            variant="destructive"
            onClick={() => openDialog('cancel')}
            className="bg-red-600 hover:bg-red-500"
          >
            Cancel Sale
          </Button>
        )}
        
        {canFinalize && (
          <Button
            variant="default"
            onClick={() => openDialog('finalize')}
            className="bg-purple-600 hover:bg-purple-500"
          >
            Finalize Raise
          </Button>
        )}
        
        {canSweep && (
          <Button
            variant="default"
            onClick={() => openDialog('sweep')}
            className="bg-amber-600 hover:bg-amber-500"
          >
            Sweep Funds
          </Button>
        )}
        
        {!canCancel && !canFinalize && !canSweep && (
          <p className="text-cradle-text-secondary text-sm py-2">
            No actions available at this time
          </p>
        )}
      </div>
      
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="bg-cradle-surface border-cradle-surface-light">
          <AlertDialogHeader>
            <AlertDialogTitle>{config.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-cradle-text-secondary">
              {config.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              className="bg-cradle-surface-light hover:bg-cradle-surface border-cradle-surface-light text-cradle-text-primary"
              disabled={isProcessing}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleAction();
              }}
              className={config.buttonClass}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : config.buttonText}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RaiseAdminActions;
