import { createUser, getUser } from "app/db"
import { signIn } from "@/app/auth/auth"

export async function POST(request: Request): Promise<Response> {
  const res = await request.json()
  const { email, name, password } = res
  try {
    // Check if user already exists
    const userExists = await getUser(email)
    if (userExists.length > 0) {
      return Response.json({ error: "User already exists" })
      // return Response.json({ error: 'User already exists' })
      // return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    await createUser(email, password, name)

    // Sign in the user
    await signIn("credentials", {
      email,
      password,
      // Specify the redirect URL after sign-in
      redirect: false, // Don't redirect automatically
      callbackUrl: "/home", // Redirect to '/home' after sign-in
    })

    return Response.json({ message: "User registered and signed in successfully" })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" })
  }
}
