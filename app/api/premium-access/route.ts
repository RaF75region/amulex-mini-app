import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telegram_id, username, name, link } = body;

    if (!telegram_id) {
      return NextResponse.json(
        { error: 'telegram_id is required' },
        { status: 400 }
      );
    }

    if (!link || !link.trim()) {
      return NextResponse.json(
        { error: 'link is required' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    try {
      const result = await client.query(
        `INSERT INTO telegram_logs (telegram_id, username, name, message_or_link, source)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [
          telegram_id,
          username || null,
          name || null,
          link.trim(),
          '1000 друзей'
        ]
      );

      // Send message to MAX group
      const botToken = process.env.MAX_BOT_TOKEN;
      const groupId = process.env.MAX_GROUP_ID;

      if (botToken && groupId) {
        const messageText = `🎁 Новый запрос на премиум доступ (1000 друзей)

      👤 От: ${username || 'Аноним'} (ID: ${telegram_id})
      📝 Имя: ${name || 'Не указано'}
      🔗 Ссылка: ${link.trim()}`;

        await fetch(`https://platform-api.max.ru/messages?chat_id=${groupId}`, {
          method: 'POST',
          headers: {
            'Authorization': botToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: messageText,
          }),
        }).catch(err => console.error('Failed to send MAX message:', err));
      }

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
