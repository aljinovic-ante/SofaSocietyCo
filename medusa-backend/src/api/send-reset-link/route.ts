import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

export const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  console.log("Preparing to send email:")
  console.log("To:", to)
  console.log("Subject:", subject)

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })

  const info = await transporter.sendMail({
    from: `"Sofa Society" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  })

  console.log("Email sent successfully:", info.messageId)
}
