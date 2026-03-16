import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import { BOT_MESSAGES } from '@/shared/constants/bot-messages';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: NextRequest) {
  try {
    const { telegram_id, message } = await request.json();

    const botToken = process.env.MAX_BOT_TOKEN;

    if (!botToken) {
      throw new Error('Bot token not configured');
    }

    if (!telegram_id) {
      return NextResponse.json(
        { error: 'telegram_id is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      await client.query(
        `UPDATE users SET type_ai = $1 WHERE telegram_id = $2`,
        [message || 'legal-consultant', telegram_id]
      );

      const response = await fetch(`https://platform-api.max.ru/messages?user_id=${telegram_id}`, {
        method: 'POST',
        headers: {
          'Authorization': botToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: BOT_MESSAGES.LEGAL_CONSULTANT,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('MAX API error:', data);
        throw new Error('Failed to send message');
      }

      return NextResponse.json({ success: true, data });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
