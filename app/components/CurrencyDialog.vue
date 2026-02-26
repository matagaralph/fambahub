<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close', 'select']);
const show = defineModel<boolean>('show', { required: true });

function selectCurrency(code: string) {
    emit('select', code);
    emit('close');
}

interface CurrencyOption {
    code: string;
    label: string;
    symbol: string;
}

const currencies: CurrencyOption[] = [
    { code: 'ARS', label: 'Argentine Peso', symbol: '$' },
    { code: 'AUD', label: 'Australian Dollar', symbol: '$' },
    { code: 'BRL', label: 'Brazilian Real', symbol: 'R$' },
    { code: 'CAD', label: 'Canadian Dollar', symbol: '$' },
    { code: 'CHF', label: 'Swiss Franc', symbol: 'CHF' },
    { code: 'CLP', label: 'Chilean Peso', symbol: '$' },
    { code: 'COP', label: 'Colombian Peso', symbol: '$' },
    { code: 'DKK', label: 'Danish Krone', symbol: 'kr.' },
    { code: 'EUR', label: 'Euro', symbol: '€' },
    { code: 'GBP', label: 'British Pound', symbol: '£' },
    { code: 'HKD', label: 'Hong Kong Dollar', symbol: 'HK$' },
    { code: 'IDR', label: 'Indonesian Rupiah', symbol: 'Rp' },
    { code: 'ILS', label: 'Israeli New Shekel', symbol: '₪' },
    { code: 'INR', label: 'Indian Rupee', symbol: '₹' },
];
</script>

<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 class="text-lg font-semibold mb-4">Select Currency</h2>
            <ul class="divide-y divide-slate-100">
                <li v-for="currency in currencies" :key="currency.code">
                    <button
                        class="w-full flex justify-between items-center py-2 px-3 hover:bg-slate-50 rounded text-left"
                        @click="selectCurrency(currency.code)">
                        <span>{{ currency.label }}</span>
                        <span class="text-slate-500">{{ currency.code }} - {{ currency.symbol }}</span>
                    </button>
                </li>
            </ul>
            <button class="mt-6 w-full py-2 rounded bg-slate-100 hover:bg-slate-200 text-slate-700"
                @click="emit('close')">
                Cancel
            </button>
        </div>
    </div>
</template>
