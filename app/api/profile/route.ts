import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const telegramId = searchParams.get('telegram_id');

    if (!telegramId) {
      return NextResponse.json(
        { error: 'telegram_id is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        `SELECT 
          telegram_id,
          telegram_username,
          is_paid,
          payment_id,
          date_start,
          date_end,
          created_at,
          purchases_id,
          type_ai,
          countquerybyfree
        FROM users 
        WHERE telegram_id = $1`,
        [telegramId]
      );

      if (result.rows.length === 0) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }

      const user = result.rows[0];

      return NextResponse.json({
        success: true,
        user: {
          telegramId: user.telegram_id,
          username: user.telegram_username,
          isPaid: user.is_paid,
          paymentId: user.payment_id,
          dateStart: user.date_start,
          dateEnd: user.date_end,
          createdAt: user.created_at,
          purchasesId: user.purchases_id,
          typeAi: user.type_ai,
          countQueryByFree: user.countquerybyfree,
        },
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
