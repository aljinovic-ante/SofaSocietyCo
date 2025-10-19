import { sendPasswordResetEmail } from "./password-reset.js"
import { sendOrderConfirmationEmail } from "./order-confirmation.js"

export default [
  sendPasswordResetEmail,
  sendOrderConfirmationEmail
]