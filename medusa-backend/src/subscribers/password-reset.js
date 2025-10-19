const { sendEmail } = require("../utils/sendEmail.js")

async function sendPasswordResetEmail({ event: { data } }) {
  console.log("Password reset event received:", data)

  const resetUrl = `http://localhost:8000/auth/reset-pass?token=${data.token}&email=${data.entity_id}`
  const text = `Click the link below to reset your password:\n\n${resetUrl}\n\nIf you didn’t request this, ignore this email.`

  await sendEmail(
    data.entity_id,
    "Sofa Society – Reset Your Password",
    text
  )
}

module.exports = {
  default: sendPasswordResetEmail,
  config: {
    event: "auth.password_reset",
  },
}