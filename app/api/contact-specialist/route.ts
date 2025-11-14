import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telegram_id, username, message_text } = body;

    if (!telegram_id) {
      return NextResponse.json(
        { error: 'telegram_id is required' },
        { status: 400 }
      );
    }

    if (!message_text || !message_text.trim()) {
      return NextResponse.json(
        { error: 'message_text is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO complaintsandsuggestions (telegram_id, username, message_text)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [telegram_id, username || null, message_text.trim()]
      );

      return NextResponse.json({
        success: true,
        data: result.rows[0],
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
