import { sendEmail } from "../utils/sendEmail.js"

async function main() {
    console.log("u sendtest")
  await sendEmail(
    "mariobilder123@gmail.com",
    "Test from Sofa Society",
    "ejjj Mario! \n\nThis is a direct test email sent using the working Gmail SMTP setup."
  )
}

main()