/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API endpoint for checking zip code availability (dynamic simulation)
  app.post('/api/check-zip', (req, res) => {
    const { zip } = req.body;
    if (!zip || zip.trim().length < 5) {
      return res.status(400).json({ error: 'Please enter a valid zip code.' });
    }

    // Direct deterministic generation based on ZIP code digits to simulate high fidelity analytics
    const zipSum = zip.split('').reduce((acc: number, char: string) => acc + (parseInt(char, 10) || 0), 0);
    const leadsAvailable = Math.floor(120 + (zipSum * 8.4) % 180);
    const growthPercent = (5.2 + (zipSum * 0.7) % 12).toFixed(1);
    const hotSellersCount = Math.floor(12 + (zipSum * 1.3) % 25);
    const demandMultiplier = (1.5 + (zipSum * 0.15) % 2.5).toFixed(1);

    return res.json({
      zip,
      available: true,
      leadsCount: leadsAvailable,
      growthPercent,
      hotSellersCount,
      demandMultiplier,
      exclusiveStatus: zipSum % 3 !== 0 ? 'AVAILABLE_EXCLUSIVE' : 'HIGH_DEMAND',
    });
  });

  // API endpoint for checkout processing (Order Flow)
  app.post('/api/checkout', async (req, res) => {
    const {
      fullName,
      email,
      phone,
      brokerage,
      serviceZip,
      planId,
      planName,
      planPrice,
      planLeads
    } = req.body;

    // Validate request
    if (!fullName || !email || !phone || !brokerage || !serviceZip || !planId) {
      return res.status(400).json({ error: 'All registration and service details are required.' });
    }

    const cleanedEmail = email.trim().toLowerCase();
    const orderId = `DD-${Math.floor(100000 + Math.random() * 900000)}`;
    const invoiceDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Create dynamic, premium HTML Email template matching our minimalist monochrome theme
    const emailSubject = `Welcome to Dreamable Digital – Your Predictive Seller Leads are Ready! (Order Ref: ${orderId})`;
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #171717;
            background-color: #fafafa;
            margin: 0;
            padding: 40px 10px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e5e5e5;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background-color: #0c0a09;
            padding: 32px 24px;
            text-align: center;
          }
          .header img {
            height: 40px;
          }
          .title {
            color: #ffffff;
            font-size: 20px;
            font-weight: 600;
            margin-top: 12px;
            letter-spacing: 0.05em;
          }
          .content {
            padding: 32px 24px;
          }
          .greeting {
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 8px;
            color: #0c0a09;
          }
          .lead-text {
            color: #52525b;
            line-height: 1.6;
            font-size: 15px;
            margin-bottom: 24px;
          }
          .order-card {
            background-color: #f5f5f4;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 24px;
          }
          .order-title {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            color: #78716c;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .order-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            font-size: 15px;
          }
          .order-row:last-child {
            margin-bottom: 0;
            padding-top: 10px;
            border-top: 1px dashed #d6d3d1;
            font-weight: bold;
          }
          .order-label {
            color: #57534e;
          }
          .order-value {
            color: #0c0a09;
          }
          .guide-box {
            border: 1px solid #e7e5e4;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 28px;
          }
          .guide-header {
            display: flex;
            align-items: center;
            font-weight: 600;
            color: #0c0a09;
            margin-bottom: 10px;
            font-size: 15px;
          }
          .guide-item {
            font-size: 14px;
            color: #52525b;
            margin-bottom: 8px;
            padding-left: 14px;
            position: relative;
          }
          .guide-item::before {
            content: "•";
            position: absolute;
            left: 0;
            color: #0c0a09;
            font-weight: bold;
          }
          .button-wrapper {
            text-align: center;
            margin: 32px 0 12px;
          }
          .cta-button {
            background-color: #171717;
            color: #ffffff;
            padding: 14px 28px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 500;
            font-size: 15px;
            display: inline-block;
          }
          .footer {
            background-color: #f5f5f4;
            padding: 24px;
            text-align: center;
            font-size: 12px;
            color: #78716c;
            border-top: 1px solid #e7e5e4;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <!-- Vector Styled Branding Representation of Cloud Logo in Email -->
            <svg width="48" height="32" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto 4px;">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04Z" fill="#FFFFFF"/>
            </svg>
            <div class="title">DREAMABLE DIGITAL</div>
          </div>
          
          <div class="content">
            <div class="greeting">Hi ${fullName},</div>
            <p class="lead-text">
              Welcome to the future of real estate prospecting. Your order for the <strong>Right Time, Right Place Leads</strong> has been processed, and your local territory is officially secured.
              By accessing dozens of pre-market behavioral signals, our models will list target households most likely to move in <strong>${serviceZip}</strong> shortly, giving you exclusive runway to pitch them before listing competitors arrive.
            </p>

            <div class="order-card">
              <div class="order-title">Order & Setup Confirmation</div>
              <div class="order-row">
                <span class="order-label">Order Ref ID</span>
                <span class="order-value" style="font-family: monospace;">${orderId}</span>
              </div>
              <div class="order-row">
                <span class="order-label">Date</span>
                <span class="order-value">${invoiceDate}</span>
              </div>
              <div class="order-row">
                <span class="order-label">Brokerage</span>
                <span class="order-value">${brokerage}</span>
              </div>
              <div class="order-row">
                <span class="order-label">Exclusive Territory ZIP</span>
                <span class="order-value"><strong>${serviceZip}</strong></span>
              </div>
              <div class="order-row">
                <span class="order-label">Assigned Plan</span>
                <span class="order-value">${planName} (${planLeads} Leads/mo)</span>
              </div>
              <div class="order-row">
                <span class="order-label">Monthly Charge</span>
                <span class="order-value" style="font-weight: 600;">$${planPrice}/mo</span>
              </div>
            </div>

            <div class="guide-box">
              <div class="guide-header">⚡ Getting Started Checklist & Deliverables</div>
              <div class="guide-item"><strong>Lead Delivery:</strong> Your leads dashboard will assemble and output the first curated pre-market leads for ${serviceZip} within 12-24 hours.</div>
              <div class="guide-item"><strong>Scripts & Templates:</strong> Included in your subscription is our proprietary library of cold outreach blueprints, text scripts, and direct mail guidelines tailored specifically for pre-market situations.</div>
              <div class="guide-item"><strong>Exclusive Territory Lock:</strong> To preserve predictive integrity, this ZIP code tier is limited list exclusivity. Rest assured, you have secured pre-market leverage.</div>
            </div>

            <p class="lead-text" style="font-style: italic;">
              "The proactive approach requires calling or introducing yourself before they speak to anyone else. It avoids the Zillow bidding wars entirely."
            </p>

            <div class="button-wrapper">
              <a href="${process.env.APP_URL || 'http://localhost:3000'}/dashboard" class="cta-button">Launch Your Active Dashboard</a>
            </div>
          </div>

          <div class="footer">
            <p>© ${new Date().getFullYear()} Dreamable Digital Inc. All rights reserved.</p>
            <p>Predictive Leads Division • Pre-Market Real Estate Seller Sourcing</p>
            <p style="margin-top: 8px; font-size: 11px;">You are receiving this receipt because of your purchase of Right Time, Right Place Leads.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    let resendSent = false;
    let mailErrorObj = null;

    // Check if RESEND_API_KEY is configured
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== 'MY_GEMINI_API_KEY') {
      try {
        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
          },
          body: JSON.stringify({
            from: 'Dreamable Digital Onboarding <onboarding@resend.dev>',
            to: cleanedEmail,
            subject: emailSubject,
            html: emailHtml
          })
        });

        if (resendResponse.ok) {
          resendSent = true;
          console.log(`[Resend API] Success: Real email successfully queued to ${cleanedEmail}`);
        } else {
          const errBody = await resendResponse.json();
          mailErrorObj = errBody;
          console.error('[Resend API] Error response:', errBody);
        }
      } catch (err: any) {
        mailErrorObj = { message: err.message };
        console.error('[Resend API] Network/transport error attempting to email:', err);
      }
    } else {
      console.log(`[Email Simulation Service]
- From: onboarding@dreamabledigital.com
- To: ${cleanedEmail}
- Subject: ${emailSubject}
- Status: Dispatched via local sandbox simulation (RESEND_API_KEY not set).`);
    }

    // Always succeed order in UI sandbox with dynamic simulation details in response
    return res.json({
      success: true,
      orderId,
      invoiceDate,
      emailSent: resendSent || !process.env.RESEND_API_KEY,
      isSimulated: !resendSent,
      simulationMessage: !process.env.RESEND_API_KEY ? 'Simulated dispatch successful. Outgoing message body provided below.' : null,
      resendError: mailErrorObj,
      clientDetails: {
        fullName,
        email: cleanedEmail,
        phone,
        brokerage,
        serviceZip,
        planName,
        planPrice,
        planLeads
      },
      emailPayload: {
        subject: emailSubject,
        html: emailHtml
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dreamable Digital full-stack server active on port ${PORT}`);
  });
}

startServer();
