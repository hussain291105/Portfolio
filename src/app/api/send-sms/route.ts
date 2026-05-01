import { NextResponse } from 'next/server';
import twilio from 'twilio';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };

    if (!message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: 'Missing message' },
        { status: 400 }
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_PHONE_NUMBER;
    const to = process.env.OWNER_PHONE_NUMBER;
    const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

    if (!accountSid || !authToken || !to || (!from && !messagingServiceSid)) {
      const missing = [
        !accountSid ? 'TWILIO_ACCOUNT_SID' : null,
        !authToken ? 'TWILIO_AUTH_TOKEN' : null,
        !to ? 'OWNER_PHONE_NUMBER' : null,
        !from && !messagingServiceSid ? 'TWILIO_PHONE_NUMBER or TWILIO_MESSAGING_SERVICE_SID' : null,
      ].filter(Boolean);
      return NextResponse.json(
        {
          success: false,
          error: 'Server is not configured for SMS',
          missing,
        },
        { status: 500 }
      );
    }

    const client = twilio(accountSid, authToken);

    await client.messages.create(
      messagingServiceSid
        ? {
            body: message,
            messagingServiceSid,
            to,
          }
        : {
            body: message,
            from: from as string,
            to,
          }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('send-sms error', error);
    const message =
      typeof error === 'object' && error && 'message' in error
        ? String((error as { message?: unknown }).message)
        : 'Failed to send SMS';
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
