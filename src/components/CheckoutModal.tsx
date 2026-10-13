import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  CreditCard, 
  Truck, 
  Lock, 
  ArrowRight
} from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedPromo: string | null;
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  appliedPromo,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  
  // Shipping form state
  const [formData, setFormData] = useState({
    firstName: 'Marco',
    lastName: 'Bellosi',
    email: 'bellosi2022@gmail.com',
    phone: '+39 340 1234567',
    address: 'Corso Buenos Aires 45',
    city: 'Milano',
    province: 'MI',
    postalCode: '20124',
    country: 'Italia',
    notes: 'Lasciare alla portineria se assente'
  });

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'klarna' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8920');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('789');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const orderNumber = `AT-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderNumber,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        address: formData.address,
        city: `${formData.city} (${formData.province})`,
        postalCode: formData.postalCode,
        country: formData.country,
        paymentMethod: paymentMethod.toUpperCase(),
        subtotal,
        discount,
        shipping,
        total,
        items,
        date: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
      };

      setCompletedOrder(order);
      setIsProcessing(false);
      setStep('success');
      onOrderCompleted(order);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              {step === 'success' ? "Conferma dell'Ordine" : 'Cassa Sicura • Checkout'}
            </h2>
            <p className="text-xs text-stone-500">
              {step === 'shipping' && 'Passo 1 di 2: Dati di spedizione e recapito'}
              {step === 'payment' && 'Passo 2 di 2: Modalità di pagamento crittografato'}
              {step === 'success' && 'Il tuo ordine sartoriale è stato preso in carico'}
            </p>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-stone-500 hover:text-stone-950 hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Cognome *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Telefono per il Corriere *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Indirizzo e Numero Civico *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="es. Via Montenapoleone 18"
                  className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Città *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">CAP *</label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Provincia *</label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none uppercase"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Note per la consegna (opzionale)</label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-stone-200 rounded-lg focus:ring-1 focus:ring-stone-400 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-between items-center border-t border-stone-100">
                <span className="text-xs text-stone-500">
                  Totale da corrispondere: <strong className="text-stone-900 text-sm">{total.toFixed(2)} €</strong>
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Vai al Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="space-y-5">
              {/* Payment Methods */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mx-auto mb-1 text-stone-800" />
                  <span className="text-xs font-semibold block text-stone-900">Carta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'applepay'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-base font-bold mx-auto mb-1 block">Pay</span>
                  <span className="text-xs font-semibold block text-stone-900">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('klarna')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'klarna'
                      ? 'border-stone-900 bg-pink-50 ring-1 ring-pink-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs font-black text-pink-700 mx-auto mb-1 block">Klarna.</span>
                  <span className="text-xs font-semibold block text-stone-900">3 Rate 0%</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    paymentMethod === 'paypal'
                      ? 'border-stone-900 bg-blue-50 ring-1 ring-blue-700'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span className="text-xs font-black text-blue-800 mx-auto mb-1 block">PayPal</span>
                  <span className="text-xs font-semibold block text-stone-900">Conto / Paga</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Numero Carta</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">Scadenza</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 uppercase mb-1">CVV / CVC</label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'klarna' && (
                <div className="p-4 bg-pink-50/70 border border-pink-200 rounded-xl text-xs text-stone-700">
                  <p className="font-semibold text-pink-900 mb-1">Paga in 3 comode rate senza interessi</p>
                  <p>Prima rata oggi di {(total / 3).toFixed(2)} €, le successive tra 30 e 60 giorni.</p>
                </div>
              )}

              {/* Summary recap */}
              <div className="p-4 bg-stone-100/70 rounded-xl space-y-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Destinatario:</span>
                  <strong className="text-stone-900">{formData.firstName} {formData.lastName}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Indirizzo:</span>
                  <span className="text-stone-900">{formData.address}, {formData.city}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-800 font-medium">
                    <span>Sconto promozionale {appliedPromo ? `(${appliedPromo})` : ''}:</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-stone-900 pt-2 border-t border-stone-200 text-sm">
                  <span>Totale Addebito:</span>
                  <span className="font-serif text-base">{total.toFixed(2)} €</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep('shipping')}
                  className="text-xs text-stone-500 hover:text-stone-900 underline cursor-pointer"
                >
                  ← Modifica spedizione
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-8 py-3.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all flex items-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>{isProcessing ? 'Elaborazione in corso...' : `Paga ${total.toFixed(2)} €`}</span>
                </button>
              </div>
            </form>
          )}

          {step === 'success' && completedOrder && (
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold tracking-widest text-amber-800 uppercase">Grazie per il tuo ordine!</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  Ordine Confermato #{completedOrder.orderNumber}
                </h3>
                <p className="text-xs text-stone-500 mt-2 max-w-md mx-auto">
                  Abbiamo inviato l'email di conferma con il tracking code a <strong className="text-stone-800">{completedOrder.email}</strong>. 
                  I maestri artigiani stanno preparando con cura il tuo pacco sartoriale.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-left text-xs space-y-3">
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Data Ordine:</span>
                  <span className="font-medium text-stone-900">{completedOrder.date}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Corriere Espresso:</span>
                  <span className="font-medium text-stone-900 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-stone-600" /> DHL Express Milano (24/48h)
                  </span>
                </div>
                <div className="flex justify-between border-b border-stone-200 pb-2">
                  <span className="text-stone-500">Consegna presso:</span>
                  <span className="font-medium text-stone-900">{completedOrder.address}, {completedOrder.city}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-stone-900 pt-1">
                  <span>Totale Pagato:</span>
                  <span className="font-serif text-base text-amber-900">{completedOrder.total.toFixed(2)} €</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-all cursor-pointer shadow-md inline-block"
              >
                Torna al Negozio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
