import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "No signature found" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(bodyText)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(bodyText);

    // We only care about successful payments
    if (event.event === "payment.captured" || event.event === "order.paid") {
      const paymentEntity = event.payload.payment.entity;
      const email = paymentEntity.notes.email || paymentEntity.email;
      const amount = paymentEntity.amount;

      // Ensure they paid at least ₹159 (15900 paise)
      if (amount < 15900) {
        console.warn(`Payment captured but amount is too low: ${amount} for email: ${email}`);
        return NextResponse.json({ status: "ignored_insufficient_amount" });
      }

      if (email) {
        // Send email via Resend
        await resend.emails.send({
          from: "SkillWyn <teams@skillwyn.com>",
          to: [email],
          subject: "Your Access: The Algorithmic Vault 🚀",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 10px;">
              <h2 style="color: #102a7a; text-align: center;">Welcome to The Algorithmic Vault!</h2>
              <p style="font-size: 16px; color: #333;">Hi there,</p>
              <p style="font-size: 16px; color: #333;">Thank you for enrolling in The Algorithmic Vault. Get ready to master DSA, build proof projects, and crush your technical interviews.</p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://app.notion.com/p/Skillwyn-The-Algorithmic-Vault-38789371ec9480f58cfaf51223911578?source=copy_link" 
                   style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">
                  Access The Vault Now
                </a>
              </div>
              
              <p style="font-size: 16px; color: #333; background-color: #f0f7ff; padding: 15px; border-radius: 8px; border-left: 4px solid #2563eb;">
                <strong>Pro Tip:</strong> Bookmark the link above so you can easily access it whenever you are studying.
              </p>
              
              <p style="font-size: 14px; color: #666; margin-top: 30px; text-align: center;">
                Happy Coding!<br/>- Yash & The SkillWyn Team
              </p>
            </div>
          `,
        });
        console.log("Email sent successfully to", email);
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
