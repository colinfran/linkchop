// Import email templates
import { signupTemplate } from "./templates/signup-template"
import { forgotPasswordTemplate } from "./templates/forgot-password-template"
import { subscribeTemplate } from "./templates/subscribe-template"

// Import helper function to get user data from the database
import { getUser } from "@/db/tasks"

// Import Resend library
import { Resend } from "resend"

// Escape user-supplied values (e.g. the name entered at sign-up) so they can't inject HTML
// such as phishing links into emails sent from no-reply@linkchop.com
const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

// Define a function to replace placeholder keys with their corresponding values in the email template
const replaceKeysWithValue = (string: string, object: { [x: string]: string }): string => {
  const pattern = new RegExp(Object.keys(object).join("|"), "g")
  return string.replace(pattern, (match: string) => escapeHtml(object[match]))
}

// Define type for the data object passed to the sendEmail function
type Props = {
  name?: string
  email?: string
  subject?: string
  type: string
  id?: string | null
  reason?: string
}

// Initialize Resend instance with the API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Define the function to send emails
const sendEmail = async (data: Props): Promise<boolean> => {
  if (!data.email) return false

  // Initialize email HTML content and values object
  let emailHtml = ""
  const values = {
    from: "LinkChop <no-reply@linkchop.com>",
    to: data.email,
    subject: data.subject || "",
    html: "",
  }

  // Determine email type and populate email HTML and values accordingly
  if (data.type === "signup") {
    emailHtml = replaceKeysWithValue(signupTemplate, {
      "{name}": data.name || "",
      "{email}": data.email || "",
    })
  } else if (data.type === "forgot-password") {
    const vals = await getUser(data.email || "")
    if (vals.length === 0) {
      return true
    }
    emailHtml = replaceKeysWithValue(forgotPasswordTemplate, {
      "{id}": data.id || "",
      "{email}": data.email || "",
    })
  } else if (data.type === "subscribe") {
    emailHtml = replaceKeysWithValue(subscribeTemplate, {
      "{name}": data.name || "",
    })
  }

  // Populate values object with email HTML content
  values.html = emailHtml

  try {
    // Send email using Resend library
    // *note that we are limited to 100 emails a day / 3,000 emails a mo*
    const { error } = await resend.emails.send(values)
    if (error) throw error
    return true
  } catch (error) {
    // Handle errors that occur during email sending
    console.error("Error sending email", error)
    return false
  }
}

export default sendEmail
