import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
} from '@react-email/components';

interface VoucherEmailProps {
    email: string;
    voucherCode: string;
    message?: string;
    previewText?: string;
}

export default function VoucherEmail({
    email,
    voucherCode,
    message,
    previewText,
}: VoucherEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>{previewText || 'Nhận mã giảm giá từ Claridy'}</Preview>
            <Body style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#fff' }}>
                <Container style={{ padding: 20 }}>
                    <Heading>Xin chào {email},</Heading>
                    <Text>{message || 'Cảm ơn bạn đã đăng ký nhận tin từ Claridy!'}</Text>
                    <Section>
                        <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                            🎁 Mã của bạn: {voucherCode}
                        </Text>
                    </Section>
                    <Text>Hãy sử dụng mã này khi thanh toán để được giảm ngay 10%.</Text>
                </Container>
            </Body>
        </Html>
    );
}

VoucherEmail.PreviewProps = {
    email: 'example@gmail.com',
    voucherCode: 'GIA10ABC',
    message: 'Cảm ơn bạn đã đăng ký! Dưới đây là mã giảm giá 10% dành cho bạn.',
    previewText: 'Mã giảm 10% dành riêng cho bạn – Đăng ký thành công!',
} satisfies VoucherEmailProps;

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    color: '#212121',
};

const container = {
    padding: '20px',
    backgroundColor: '#f5f5f5',
};

const imageSection = {
    backgroundColor: '#252f3d',
    padding: '20px 0',
    textAlign: 'center' as const,
};

const contentSection = {
    padding: '25px 35px',
    backgroundColor: '#fff',
};

const heading = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#333',
};

const text = {
    fontSize: '14px',
    marginBottom: '12px',
    color: '#333',
};

const voucherBox = {
    textAlign: 'center' as const,
    padding: '20px',
    backgroundColor: '#e0f7fa',
    borderRadius: '8px',
};

const voucherLabel = {
    fontSize: '14px',
    marginBottom: '8px',
    fontWeight: 'bold',
};

const voucherCodeStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#0288d1',
    marginBottom: '8px',
};

const voucherNote = {
    fontSize: '12px',
    color: '#666',
};

const footerSection = {
    padding: '20px 35px',
    backgroundColor: '#fff',
};

const footerText = {
    fontSize: '12px',
    color: '#888',
    marginBottom: '5px',
};
