import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, CreditCard } from 'lucide-react';

interface CheckoutFormProps {
  planId: string;
  planName: string;
  amount: number;
  billingCycle: 'monthly' | 'annual';
  couponCode?: string;
  onSuccess: () => void;
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: false, // Mostra campo CAP
};

export function CheckoutForm({ 
  planId, 
  planName, 
  amount, 
  billingCycle,
  couponCode: initialCouponCode,
  onSuccess 
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [couponCode, setCouponCode] = useState(initialCouponCode || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // 1. Crea subscription nel backend
      const API_URL = 'https://consciuslabs-api.vercel.app';
      const response = await fetch(`${API_URL}/api/create-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planId,
          email,
          name,
          couponCode,
        }),
      });

      const { clientSecret, subscriptionId } = await response.json();

      if (!clientSecret) {
        throw new Error('Failed to create subscription');
      }

      // 2. Conferma pagamento con Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name,
              email,
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent?.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Pagamento Sicuro
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Riepilogo Piano */}
          <div className="p-4 rounded-lg bg-secondary space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{planName}</span>
              <span className="text-lg font-bold text-gradient">€{amount}/mese</span>
            </div>
            {billingCycle === 'annual' && (
              <p className="text-xs text-accent">Fatturazione annuale (risparmi il 20%)</p>
            )}
            {couponCode && (
              <p className="text-xs text-green-500">Codice sconto applicato: {couponCode}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tuo@email.com"
              required
            />
          </div>

          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome sulla carta *</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mario Rossi"
              required
            />
          </div>

          {/* Codice Sconto */}
          <div className="space-y-2">
            <Label htmlFor="coupon">Codice sconto (opzionale)</Label>
            <Input
              id="coupon"
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="FOUNDERS50"
            />
            <p className="text-xs text-accent">
              🚀 Programma Founders: usa FOUNDERS50 per il 50% di sconto sul primo mese!
            </p>
          </div>

          {/* Card Element */}
          <div className="space-y-2">
            <Label>Dati carta *</Label>
            <div className="p-3 border rounded-lg bg-white">
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <p className="text-xs text-muted-foreground">
              Pagamento sicuro con Stripe. Non salviamo i dati della tua carta.
            </p>
          </div>

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={!stripe || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Elaborazione...
              </>
            ) : (
              <>
                Paga €{amount}/mese
              </>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Protetto da Stripe. Pagamento cifrato SSL.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
