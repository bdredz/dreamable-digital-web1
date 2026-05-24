/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LeadPackage {
  id: string;
  name: string;
  leadsCount: number;
  price: number;
  badge?: string;
  saving?: string;
  features: string[];
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  brokerage: string;
  serviceZip: string;
  planId: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export interface ScriptTemplate {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  scenario: string;
  dialogue: { role: 'agent' | 'homeowner'; text: string }[];
  proTips: string[];
}
