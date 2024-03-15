import nodemailer from "nodemailer"
import { signupTemplate } from "./templates/signup-template"
import { unsubscribeTemplate } from "./templates/unsubscribe-template"
import { forgotPasswordTemplate } from "./templates/forgot-password-template"
import { getUser } from "@/db/tasks"
import { subscribeTemplate } from "./templates/subscribe-template"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replaceKeysWithValue = (string: string, object: { [x: string]: string }): string => {
  const pattern = new RegExp(Object.keys(object).join("|"), "g")
  return string.replace(pattern, (match: string | number) => object[match])
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any

const sendEmail = async (data: Props): Promise<boolean> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465, // You may need to change this depending on your Zoho settings
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL, // Your Zoho email
      pass: process.env.ZOHO_PASSWORD, // Your Zoho password
    },
  })

  // Extract original URL and optional user ID from the request body.
  let emailHtml = replaceKeysWithValue(signupTemplate, {
    "{name}": data.name,
    "{email}": data.email,
  })
  let values = {
    from: process.env.ZOHO_EMAIL,
    to: data.email,
    subject: data.subject,
    html: emailHtml,
  }
  if (data.type === "signup") {
    emailHtml = replaceKeysWithValue(signupTemplate, {
      "{name}": data.name,
      "{email}": data.email,
    })
    values = {
      from: process.env.ZOHO_EMAIL,
      to: data.email,
      subject: data.subject,
      html: emailHtml,
    }
  }
  if (data.type === "forgot-password") {
    const vals = await getUser(data.email)
    if (vals.length === 0) {
      return true
    }
    emailHtml = replaceKeysWithValue(forgotPasswordTemplate, {
      "{id}": data.id,
      "{email}": data.email,
    })
    values = {
      from: process.env.ZOHO_EMAIL,
      to: data.email,
      subject: data.subject,
      html: emailHtml,
    }
  }
  if (data.type === "unsubscribe") {
    emailHtml = replaceKeysWithValue(unsubscribeTemplate, {
      "{name}": data.name,
      "{email}": data.email,
      "{id}": data.id,
      "{reason}": data.reason,
    })
    values = {
      from: process.env.ZOHO_EMAIL,
      to: process.env.ZOHO_UNSUBSCRIBE_SEND_EMAIL,
      subject: data.subject,
      html: emailHtml,
    }
  }
  if (data.type === "subscribe") {
    emailHtml = replaceKeysWithValue(subscribeTemplate, {
      "{name}": data.name,
    })
    values = {
      from: process.env.ZOHO_EMAIL,
      to: data.email,
      subject: data.subject,
      html: emailHtml,
    }
  }
  try {
    await transporter.sendMail(values)
    return true
  } catch (error) {
    // Handle errors that occur during URL creation and return a server error response.
    console.error("Error sending email", error)
    return false
  }
}

export default sendEmail
