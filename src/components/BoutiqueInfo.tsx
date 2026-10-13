import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Phone, 
  Scissors, 
  Sparkles, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';

interface BoutiqueInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BoutiqueInfo: React.FC<BoutiqueInfoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white text-stone-500 hover:text-stone-900 shadow-sm transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero image for boutique */}
        <div className="relative h-44 sm:h-52 bg-stone-900 overflow-hidden shrink-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80"
            alt="Boutique Sartoriale"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex flex-col justify-end p-6 text-white">
            <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
              Tradizione & Mestiere dal 1968
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Le Nostre Boutique & Sartorie
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Physical Locations */}
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
              Sedi Fisiche & Negozi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Milano */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <h4 className="font-serif font-bold text-base text-stone-900">Flagship Boutique Milano</h4>
                </div>
                <p className="text-xs text-stone-600">Via Montenapoleone 18, 20121 Milano (MI)</p>
                
                <div className="text-xs text-stone-500 space-y-1 pt-2 border-t border-stone-200/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Lun - Sab: 10:00 - 19:30 | Dom: 11:00 - 19:00</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>+39 02 8901 4455</span>
                  </div>
                </div>
              </div>

              {/* Roma */}
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-800" />
                  <h4 className="font-serif font-bold text-base text-stone-900">Boutique Roma Centro</h4>
                </div>
                <p className="text-xs text-stone-600">Via dei Condotti 42, 00187 Roma (RM)</p>
                
                <div className="text-xs text-stone-500 space-y-1 pt-2 border-t border-stone-200/60">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Lun - Dom: 10:30 - 19:30 continuato</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>+39 06 6789 1234</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sartorial Tailoring Services */}
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2">
              Servizi di Sartoria & Su Misura
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-stone-200 space-y-1.5">
                <div className="p-2 rounded-lg bg-stone-100 text-stone-800 w-fit">
                  <Scissors className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900">Messa a Misura Gratuita</h5>
                <p className="text-stone-500">
                  Ogni capo acquistato online può essere accorciato o sagomato gratuitamente in qualsiasi nostra boutique.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 space-y-1.5">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-900 w-fit">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900">Abito & Camicia Su Misura</h5>
                <p className="text-stone-500">
                  Prenota una sessione privata con i nostri maestri sarti per la scelta di filati Zegna, Loro Piana e Albini.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 space-y-1.5">
                <div className="p-2 rounded-lg bg-stone-100 text-stone-800 w-fit">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900">Garanzia di Longevità</h5>
                <p className="text-stone-500">
                  Forniamo bottoni di riserva originali e servizio di ripasso cuciture a vita per tutti i nostri capi.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-wider mb-4 border-b border-stone-200 pb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-stone-600" />
              <span>Domande Frequenti (FAQ)</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-stone-50 p-3.5 rounded-lg">
                <strong className="text-stone-900 block mb-1">Quali sono i tempi di spedizione e di consegna?</strong>
                <p className="text-stone-600">
                  Gli ordini effettuati prima delle 14:00 vengono spediti il giorno stesso tramite DHL Express con consegna garantita in 24/48 ore lavorative in tutta Italia.
                </p>
              </div>
              <div className="bg-stone-50 p-3.5 rounded-lg">
                <strong className="text-stone-900 block mb-1">Come funzionano i resi e i cambi taglia?</strong>
                <p className="text-stone-600">
                  Hai 30 giorni di tempo dalla ricezione per richiedere un cambio taglia o reso gratuito con ritiro a domicilio o consegna in boutique.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-stone-200 bg-stone-50 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 cursor-pointer"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
