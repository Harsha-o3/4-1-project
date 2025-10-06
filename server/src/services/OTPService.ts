// Simple in-memory OTP store for demo
// In production, use Redis or database with expiry
const otpStore = new Map<string, { otp: string; expires: Date; attempts: number }>();

export class OTPService {
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  static async sendOTP(phone: string): Promise<boolean> {
    const otp = this.generateOTP();
    const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    otpStore.set(phone, { otp, expires, attempts: 0 });

    // In production, integrate with Twilio or SMS gateway
    console.log(`📱 SMS OTP for ${phone}: ${otp}`);
    
    return true;
  }

  static verifyOTP(phone: string, otp: string): boolean {
    const stored = otpStore.get(phone);
    
    if (!stored) return false;
    if (stored.attempts >= 3) return false;
    if (new Date() > stored.expires) {
      otpStore.delete(phone);
      return false;
    }

    stored.attempts++;

    if (stored.otp === otp) {
      otpStore.delete(phone);
      return true;
    }

    return false;
  }
}