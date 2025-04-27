import VoucherEmail from '@/components/emails/VoucherEmail';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email } = body;

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const result = await resend.emails.send({
      from: 'CoffeeCraft <CoffeeCraft@sixcom.io.vn>',
      to: email,
      subject: '🎁 Mã giảm 10% dành cho bạn!',
      react: VoucherEmail({
        email,
        voucherCode: 'PERCENT10NOMAX',
        message: 'Cảm ơn bạn đã đăng ký nhận tin từ CoffeeCraft!',
        previewText: 'Nhận ngay mã giảm 10% cho đơn hàng đầu tiên.',
      }),
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Email send error:', error);
    return NextResponse.json({ message: 'Lỗi gửi email', error: error.message }, { status: 500 });
  }
}
