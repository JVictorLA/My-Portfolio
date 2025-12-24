import { send } from '@emailjs/browser';

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export const sendEmail = async (data: EmailData): Promise<void> => {
  try {
    await send(
      'service_3hu6b7v',
      'template_jdjz16u',
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      },
      {
        publicKey: 'EexRohomsZGaWodXT',
      }
    );
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email. Please try again later.');
  }
};