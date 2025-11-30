import transporter from '../config/mailer.js';
import { config } from '../config/config.js';

class EmailService {
  static async sendPasswordResetEmail(user, token) {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;
    const mailOptions = {
      to: user.email,
      from: config.mail.from,
      subject: 'Password reset',
      text: `To reset your password, open the following URL: ${resetUrl}`,
      html: `<p>To reset your password, click <a href="${resetUrl}">this link</a>.</p><p>If the link does not work, use this token: <strong>${token}</strong></p>`
    };
    await transporter.sendMail(mailOptions);
  }
}

export default EmailService;
