import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telegram_id, full_name, phone, agreement_accepted } = body;

    if (!telegram_id) {
      return NextResponse.json(
        { error: 'telegram_id is required' },
        { status: 400 }
      );
    }

    if (!full_name || !full_name.trim()) {
      return NextResponse.json(
        { error: 'full_name is required' },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { error: 'phone is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO contacts (telegram_id, full_name, phone, agreement_accepted)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [telegram_id, full_name.trim(), phone.trim(), agreement_accepted ?? true]
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
