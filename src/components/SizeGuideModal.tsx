import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'donna' | 'uomo' | 'scarpe'>('donna');
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const conv = (val: number) => {
    if (unit === 'in') {
      return (val / 2.54).toFixed(1);
    }
    return val.toString();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-900">
            <Ruler className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Guida alle Taglie Sartoriali
            </h3>
            <p className="text-xs text-stone-500">Misure di riferimento per capi d'abbigliamento italiani</p>
          </div>
        </div>

        {/* Tab Selector & Unit Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pb-3 border-b border-stone-200">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('donna')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'donna'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Donna
            </button>
            <button
              onClick={() => setActiveTab('uomo')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'uomo'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Uomo
            </button>
            <button
              onClick={() => setActiveTab('scarpe')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'scarpe'
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Calzature
            </button>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                unit === 'cm' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-500'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-2 py-0.5 rounded font-medium cursor-pointer ${
                unit === 'in' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-500'
              }`}
            >
              POLLICI
            </button>
          </div>
        </div>

        {/* Tables */}
        <div className="mt-4 overflow-x-auto">
          {activeTab === 'donna' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5">Taglia IT</th>
                  <th className="p-2.5">Internazionale</th>
                  <th className="p-2.5">Seno ({unit})</th>
                  <th className="p-2.5">Vita ({unit})</th>
                  <th className="p-2.5">Fianchi ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">38</td>
                  <td className="p-2.5">XS</td>
                  <td className="p-2.5">{conv(82)}</td>
                  <td className="p-2.5">{conv(62)}</td>
                  <td className="p-2.5">{conv(88)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">40</td>
                  <td className="p-2.5">S</td>
                  <td className="p-2.5">{conv(86)}</td>
                  <td className="p-2.5">{conv(66)}</td>
                  <td className="p-2.5">{conv(92)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">42</td>
                  <td className="p-2.5">M</td>
                  <td className="p-2.5">{conv(90)}</td>
                  <td className="p-2.5">{conv(70)}</td>
                  <td className="p-2.5">{conv(96)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">44</td>
                  <td className="p-2.5">L</td>
                  <td className="p-2.5">{conv(94)}</td>
                  <td className="p-2.5">{conv(74)}</td>
                  <td className="p-2.5">{conv(100)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">46</td>
                  <td className="p-2.5">XL</td>
                  <td className="p-2.5">{conv(98)}</td>
                  <td className="p-2.5">{conv(78)}</td>
                  <td className="p-2.5">{conv(104)}</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'uomo' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5">Taglia IT</th>
                  <th className="p-2.5">Internazionale</th>
                  <th className="p-2.5">Spalle ({unit})</th>
                  <th className="p-2.5">Torace ({unit})</th>
                  <th className="p-2.5">Vita ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">46</td>
                  <td className="p-2.5">S</td>
                  <td className="p-2.5">{conv(44)}</td>
                  <td className="p-2.5">{conv(92)}</td>
                  <td className="p-2.5">{conv(80)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">48</td>
                  <td className="p-2.5">M</td>
                  <td className="p-2.5">{conv(45)}</td>
                  <td className="p-2.5">{conv(96)}</td>
                  <td className="p-2.5">{conv(84)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">50</td>
                  <td className="p-2.5">L</td>
                  <td className="p-2.5">{conv(46)}</td>
                  <td className="p-2.5">{conv(100)}</td>
                  <td className="p-2.5">{conv(88)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">52</td>
                  <td className="p-2.5">XL</td>
                  <td className="p-2.5">{conv(47)}</td>
                  <td className="p-2.5">{conv(104)}</td>
                  <td className="p-2.5">{conv(92)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">54</td>
                  <td className="p-2.5">XXL</td>
                  <td className="p-2.5">{conv(48)}</td>
                  <td className="p-2.5">{conv(108)}</td>
                  <td className="p-2.5">{conv(96)}</td>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'scarpe' && (
            <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-700 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-2.5">EU / IT</th>
                  <th className="p-2.5">UK</th>
                  <th className="p-2.5">US Donna</th>
                  <th className="p-2.5">US Uomo</th>
                  <th className="p-2.5">Lunghezza Piede ({unit})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-600">
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">37</td>
                  <td className="p-2.5">4</td>
                  <td className="p-2.5">6.5</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5">{conv(23.5)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">39</td>
                  <td className="p-2.5">5.5</td>
                  <td className="p-2.5">8.5</td>
                  <td className="p-2.5">6.5</td>
                  <td className="p-2.5">{conv(24.8)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">41</td>
                  <td className="p-2.5">7</td>
                  <td className="p-2.5">10</td>
                  <td className="p-2.5">8</td>
                  <td className="p-2.5">{conv(26.0)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">43</td>
                  <td className="p-2.5">9</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5">10</td>
                  <td className="p-2.5">{conv(27.5)}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-stone-900">45</td>
                  <td className="p-2.5">10.5</td>
                  <td className="p-2.5">-</td>
                  <td className="p-2.5">11.5</td>
                  <td className="p-2.5">{conv(28.8)}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        {/* Advice */}
        <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 space-y-2">
          <div className="flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-amber-800" />
            <span>Consiglio del Mastro Sarto</span>
          </div>
          <p className="text-stone-700 leading-relaxed font-light">
            Se le tue misure cadono a cavallo tra due taglie, per i capispalla e giacche strutturate ti consigliamo di scegliere la taglia superiore per consentire una vestibilità comoda su maglieria. Per pantaloni e camicie in seta, opta per la taglia esatta.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
