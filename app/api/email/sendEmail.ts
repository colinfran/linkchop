import nodemailer from "nodemailer"
import { signupTemplate } from "./signup-template"
import { unsubscribeTemplate } from "./unsubscribe-template"
import { forgotPasswordTemplate } from "./forgot-password-template"
import { getUser } from "@/app/db"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const replaceKeysWithValue = (string: string, object: any): string => {
  // Create a regular expression pattern to match all keys in the object
  const pattern = new RegExp(Object.keys(object).join("|"), "g")

  // Replace all occurrences of keys with their corresponding values
  return string.replace(pattern, (match: string | number) => object[match])
}

/**
 * Handles POST requests to the '/api/urls/create' endpoint.
 * Creates a new shortened URL with the provided original URL and optional user ID.
 * Generates a unique URL ID using ShortUniqueId library.
 * @param {Request} request - The incoming request object containing the original URL and user ID (if provided).
 * @returns {Promise<Response>} - Returns a response object containing the generated URL ID or an error message.
 */

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
    from: process.env.ZOHO_EMAIL, // Sender adddatas
    to: data.email, // List of recipients
    subject: data.subject, // Subject line
    html: emailHtml, // Plain text body
  }
  if (data.type === "signup") {
    emailHtml = replaceKeysWithValue(signupTemplate, {
      "{name}": data.name,
      "{email}": data.email,
    })
    values = {
      from: process.env.ZOHO_EMAIL, // Sender adddatas
      to: data.email, // List of recipients
      subject: data.subject, // Subject line
      html: emailHtml, // Plain text body
    }
  }
  if (data.type === "forgot-password") {
    const vals = await getUser(data.email)
    if (vals.length === 0) throw Error("Email does not exist.")
    const id = vals[0].id
    console.log(id)
    emailHtml = replaceKeysWithValue(forgotPasswordTemplate, {
      "{id}": id,
    })
    values = {
      from: process.env.ZOHO_EMAIL, // Sender adddatas
      to: data.email, // List of recipients
      subject: data.subject, // Subject line
      html: emailHtml, // Plain text body
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
      from: process.env.ZOHO_EMAIL, // Sender adddatas
      to: process.env.ZOHO_UNSUBSCRIBE_SEND_EMAIL, // List of recipients
      subject: data.subject, // Subject line
      html: emailHtml, // Plain text body
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
