import { useState } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XIcon, CheckIcon } from '@primer/octicons-react';
import { Button } from '@primer/react';
import { CURRENCIES } from '@/data/currencies';

const SUGGESTED = ['USD', 'ZAR', 'THB', 'EUR', 'INR'];

export function CurrencySelector({
  initialCurrency = 'USD',
}: {
  initialCurrency?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(initialCurrency);

  const suggested = CURRENCIES.filter((c) => SUGGESTED.includes(c.code));
  const all = [...CURRENCIES].sort((a, b) => a.name.localeCompare(b.name));

  const select = (code: string) => {
    setSelected(code);
    fetch('/api/preferences/currency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currency: code }),
    });
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{selected}</Button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className='relative z-50'
      >
        <div className='fixed inset-0 bg-black/40' aria-hidden='true' />

        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <DialogPanel className='relative flex overflow-hidden max-h-[85vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl'>
            <div className='flex items-start justify-between border-b border-slate-200 p-3'>
              <div>
                <DialogTitle className='text-lg font-semibold text-default'>
                  Select your currency
                </DialogTitle>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className='ml-4 shrink-0 rounded p-1 text-gray-400 hover:text-gray-600'
              >
                <XIcon size={20} />
              </button>
            </div>

            {/* Scrollable body */}
            <div className='overflow-y-auto p-6'>
              <Section
                label='Suggested for you'
                currencies={suggested}
                selected={selected}
                onSelect={select}
              />
              <Section
                label='All currencies'
                currencies={all}
                selected={selected}
                onSelect={select}
              />
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

function Section({
  label,
  currencies,
  selected,
  onSelect,
}: {
  label: string;
  currencies: typeof CURRENCIES;
  selected: string;
  onSelect: (code: string) => void;
}) {
  return (
    <div className='mb-6'>
      <h3 className='mb-3 text-sm font-bold text-gray-900'>{label}</h3>
      <div className='grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4'>
        {currencies.map((c) => (
          <button
            key={c.code}
            onClick={() => onSelect(c.code)}
            className={`flex items-center justify-between rounded px-3 py-2 text-left hover:bg-blue-50 ${
              selected === c.code ? 'bg-blue-50' : ''
            }`}
          >
            <div>
              <div
                className={`text-sm font-medium ${selected === c.code ? 'text-blue-600' : 'text-gray-800'}`}
              >
                {c.name}
              </div>
              <div
                className={`text-xs ${selected === c.code ? 'text-blue-500' : 'text-gray-400'}`}
              >
                {c.code}
              </div>
            </div>
            {selected === c.code && (
              <CheckIcon size={14} className='shrink-0 text-blue-600' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
