/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, CreditCard, Mail, Phone, MapPin, Building, Sparkles, Check, CheckCircle2, ArrowRight } from 'lucide-react';
import { LeadPackage, CheckoutFormData } from '../types';
import conf from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: LeadPackage;
  allPlans: LeadPackage[];
}

export default function CheckoutModal({ isOpen, onClose, selectedPlan, allPlans }: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [activePlan, setActivePlan] = useState<LeadPackage>(selectedPlan);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    brokerage: '',
    serviceZip: '',
    planId: selectedPlan.id,
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [orderResponse, setOrderResponse] = useState<any>(null);
  const [showEmailPreviewInPage, setShowEmailPreviewInPage] = useState(false);

  // Sync active plan when prop updates
  useEffect(() => {
    setActivePlan(selectedPlan);
    setFormData(prev => ({ ...prev, planId: selectedPlan.id }));
  }, [selectedPlan]);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Custom credit card formatting
    if (name === 'cardNumber') {
      const formatted = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
      setFormData(prev => ({ ...prev, cardNumber: formatted }));
      return;
    }
    if (name === 'expiry') {
      let formatted = value.replace(/\D/g, '');
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      }
      setFormData(prev => ({ ...prev, expiry: formatted.slice(0, 5) }));
      return;
    }
    if (name === 'cvc') {
      setFormData(prev => ({ ...prev, cvc: value.replace(/\D/g, '').slice(0, 4) }));
      return;
    }
    if (name === 'serviceZip') {
      setFormData(prev => ({ ...prev, serviceZip: value.replace(/\D/g, '').slice(0, 5) }));
      return;
    }
    if (name === 'phone') {
      // Format: (123) 456-7890
      const digits = value.replace(/\D/g, '');
      let formatted = digits;
      if (digits.length > 0) {
        formatted = `(${digits.slice(0, 3)}`;
      }
      if (digits.length > 3) {
        formatted += `) ${digits.slice(3, 6)}`;
      }
      if (digits.length > 6) {
        formatted += `-${digits.slice(6, 10)}`;
      }
      setFormData(prev => ({ ...prev, phone: formatted.slice(0, 14) }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name as keyof CheckoutFormData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handlePlanChange = (planId: string) => {
    const found = allPlans.find(p => p.id === planId);
    if (found) {
      setActivePlan(found);
      setFormData(prev => ({ ...prev, planId }));
    }
  };

  const validateStep = (step: number) => {
    const errors: Partial<Record<keyof CheckoutFormData, string>> = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = 'Full Name is required.';
        isValid = false;
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address.';
        isValid = false;
      }
      if (!formData.phone.trim() || formData.phone.length < 10) {
        errors.phone = 'Please enter a valid phone number.';
        isValid = false;
      }
      if (!formData.brokerage.trim()) {
        errors.brokerage = 'Brokerage or company name is required.';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.serviceZip.trim() || formData.serviceZip.length !== 5) {
        errors.serviceZip = 'A valid 5-digit zip code is required to lock target territory.';
        isValid = false;
      }
    } else if (step === 3) {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 15) {
        errors.cardNumber = 'Please enter a complete credit card number.';
        isValid = false;
      }
      if (!formData.expiry || !/^\d{2}\/\d{2}$/.test(formData.expiry)) {
        errors.expiry = 'Use MM/YY format.';
        isValid = false;
      }
      if (!formData.cvc || formData.cvc.length < 3) {
        errors.cvc = 'Enter CVC.';
        isValid = false;
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    try {
      // API call to server
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          brokerage: formData.brokerage,
          serviceZip: formData.serviceZip,
          planId: activePlan.id,
          planName: activePlan.name,
          planPrice: activePlan.price,
          planLeads: activePlan.leadsCount,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setOrderResponse(data);
        // Trigger celebratory confetti canvas!
        conf({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#000000', '#404040', '#737373', '#a3a3a3', '#fafafa']
        });
      } else {
        alert(data.error || 'There was an error processing your checkout. Please check parameters.');
      }
    } catch (err) {
      console.error(err);
      alert('Network failure connecting to Express checkout engine. Ensure dev server runs correctly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        id="checkout-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm"
      />

      {/* Main Container */}
      <motion.div
        id="checkout-card"
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-4xl bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-stone-800 overflow-hidden flex flex-col md:flex-row z-10 max-h-[90vh]"
      >
        {/* Right Close Button */}
        <button
          id="close-checkout"
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors p-1.5 hover:bg-stone-800 rounded-full z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SIDEBAR: Order review with a high fidelity platinum-look card (RedX minimalist layout inspiration) */}
        <div id="checkout-sidebar" className="w-full md:w-[350px] bg-stone-950 p-6 md:p-8 border-b md:border-b-0 md:border-r border-stone-800 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center gap-2 mb-6">
              {/* Inline SVG Logo - White Cloud with text representation */}
              <svg width="28" height="20" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" fill="#FFFFFF"/>
              </svg>
              <span className="font-sans text-xs tracking-[0.2em] font-bold text-white uppercase">DREAMABLE</span>
            </div>

            <h3 className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-4">Subscription Summary</h3>
            
            {/* Elegant dark card representation */}
            <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 mb-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -transtall-x-1/2 w-24 h-24 bg-white/5 blur-xl rounded-full" />
              <div className="text-xs text-stone-400 font-mono tracking-widest mb-1">DREAMABLE EXCLUSIVE SELECT</div>
              <h4 className="text-lg font-bold text-white tracking-tight mb-2">{activePlan.name}</h4>
              <div className="space-y-1 text-xs text-stone-300">
                <div className="flex justify-between">
                  <span>Lead Allowance:</span>
                  <span className="font-bold text-white">{activePlan.leadsCount} / mo</span>
                </div>
                <div className="flex justify-between">
                  <span>Standard Frequency:</span>
                  <span className="font-mono text-stone-400">Daily Refresh</span>
                </div>
                <div className="flex justify-between">
                  <span>Lead Scripts Library:</span>
                  <span className="text-emerald-400 font-semibold">Included</span>
                </div>
              </div>
              <div className="border-t border-stone-800/80 my-3 pt-3 flex justify-between items-baseline">
                <span className="text-xs text-stone-400">Monthly Total</span>
                <span className="text-2xl font-bold text-white">${activePlan.price}<span className="text-xs text-stone-400 font-normal">/mo</span></span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex gap-2.5 text-xs text-stone-400">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Exclusive territorial locking. Your chosen zip code is unavailable to competing local agents.</span>
              </div>
              <div className="flex gap-2.5 text-xs text-stone-400">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Proprietary telephone scripts, prospecting text templates, and mail guidebooks included.</span>
              </div>
              <div className="flex gap-2.5 text-xs text-stone-400">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>No long-term commitments. Scale, modify coverage, or cancel anytime from panel.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-stone-800/60 hidden md:block">
            <div className="flex items-center gap-2 text-stone-500 text-xs">
              <Shield className="w-4 h-4" />
              <span>AES-256 Bit Payment Encrypt</span>
            </div>
          </div>
        </div>

        {/* MAIN BODY: Interactive Checkout Wizard */}
        <div id="checkout-main-body" className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between">
          
          {/* STEP INDICATOR */}
          {!submitSuccess && (
            <div className="flex items-center justify-between mb-8 border-b border-stone-800 pb-4">
              <span className="text-lg font-bold text-white">Secure Checkout</span>
              <div className="flex gap-1.5 items-center">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        currentStep === s
                          ? 'bg-white text-black ring-4 ring-white/10'
                          : currentStep > s
                          ? 'bg-neutral-800 text-neutral-400 font-sans'
                          : 'bg-stone-800 text-stone-500'
                      }`}
                    >
                      {currentStep > s ? '✓' : s}
                    </div>
                    {s < 3 && <div className={`w-6 h-0.5 ${currentStep > s ? 'bg-stone-700' : 'bg-stone-800'}`} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CHECKOUT FLOW SCREENS */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                /* SUCCESS SCREEN */
                <motion.div
                  key="success-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="text-center space-y-3 py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full mb-2">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-bold text-white tracking-tight">Order Confirmed!</h2>
                    <p className="text-stone-300 max-w-md mx-auto text-sm leading-relaxed">
                      Thank you, {formData.fullName}. Your exclusive territory licenses for ZIP <strong className="text-white">{formData.serviceZip}</strong> are officially locked.
                    </p>
                  </div>

                  {/* Order Invoice Brief info */}
                  <div className="bg-stone-950 border border-stone-800 rounded-xl p-5 space-y-3 font-sans text-xs">
                    <div className="flex justify-between text-stone-400">
                      <span>Order Reference Reference</span>
                      <span className="font-mono text-white font-semibold">{orderResponse?.orderId}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Subscription Tier</span>
                      <span className="text-white font-semibold">{activePlan.name} ({activePlan.leadsCount} Base Leads)</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Service Territory</span>
                      <span className="text-white font-semibold">ZIP Code {formData.serviceZip}</span>
                    </div>
                    <div className="flex justify-between text-stone-400">
                      <span>Payment Account</span>
                      <span className="text-white font-semibold">Visa ending in {formData.cardNumber.slice(-4) || '4242'}</span>
                    </div>
                    <div className="pt-3 border-t border-stone-800 flex justify-between text-sm">
                      <span className="text-stone-300 font-medium">Billed Monthly</span>
                      <span className="text-white font-bold">${activePlan.price} / mo</span>
                    </div>
                  </div>

                  {/* Deliverables notification */}
                  <div className="bg-stone-900/60 p-4 rounded-xl border border-stone-800 text-xs text-stone-300 flex gap-3">
                    <Mail className="w-5 h-5 text-stone-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-white mb-0.5">Confirmation Email Dispatched!</p>
                      <p className="leading-relaxed">
                        A detailed registration receipt has been successfully dispatched to <strong className="text-stone-100">{formData.email}</strong>. It contains setup guides, exclusive scripts download links, and onboarding material.
                      </p>
                    </div>
                  </div>

                  {/* Toggle simulated outbox preview */}
                  <div className="space-y-3">
                    <button
                      id="toggle-email-preview"
                      type="button"
                      onClick={() => setShowEmailPreviewInPage(!showEmailPreviewInPage)}
                      className="w-full py-3 px-4 bg-stone-800 text-stone-200 rounded-xl border border-stone-700 font-semibold hover:bg-stone-700 transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
                    >
                      {showEmailPreviewInPage ? 'Hide Secured Receipt Email Preview' : '✉️ Inspect Dispatched Transaction Email (Low-Latency Simulation Preview)'}
                    </button>

                    {showEmailPreviewInPage && orderResponse?.emailPayload && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-stone-800 rounded-xl overflow-hidden shadow-inner flex flex-col max-h-[300px]"
                      >
                        {/* Simulated Email client bar */}
                        <div className="bg-stone-950 px-4 py-2.5 border-b border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-400">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="ml-2 font-semibold">Dreamable Digital Mail client outbox</span>
                          </div>
                          <span className="text-stone-500">Delivered Sandbox Outbox</span>
                        </div>
                        <div className="p-3 bg-stone-950 border-b border-stone-800 text-xs space-y-1">
                          <div><span className="text-stone-500">From:</span> Onboarding &lt;onboarding@resend.dev&gt;</div>
                          <div><span className="text-stone-500">To:</span> {orderResponse.clientDetails?.email}</div>
                          <div><span className="text-stone-500">Subject:</span> {orderResponse.emailPayload.subject}</div>
                        </div>
                        {/* Actual HTML sandbox renderer */}
                        <div className="bg-stone-100 p-4 overflow-y-auto flex-1 h-[200px]">
                          <div dangerouslySetInnerHTML={{ __html: orderResponse.emailPayload.html }} />
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      id="purchase-done"
                      onClick={onClose}
                      className="py-3 px-6 bg-white text-black font-bold rounded-xl hover:bg-stone-200 transition-all text-xs"
                    >
                      Finish and Open Dashboard
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* CHECKOUT STEPS FORM */
                <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* STEP 1: ACCOUNT DETAILS */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1.5 uppercase tracking-wider">Account Registration</h3>
                        <p className="text-stone-400 text-xs">Enter your professional contact data to register your local territory dashboard credentials.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Full Name</label>
                          <div className="relative">
                            <input
                              id="fullName"
                              type="text"
                              name="fullName"
                              placeholder="Sarah Jenkins"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.fullName ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 px-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all`}
                            />
                          </div>
                          {formErrors.fullName && <p className="text-[10px] text-red-500 font-semibold">{formErrors.fullName}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Brokerage / Team</label>
                          <div className="relative">
                            <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                            <input
                              id="brokerage"
                              type="text"
                              name="brokerage"
                              placeholder="Coldwell Banker / Premier Realty"
                              value={formData.brokerage}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.brokerage ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 pl-11 pr-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all`}
                            />
                          </div>
                          {formErrors.brokerage && <p className="text-[10px] text-red-500 font-semibold">{formErrors.brokerage}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Primary Email</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                            <input
                              id="email"
                              type="email"
                              name="email"
                              placeholder="sarah@premiumlistings.com"
                              value={formData.email}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 pl-11 pr-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all`}
                            />
                          </div>
                          {formErrors.email && <p className="text-[10px] text-red-500 font-semibold">{formErrors.email}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Primary Cell Phone (SMS-Ready)</label>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                            <input
                              id="phone"
                              type="tel"
                              name="phone"
                              placeholder="(555) 765-4321"
                              value={formData.phone}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 pl-11 pr-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all`}
                            />
                          </div>
                          {formErrors.phone && <p className="text-[10px] text-red-500 font-semibold">{formErrors.phone}</p>}
                        </div>
                      </div>

                      <div className="bg-stone-950/40 border border-stone-800 rounded-xl p-4 flex gap-3 text-[11px] text-stone-400">
                        <Sparkles className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                        <span>Double-check these details. High-accuracy contact parameters are used for CRM routing integration, dashboard credentials, and sending your invoice package.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: TERRITORY SETUP */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1.5 uppercase tracking-wider">Target Domain & Subscription</h3>
                        <p className="text-stone-400 text-xs">Assign your subscription package tier and exclusive coverage zip code territory.</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Assigned Exclusive Territory ZIP Code</label>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                            <input
                              id="serviceZip"
                              type="text"
                              name="serviceZip"
                              placeholder="90210"
                              value={formData.serviceZip}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.serviceZip ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 pl-11 pr-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono`}
                            />
                          </div>
                          {formErrors.serviceZip ? (
                            <p className="text-[10px] text-red-500 font-semibold">{formErrors.serviceZip}</p>
                          ) : (
                            <p className="text-[10px] text-stone-500">Only 1 active agent can cover this ZIP territory limit. We instantly withdraw this domain once registered.</p>
                          )}
                        </div>

                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Selected Lead Plan Volume</label>
                          <select
                            id="plan-select"
                            name="planId"
                            value={formData.planId}
                            onChange={(e) => handlePlanChange(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-xl py-3 px-4 text-stone-100 text-xs focus:outline-none focus:ring-1 focus:ring-white transition-all cursor-pointer"
                          >
                            {allPlans.map(p => (
                              <option key={p.id} value={p.id}>
                                {p.name} — {p.leadsCount} Leads/mo (${p.price}/mo)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="border border-stone-800 bg-stone-950/50 rounded-xl p-4 text-xs space-y-2">
                        <div className="font-semibold text-white">Included With Your Subscription:</div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-stone-400 list-disc list-inside">
                          <li>24/7 lead streaming refreshes</li>
                          <li>Advanced equity & credit indicators</li>
                          <li>Proprietary telemarketing scripts</li>
                          <li>CSV Lead export pipelines</li>
                          <li>Zero setup or termination fees</li>
                          <li>territory exclusivity mapping lock</li>
                        </ul>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: PAYMENT SECURIRE */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-4"
                    >
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-1.5 uppercase tracking-wider">Secure Payment Authentication</h3>
                        <p className="text-stone-400 text-xs">Verify your authorization credentials. We encrypt your Stripe payment profile safely.</p>
                      </div>

                      {/* STYLISH GRAPHICAL CARD DISPLAY */}
                      <div className="bg-stone-950 border border-stone-800 rounded-2xl p-5 relative overflow-hidden text-stone-300 h-44 flex flex-col justify-between select-none">
                        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-[10px] text-stone-500 font-mono tracking-widest">DREAMABLE DIGITAL INC</div>
                            <div className="text-xs text-stone-400 font-mono">PREFERRED PLATINUM PARTNER</div>
                          </div>
                          <div className="h-8 w-11 bg-stone-800 rounded-md border border-stone-700 flex items-center justify-center font-bold text-stone-500 font-mono text-[10px]">
                            CHIP
                          </div>
                        </div>

                        <div>
                          <div className="text-base text-stone-100 font-mono tracking-widest mb-2.5">
                            {formData.cardNumber || '•••• •••• •••• ••••'}
                          </div>
                          <div className="flex justify-between items-baseline">
                            <div>
                              <div className="text-[8px] text-stone-600 uppercase">Cardholder</div>
                              <div className="text-xs text-stone-400 font-mono uppercase truncate max-w-[180px]">
                                {formData.fullName || 'YOUR FULL NAME'}
                              </div>
                            </div>
                            <div className="flex gap-4">
                              <div>
                                <div className="text-[8px] text-stone-600 uppercase">Expiry</div>
                                <div className="text-xs text-stone-400 font-mono">{formData.expiry || 'MM/YY'}</div>
                              </div>
                              <div>
                                <div className="text-[8px] text-stone-600 uppercase">CVC</div>
                                <div className="text-xs text-stone-400 font-mono">{formData.cvc || '•••'}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* PAYMENT FIELDS */}
                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-semibold text-stone-300">Credit Card Number</label>
                          <div className="relative">
                            <CreditCard className="absolute left-3.5 top-3.5 w-4 h-4 text-stone-500" />
                            <input
                              id="cardNumber"
                              type="text"
                              name="cardNumber"
                              placeholder="4242 4242 4242 4242"
                              value={formData.cardNumber}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.cardNumber ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800 hover:border-stone-700'
                              } rounded-xl py-3 pl-11 pr-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono`}
                            />
                          </div>
                          {formErrors.cardNumber && <p className="text-[10px] text-red-500 font-semibold">{formErrors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-stone-300">Expiry MM/YY</label>
                            <input
                              id="expiry"
                              type="text"
                              name="expiry"
                              placeholder="12/28"
                              value={formData.expiry}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.expiry ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800'
                              } rounded-xl py-3 px-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono`}
                            />
                            {formErrors.expiry && <p className="text-[10px] text-red-500 font-semibold">{formErrors.expiry}</p>}
                          </div>

                          <div className="space-y-1.5">
                            <label className="block text-xs font-semibold text-stone-300">CVC Code</label>
                            <input
                              id="cvc"
                              type="text"
                              name="cvc"
                              placeholder="123"
                              value={formData.cvc}
                              onChange={handleInputChange}
                              className={`w-full bg-stone-950 border ${
                                formErrors.cvc ? 'border-red-500 ring-1 ring-red-500' : 'border-stone-800'
                              } rounded-xl py-3 px-4 text-stone-100 text-xs placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-white transition-all font-mono`}
                            />
                            {formErrors.cvc && <p className="text-[10px] text-red-500 font-semibold">{formErrors.cvc}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 items-center text-[10px] text-stone-400">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>By processing checkout, you authorize automatic renewal billing of ${activePlan.price} monthly. Cancel easily online.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* BOTTOM STEP CONTROLS (WIZARD) */}
                  <div className="flex justify-between items-center pt-4 border-t border-stone-800">
                    <div>
                      {currentStep > 1 && (
                        <button
                          id="btn-checkout-prev"
                          type="button"
                          onClick={prevStep}
                          className="py-2.5 px-4 bg-transparent text-stone-400 hover:text-white font-semibold transition-colors text-xs pointer-events-auto"
                        >
                          Back
                        </button>
                      )}
                    </div>

                    <div>
                      {currentStep < 3 ? (
                        <button
                          id="btn-checkout-next"
                          type="button"
                          onClick={nextStep}
                          className="py-3 px-6 bg-white text-black font-semibold rounded-xl hover:bg-stone-200 transition-all text-xs flex items-center gap-1.5"
                        >
                          Continue to Step {currentStep + 1}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          id="btn-checkout-submit"
                          type="submit"
                          disabled={isSubmitting}
                          className="py-3 px-8 bg-white text-black font-bold rounded-xl hover:bg-stone-200 transition-all text-xs flex items-center gap-1.5 disabled:bg-stone-800 disabled:text-stone-500 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? 'Securing Territory...' : `Lock Territory & Purchase — $${activePlan.price}/mo`}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
