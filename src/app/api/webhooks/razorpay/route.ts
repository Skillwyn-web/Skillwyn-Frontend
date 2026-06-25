import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "dummy_secret";

    // Next.js App Router: get raw text body for signature verification
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature provided" }, { status: 400 });
    }

    // Verify the webhook signature securely
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("Invalid webhook signature!");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // Handle the payment success event
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const payload = event.payload;
      let email = "";
      
      // Extract the buyer's email from the payment/order notes
      if (payload.payment && payload.payment.entity.notes && payload.payment.entity.notes.email) {
        email = payload.payment.entity.notes.email;
      } else if (payload.order && payload.order.entity.notes && payload.order.entity.notes.email) {
        email = payload.order.entity.notes.email;
      } else {
        // Fallback: check if the payment entity has a direct email field (from customer input)
        email = payload.payment?.entity?.email || "";
      }

      if (email) {
        console.log(`Sending Vault access email to: ${email}`);
        
        // Send email via Resend
        await resend.emails.send({
          from: "SkillWyn <hello@skillwyn.com>", // Make sure hello@skillwyn.com is verified in your Resend dashboard!
          to: email,
          subject: "Welcome to The Algorithmic Vault - Access Details Inside 🚀",
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #102a7a; background-color: #f8fbff; max-width: 600px; margin: 0 auto; border-radius: 12px; border: 1px solid #dbeafe;">
              <h1 style="color: #2563eb; margin-bottom: 10px;">Welcome to The Algorithmic Vault! 🎉</h1>
              <p style="font-size: 16px; line-height: 1.5; color: #334155;">
                Thank you for your purchase! You have successfully unlocked <strong>The Algorithmic Vault</strong>.
              </p>
              <p style="font-size: 16px; line-height: 1.5; color: #334155;">
                Get ready to master DSA, build enterprise projects, and crush your technical interviews.
              </p>
              
              <div style="margin: 30px 0; padding: 20px; background-color: #ffffff; border-radius: 8px; border-left: 4px solid #2563eb; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                <h3 style="margin-top: 0; color: #102a7a;">Your Access Link</h3>
                <p style="font-size: 14px; color: #64748b;">Click the button below to instantly access your vault materials:</p>
                <a href="${process.env.NEXT_PUBLIC_RAZORPAY_VAULT_LINK || "https://skillwyn.com/vault-access"}" 
                   style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
                  Access The Vault Now
                </a>
              </div>

              <p style="font-size: 14px; color: #64748b;">
                If you have any questions or need support, simply reply to this email.
              </p>
              <p style="font-size: 14px; font-weight: bold; color: #102a7a; margin-top: 30px;">
                Happy Coding,<br>
                The SkillWyn Team
              </p>
            </div>
          `,
        });
        console.log("Email sent successfully!");
      } else {
        console.warn("Webhook received payment.captured but no email found in payload.");
      }
    }

    // Acknowledge receipt to Razorpay
    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing error" },
      { status: 500 }
    );
  }
}
