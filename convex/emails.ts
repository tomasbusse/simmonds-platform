import { action } from "./_generated/server";
import { v } from "convex/values";

// Send test invitation email
export const sendTestInvitation = action({
  args: {
    to: v.string(),
    studentName: v.string(),
    testTitle: v.string(),
    testUrl: v.string(),
    companyName: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@simmonds.online";

    if (!apiKey) {
      throw new Error("Resend API key not configured");
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #35627A, #A6A9D0); padding: 30px; border-radius: 12px; text-align: center; }
            .header h1 { color: white; margin: 0; }
            .content { background: #F5F5F5; padding: 30px; border-radius: 12px; margin-top: 20px; }
            .button { display: inline-block; background: #A6A9D0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; }
            .footer { text-align: center; color: #8E9A98; margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎓 New Assessment Available</h1>
            </div>
            <div class="content">
              <p>Hi ${args.studentName},</p>
              <p>You have been invited to take an English assessment: <strong>${args.testTitle}</strong></p>
              <p>This assessment is part of ${args.companyName}'s employee development program.</p>
              <p>Click the button below to start your assessment:</p>
              <a href="${args.testUrl}" class="button">Start Assessment</a>
              <p style="margin-top: 30px; color: #8E9A98;">This assessment will help us place you in the right learning group for your skill level.</p>
            </div>
            <div class="footer">
              <p>© 2024 Simmonds English Learning Platform</p>
              <p>Powered by AI • Built with Next.js & Convex</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Simmonds Platform <${fromEmail}>`,
          to: [args.to],
          subject: `📝 Assessment Invitation: ${args.testTitle}`,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }

      const data = await response.json();

      // TODO: Log email in database when needed

      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});

// Send test results email (positive only)
export const sendTestResults = action({
  args: {
    to: v.string(),
    studentName: v.string(),
    testTitle: v.string(),
    score: v.number(),
    passed: v.boolean(),
    encouragingMessage: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@simmonds.online";

    if (!apiKey) {
      throw new Error("Resend API key not configured");
    }

    // Only send if passed (positive results only)
    if (!args.passed) {
      return { skipped: true, reason: "Only sending positive results" };
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #E5AEA9, #A6A9D0); padding: 30px; border-radius: 12px; text-align: center; }
            .header h1 { color: white; margin: 0; }
            .score-card { background: white; padding: 30px; border-radius: 12px; text-align: center; margin: 20px 0; }
            .score { font-size: 48px; font-weight: bold; color: #35627A; }
            .content { background: #F5F5F5; padding: 30px; border-radius: 12px; }
            .footer { text-align: center; color: #8E9A98; margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Great Job, ${args.studentName}!</h1>
            </div>
            <div class="score-card">
              <div class="score">${args.score}%</div>
              <p style="color: #8E9A98; margin: 10px 0 0 0;">${args.testTitle}</p>
            </div>
            <div class="content">
              <p>${args.encouragingMessage}</p>
              <p>Your excellent performance shows your dedication to improving your English skills. Keep up the fantastic work!</p>
              <p style="margin-top: 30px;">You'll be placed in a learning group that matches your skill level, where you can continue to grow and excel.</p>
            </div>
            <div class="footer">
              <p>© 2024 Simmonds English Learning Platform</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Simmonds Platform <${fromEmail}>`,
          to: [args.to],
          subject: `🎉 Great work on your assessment!`,
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }

      const data = await response.json();

      // TODO: Log email in database when needed

      return data;
    } catch (error) {
      console.error("Error sending results email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});

// Send welcome email
export const sendWelcomeEmail = action({
  args: {
    to: v.string(),
    name: v.string(),
    role: v.union(v.literal("admin"), v.literal("teacher"), v.literal("student")),
    companyName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@simmonds.online";

    if (!apiKey) {
      throw new Error("Resend API key not configured");
    }

    const roleMessages = {
      admin: "You now have full access to manage your company's English learning program.",
      teacher: "You can now manage groups, create lessons, and track student progress.",
      student: "Get ready to improve your English skills with personalized learning!",
    };

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
            .header { background: linear-gradient(135deg, #35627A, #A6A9D0); padding: 30px; border-radius: 12px; text-align: center; }
            .header h1 { color: white; margin: 0; }
            .content { background: #F5F5F5; padding: 30px; border-radius: 12px; margin-top: 20px; }
            .footer { text-align: center; color: #8E9A98; margin-top: 30px; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>👋 Welcome to Simmonds!</h1>
            </div>
            <div class="content">
              <p>Hi ${args.name},</p>
              <p>Welcome to the Simmonds English Learning Platform! ${roleMessages[args.role]}</p>
              ${args.companyName ? `<p>You're part of <strong>${args.companyName}</strong>'s learning program.</p>` : ''}
              <p>Get started by logging into your portal and exploring the platform.</p>
            </div>
            <div class="footer">
              <p>© 2024 Simmonds English Learning Platform</p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `Simmonds Platform <${fromEmail}>`,
          to: [args.to],
          subject: "👋 Welcome to Simmonds English Learning!",
          html: htmlContent,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Resend API error: ${error}`);
      }

      const data = await response.json();

      // TODO: Log email in database when needed

      return data;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }
  },
});