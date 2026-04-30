import type { Metadata } from 'next';
import LegalContent from './LegalContent';

export const metadata: Metadata = {
  title: 'Legal & Documentation – Al-Wajud Properties',
  description: 'Property law, title verification and secure transactions in Nigeria — explained clearly for foreign investors and first-time buyers.',
};

export default function LegalPage() {
  return <LegalContent />;
}
