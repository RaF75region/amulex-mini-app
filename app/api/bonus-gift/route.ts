import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { promises as fs } from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

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

      // Send email notification
      // try {
      //   const templatePath = path.join(process.cwd(), 'app', 'api', 'bonus-gift', 'email-template.html');
      //   let emailTemplate = await fs.readFile(templatePath, 'utf-8');

      //   const currentDate = new Date().toLocaleString('ru-RU', {
      //     year: 'numeric',
      //     month: 'long',
      //     day: 'numeric',
      //     hour: '2-digit',
      //     minute: '2-digit'
      //   });

      //   emailTemplate = emailTemplate
      //     .replace('{{FULL_NAME}}', full_name.trim())
      //     .replace('{{PHONE}}', phone.trim())
      //     .replace('{{TELEGRAM_ID}}', telegram_id.toString())
      //     .replace('{{AGREEMENT}}', agreement_accepted ? 'Принято' : 'Не принято')
      //     .replace('{{DATE}}', currentDate);

      //   const transporter = nodemailer.createTransport({
      //     host: process.env.SMTP_HOST,
      //     port: parseInt(process.env.SMTP_PORT || '587'),
      //     secure: process.env.SMTP_SECURE === 'true',
      //     auth: {
      //       user: process.env.SMTP_USER,
      //       pass: process.env.SMTP_PASSWORD,
      //     },
      //   });

      //   await transporter.sendMail({
      //     from: process.env.SMTP_FROM || process.env.SMTP_USER,
      //     to: process.env.BONUS_EMAIL,
      //     subject: '🎁 Новая заявка на подарок от Твой Друг Юрист',
      //     html: emailTemplate,
      //   });
      // } catch (emailError) {
      //   console.error('Failed to send email:', emailError);
      //   // Don't fail the request if email sending fails
      // }

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
