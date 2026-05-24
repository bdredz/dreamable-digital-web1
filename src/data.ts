/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LeadPackage, ScriptTemplate } from './types';

export const LEAD_PACKAGES: LeadPackage[] = [
  {
    id: 'plan-200',
    name: 'Starter Territory',
    leadsCount: 200,
    price: 97,
    badge: 'Popular for Solo Agents',
    saving: null as any,
    features: [
      '200 verified pre-market homeowner leads/mo',
      'Exclusive neighborhood zip mapping',
      'Propensity-to-sell intelligence scoring',
      'Full script & telephone dialogue playbooks',
      'Daily lead feed priority refreshes',
      'Downloadable direct mail marketing templates'
    ]
  },
  {
    id: 'plan-400',
    name: 'Professional Growth',
    leadsCount: 400,
    price: 175,
    badge: 'Best Value for Pro Prospectors',
    saving: 'Save 10% monthly',
    features: [
      '400 verified pre-market homeowner leads/mo',
      'Exclusive multi-neighborhood zip mapping',
      'Advanced behavioral-trigger filters',
      'Full script & telephone dialogue playbooks',
      'Direct CRM integration pipelines',
      'Priority support and territorial Lock'
    ]
  },
  {
    id: 'plan-600',
    name: 'Elite Expansion',
    leadsCount: 600,
    price: 250,
    badge: 'Ideal for Top Producers',
    saving: 'Save 15% monthly',
    features: [
      '600 verified pre-market homeowner leads/mo',
      'Full territorial zip coverage access',
      'Advanced behavioral-trigger filters',
      'Full script & telephone dialogue playbooks',
      'Real-time automated custom lead alerts',
      'Interactive prospect routing dashboards'
    ]
  },
  {
    id: 'plan-800',
    name: 'Brokerage Dominance',
    leadsCount: 800,
    price: 325,
    badge: 'Absolute Market Dominance',
    saving: 'Save 19% monthly',
    features: [
      '800 verified pre-market homeowner leads/mo',
      'Multi-agent seat dashboard sharing',
      'Premium custom CSV integrations',
      'Full script & telephone dialogue playbooks',
      'Weekly strategy tune-up review calls',
      'Maximum pre-MLS lead volume priority'
    ]
  }
];

export const SCRIPTS: ScriptTemplate[] = [
  {
    id: 'script-pre-mls',
    title: 'The Pre-MLS Direct Sourcing Blueprint',
    category: 'Cold Telephone Outbound',
    difficulty: 'Moderate',
    scenario: 'Pitching deep-data flagged homeowners who are on our list prior to listing with anyone.',
    dialogue: [
      {
        role: 'agent',
        text: "Hi [Homeowner Name], this is [Your Name] with [Your Brokerage]. I know this might feel out of the blue, but I'm doing some research nearby. I specialize in finding off-market seller inventories for buyers who want to move to your area. Have you had any thoughts about whether this year is the right time to transition into your next home?"
      },
      {
        role: 'homeowner',
        text: "Uh, we've talked about it, but we haven't listed. How did you get my name? We aren't on Zillow or anything."
      },
      {
        role: 'agent',
        text: "Totally understand! I use customized local data engines that flag neighborhoods that match high activity requirements (like school district timelines or equity peaks). Your area popped up as a premier candidate. My buyers are looking to avoid the brutal Zillow wars. If we can secure you a premium top-dollar price without the hassle of 50 people stomping through your living room, would you be open to a 10-minute preview review?"
      },
      {
        role: 'homeowner',
        text: "Well... that actually sounds better than cleaning for open houses. What price are we talking about?"
      },
      {
        role: 'agent',
        text: "That's exactly why I want to pop by for ten quick minutes. I will run the pre-market comparative valuation so you see your absolute maximum cash price. Let's do tomorrow at 4:00 PM or would Thursday at 5:30 PM align better?"
      }
    ],
    proTips: [
      'Keep your tone casual and helpful—you are an expert advisor, not a telemarketer.',
      'Acknowledge they aren’t listed yet. Turn this into an exclusive perk for them (no public open houses).',
      'Focus strictly on matching pre-vetted buyers to secure the initial walkthrough.'
    ]
  },
  {
    id: 'script-downsizing',
    title: 'The Strategic Transition / Empty Nester Script',
    category: 'Relocation Consultation',
    difficulty: 'Easy',
    scenario: 'Confronting homeowners flagged for potential downstream downsizing based on high equity and length of residence.',
    dialogue: [
      {
        role: 'agent',
        text: "Hello [Homeowner Name], my name is [Your Name] from [Your Brokerage]. I notice your street has experienced incredible appreciation this cycle. Many long-time neighbors are seeking to lock in those historic capital gains and transition to smaller single-level spaces or relocation destinations. I am hosting a local seminar/market assessment for downsizers. Have you considered looking into how much equity you currently control?"
      },
      {
        role: 'homeowner',
        text: "We have thought about downsizing since the kids left, but the process of buying and selling at the same time is so frightening right now."
      },
      {
        role: 'agent',
        text: "You spoke the absolute truth. Doing both simultaneously is scary. That is exactly why I represent pre-market clients. We set up an extended move-out or rent-back contingency. This means you do not pack a single box until we secure your dream transition home. I can show you how three families on your side of town executed this flawlessly last quarter. Let's take 15 minutes to review the blueprint this week."
      }
    ],
    proTips: [
      'Listen with immense empathy. Downsizing is highly emotional.',
      'De-risk the double-move immediately by discussing leaseback or custom closing schedules.',
      'Showcase success stories of other local downsizers who transitioned smoothly.'
    ]
  },
  {
    id: 'script-sms-direct',
    title: 'The Short SMS Pre-Listing Icebreaker',
    category: 'SMS Outbound',
    difficulty: 'Very Easy',
    scenario: 'A short direct text to high-probability homeowners to establish quick dynamic texting rapport.',
    dialogue: [
      {
        role: 'agent',
        text: "Hi [Homeowner Name], this is [Name] with [Brokerage]. A quick question: I have a pre-qualified buyer looking for a home in [Street/Neighborhood Name] with a layout similar to yours. Before we go through public channels, would you consider an off-market offer with zero commissions?"
      },
      {
        role: 'homeowner',
        text: "Hmm, who is this? We might sell next spring but not yet. What's the buyer's budget?"
      },
      {
        role: 'agent',
        text: "Great to hear! They are approved up to [Local Max Comfort Range], looking for a smooth transaction. I can text you a quick estimate of your home's equity buffer so you see what your net payout is. Let me know if that helps!"
      }
    ],
    proTips: [
      'Always refer to a specific street or local neighborhood segment to establish relevance.',
      'Keep it conversational and low-friction—they should feel like they are replying to a human peer.',
      'The word \"zero commission\" or \"off-market\" handles typical real estate agent defense triggers.'
    ]
  }
];

export const FAQS = [
  {
    question: 'How do you predict who is going to sell?',
    answer: 'We analyze dozens of data vectors across property ownership length, remaining mortgage balances, regional macroeconomic indicators, buyer activity density, building permit timelines, demographic transitions, and historical neighborhood turnover speeds. Our proprietary models rank residential addresses and score those with immediate move probability.'
  },
  {
    question: 'Is this data exclusive to me?',
    answer: 'Yes! We lock each territory to a single active real estate agent when they select a subscription. Once you confirm a zip territory, it is instantly removed from our sourcing list for other subscribers, blocking local competitors from claiming your predictive pipeline.'
  },
  {
    question: 'How often are new leads delivered?',
    answer: 'Leads are updated dynamically as our systems ingest county recorders’ databases, financial records, and credit triggers. Fresh leads matching your zip criteria flow directly into your active Dreamable Dashboard every 24 hours.'
  },
  {
    question: 'Do you provide phone numbers and emails?',
    answer: 'Absolutely. We append high-accuracy contact channels, including verified primary telephone lines, mobile phone numbers, primary email addresses, and detailed home ownership metrics (estimated equity, current loan age, length of residence) in every CSV and dashboard export.'
  },
  {
    question: 'Can I cancel my monthly subscription anytime?',
    answer: 'Yes, absolutely. We operate on a month-to-month subscription basis with zero long-term commitments or setup fees. You can scale, swap your active zip code territories, or cancel your renewal anytime from your self-service account options.'
  }
];
