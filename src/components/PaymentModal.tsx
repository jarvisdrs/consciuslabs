import { Elements } from '@stripe/react-stripe-js';
import { getStripe } from '@/lib/stripe';
import { CheckoutForm } from './CheckoutForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'annual';
  couponCode?: string;
}

export function PaymentModal({
  isOpen,
  onClose,
  planId,
  planName,
  amount,
  billingCycle,
  couponCode,
}: PaymentModalProps) {
  const stripePromise = getStripe();

  const handleSuccess = () => {
    // Redirect a pagina di successo o mostra conferma
    window.location.href = '/success?payment=success';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Completa l'abbonamento</DialogTitle>
        </DialogHeader>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm
            planId={planId}
            planName={planName}
            amount={amount}
            billingCycle={billingCycle}
            couponCode={couponCode}
            onSuccess={handleSuccess}
          />
        </Elements>
      </DialogContent>
    </Dialog>
  );
}
