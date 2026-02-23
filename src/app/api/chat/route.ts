import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

function getOpenAI() {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });
}

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const SYSTEM_PROMPT = `You are a friendly business development rep for SolarInstallersTX.com — Texas's #1 solar installer directory.

Your job is to help solar installation companies:
1. Understand that they're already listed on the directory
2. Claim their FREE Verified Installer badge (no credit card, ever)
3. Upgrade to a paid tier if they want more leads

Keep responses SHORT — 2-3 sentences max. Be warm, direct, and enthusiastic. No corporate fluff.

TIERS (only mention when relevant):
- Free (Verified Badge): Listed on directory + badge widget for their site + basic profile. Zero cost, always free.
- Featured ($99/mo): Priority city placement + lead contact form + photo gallery + reviews
- Premium ($199/mo): City spotlight + direct quote requests routed to them
- Exclusive Leads ($399/mo): ALL leads in their service area + guaranteed #1 placement

TO CLAIM FREE BADGE: Direct them to https://solarinstallerstx.com/claim-your-listing

QUALIFYING QUESTIONS (use naturally, not all at once):
- "How many new solar jobs are you looking to pick up per month?"
- "Are you mainly covering [city] or other parts of Texas too?"
- "Are you already getting leads from Google or other directories?"

When someone is ready to claim their free badge, collect their name and email address.
Once you have name + email, include this tag at the very end of your message (invisible to user):
[CLAIM_CAPTURED: name="Their Name" email="their@email.com" tier="free"]

If they want a paid tier, include:
[CLAIM_CAPTURED: name="Their Name" email="their@email.com" tier="featured|premium|exclusive"]

Then give them the appropriate Stripe link or /claim-your-listing for free.
Stripe links:
- Featured $99/mo: https://solarinstallerstx.com/upgrade-to-premium
- Premium $199/mo: https://solarinstallerstx.com/upgrade-to-premium
- Exclusive $399/mo: https://solarinstallerstx.com/upgrade-to-premium

Do NOT show the [CLAIM_CAPTURED] tag in your visible reply. Strip it before responding.`;

export async function POST(req: NextRequest) {
  try {
    const { messages, sessionId, sourcePage } = await req.json();

    if (!messages || messages.length > 20) {
      return NextResponse.json({
        reply: "Head to solarinstallerstx.com/claim-your-listing to grab your free badge!",
      });
    }

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 220,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || "";

    // Check for claim capture
    const claimMatch = reply.match(
      /\[CLAIM_CAPTURED:\s*name="([^"]+)"\s*email="([^"]+)"\s*tier="([^"]+)"\]/
    );

    if (claimMatch) {
      const supabase = getSupabase();
      await supabase.from("chat_leads").insert({
        name: claimMatch[1],
        email: claimMatch[2],
        tier: claimMatch[3],
        session_id: sessionId,
        source_page: sourcePage || "/",
        created_at: new Date().toISOString(),
      });
    }

    // Strip the tag from visible reply
    const cleanReply = reply.replace(/\[CLAIM_CAPTURED:[^\]]+\]/, "").trim();

    return NextResponse.json({ reply: cleanReply });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      {
        reply:
          "Having a hiccup on my end — grab your free badge at solarinstallerstx.com/claim-your-listing",
      },
      { status: 500 }
    );
  }
}
