import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { config } from '../../config/env.js';

const resend = config.RESEND_API_KEY ? new Resend(config.RESEND_API_KEY) : null;
let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (resend) return null; // Prioritize Resend
  if (transporter) return transporter;

  // Skip creating transporter if SMTP credentials are not configured
  if (!config.SMTP_HOST || !config.SMTP_USER || !config.SMTP_PASS) {
    console.warn('⚠️  Email service not configured (SMTP_HOST/SMTP_USER/SMTP_PASS and RESEND_API_KEY missing). Emails will be skipped.');
    return null;
  }
  
  transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: config.SMTP_PORT || 465,
    secure: (config.SMTP_PORT || 465) === 465,
    auth: {
      user: config.SMTP_USER,
      pass: config.SMTP_PASS,
    },
  });
  
  return transporter;
}

async function sendEmail(options: nodemailer.SendMailOptions): Promise<void> {
  // 1. If Resend is configured, use it for direct premium deliverability
  if (resend) {
    try {
      const fromEmail = config.EMAIL_FROM || 'onboarding@resend.dev';
      // Format from name and address safely
      const fromFormatted = typeof options.from === 'string' 
        ? options.from.replace(/"/g, '') 
        : fromEmail;
      
      const { data, error } = await resend.emails.send({
        from: fromFormatted,
        to: options.to as string | string[],
        subject: options.subject || '',
        html: options.html as string,
        headers: {
          'X-Entity-Ref-ID': Math.random().toString(36).substring(7),
          'Precedence': 'bulk'
        }
      });

      if (error) {
        console.error('📧 Resend email error:', error);
      } else {
        console.log('📧 Resend email sent successfully:', data?.id);
      }
      return;
    } catch (err) {
      console.error('📧 Resend email send failed:', err);
      // Fallback to Nodemailer SMTP if it fails
    }
  }

  // 2. Fallback to Nodemailer SMTP
  const t = getTransporter();
  if (!t) {
    // In development, log the email to console instead of sending
    if (config.NODE_ENV === 'development') {
      console.log('📧 [DEV EMAIL SKIPPED]', {
        to: options.to,
        subject: options.subject,
      });
    }
    return;
  }
  try {
    await t.sendMail(options);
  } catch (err) {
    console.error('📧 Email send failed:', err);
    // Don't rethrow — email failure should not break auth flows
  }
}

const brandColor = '#1D4ED8';
const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>EdiThink</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:Inter,system-ui,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">
    <div style="background:${brandColor};padding:32px 40px;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:700;letter-spacing:-0.5px;">EdiThink</h1>
      <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:13px;">Enterprise Video Conferencing</p>
    </div>
    <div style="padding:40px;">
      ${content}
    </div>
    <div style="padding:24px 40px;background:#F8FAFC;border-top:1px solid #E2E8F0;text-align:center;">
      <p style="margin:0;font-size:12px;color:#94A3B8;">© 2025 EdiThink. All rights reserved.</p>
      <p style="margin:4px 0 0;font-size:12px;color:#94A3B8;">If you didn't request this email, you can ignore it.</p>
    </div>
  </div>
</body>
</html>
`;

export async function sendOTPEmail(
  email: string, 
  name: string, 
  otp: string,
  purpose: 'verification' | 'password-reset' = 'verification'
): Promise<void> {
  const subject = purpose === 'verification' 
    ? 'Verify your EdiThink account' 
    : 'Reset your EdiThink password';
  
  const heading = purpose === 'verification' 
    ? 'Verify your email address' 
    : 'Reset your password';
  
  const content = `
    <h2 style="color:#0F172A;font-size:20px;font-weight:600;margin:0 0 8px;">${heading}</h2>
    <p style="color:#64748B;font-size:15px;margin:0 0 32px;">Hi ${name}, enter this code to ${purpose === 'verification' ? 'verify your account' : 'reset your password'}.</p>
    
    <div style="background:#F1F5F9;border-radius:12px;padding:32px;text-align:center;margin-bottom:32px;">
      <p style="margin:0 0 8px;font-size:13px;color:#64748B;text-transform:uppercase;letter-spacing:1px;">Verification Code</p>
      <div style="font-size:40px;font-weight:700;color:${brandColor};letter-spacing:8px;font-family:monospace;">${otp}</div>
      <p style="margin:12px 0 0;font-size:13px;color:#94A3B8;">Valid for 10 minutes</p>
    </div>
    
    <p style="color:#94A3B8;font-size:13px;margin:0;">For security, never share this code with anyone.</p>
  `;
  
  await sendEmail({
    from: `"EdiThink" <${config.EMAIL_FROM}>`,
    to: email,
    subject,
    html: emailWrapper(content),
  });
}

export async function sendMagicLinkEmail(email: string, magicLink: string): Promise<void> {
  const content = `
    <h2 style="color:#0F172A;font-size:20px;font-weight:600;margin:0 0 8px;">Your magic link</h2>
    <p style="color:#64748B;font-size:15px;margin:0 0 32px;">Click the button below to sign in to EdiThink. This link expires in 15 minutes.</p>
    
    <a href="${magicLink}" style="display:inline-block;background:${brandColor};color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;margin-bottom:32px;">Sign In to EdiThink</a>
    
    <p style="color:#94A3B8;font-size:13px;margin:0;">Or copy this link: <a href="${magicLink}" style="color:${brandColor};">${magicLink}</a></p>
  `;
  
  await sendEmail({
    from: `"EdiThink" <${config.EMAIL_FROM}>`,
    to: email,
    subject: 'Your EdiThink magic link',
    html: emailWrapper(content),
  });
}

export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const content = `
    <h2 style="color:#0F172A;font-size:20px;font-weight:600;margin:0 0 8px;">Welcome to EdiThink! 🎉</h2>
    <p style="color:#64748B;font-size:15px;margin:0 0 24px;">Hi ${name}, your account is verified and ready to go. Start your first meeting in seconds.</p>
    
    <a href="${config.FRONTEND_URL}/home" style="display:inline-block;background:${brandColor};color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;margin-bottom:32px;">Go to Dashboard</a>
    
    <div style="border-top:1px solid #E2E8F0;padding-top:24px;margin-top:24px;">
      <p style="color:#0F172A;font-weight:600;margin:0 0 16px;">What you can do with EdiThink:</p>
      <ul style="color:#64748B;font-size:14px;padding-left:20px;margin:0;line-height:2;">
        <li>Start instant HD video meetings</li>
        <li>Share your screen in up to 4K</li>
        <li>Real-time chat with Twitch-style overlay</li>
        <li>AI meeting summaries and transcripts</li>
        <li>Collaborative whiteboard</li>
      </ul>
    </div>
  `;
  
  await sendEmail({
    from: `"EdiThink" <${config.EMAIL_FROM}>`,
    to: email,
    subject: 'Welcome to EdiThink! ✨',
    html: emailWrapper(content),
  });
}

export async function sendMeetingInviteEmail(
  email: string, 
  hostName: string, 
  meetingTitle: string,
  inviteLink: string,
  scheduledAt?: Date
): Promise<void> {
  const timeStr = scheduledAt 
    ? scheduledAt.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' }) 
    : 'Now';
  
  const content = `
    <h2 style="color:#0F172A;font-size:20px;font-weight:600;margin:0 0 8px;">Meeting Invitation</h2>
    <p style="color:#64748B;font-size:15px;margin:0 0 24px;"><strong>${hostName}</strong> has invited you to a meeting.</p>
    
    <div style="background:#F1F5F9;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-weight:600;color:#0F172A;font-size:16px;">${meetingTitle}</p>
      <p style="margin:0;color:#64748B;font-size:14px;">📅 ${timeStr}</p>
    </div>
    
    <a href="${inviteLink}" style="display:inline-block;background:${brandColor};color:#fff;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:600;font-size:15px;margin-bottom:16px;">Join Meeting</a>
    <p style="color:#94A3B8;font-size:13px;margin:0;">Meeting link: <a href="${inviteLink}" style="color:${brandColor};">${inviteLink}</a></p>
  `;
  
  await sendEmail({
    from: `"EdiThink" <${config.EMAIL_FROM}>`,
    to: email,
    subject: `${hostName} invited you to: ${meetingTitle}`,
    html: emailWrapper(content),
  });
}
