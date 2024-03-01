'use client'
/* eslint-disable tailwindcss/no-custom-classname */
/* eslint-disable max-len */
/* eslint-disable no-useless-escape */
import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import PasswordStrengthBar from "react-password-strength-bar"
// import { useAuth } from "../Contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Icons } from "@/assets/icons"
import { createUser, getUser } from "app/db"
import { useRouter } from 'next/navigation';



const userSignUpFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name can not be longer than 30 characters.",
    }),
  email: z
    .string()
    .min(1, { message: "This is not a valid email." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximun 32 characters"),
})

type UserSignUpFormValues = z.infer<typeof userSignUpFormSchema>

// type SignInFormProps = {
//   onSignUp: () => Promise<void>
// }

const SignUpForm: React.FC = () => {
  const router = useRouter();

  const [passwordScore, setPasswordScore] = useState(0)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("|")

  const formSignUp = useForm<UserSignUpFormValues>({
    resolver: zodResolver(userSignUpFormSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const form = formSignUp
  const { handleSubmit, watch } = form
  const formData = watch()

  const register = async () => {
    setLoading(true);

    console.log(formData)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        // Redirect to protected page or display success message
        router.push('/protected');
      } else {
        // Handle registration error
        const errorData = await response.json();
        console.error('Registration failed:', errorData.error);
        setError(errorData.error)
      }
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Enter your name, email, and choose a password to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div>
            <Form {...form}>
              <form className="space-y-8" onSubmit={handleSubmit(register as any)}>
                <div>
                  <div>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Billy Bob" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="hello@test.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <div className="relative flex w-full space-x-2">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem className={"w-full"}>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="abc123" {...field} type="password" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <PasswordStrengthBar
                      className={`mt-2 ${formData.password === "" && "invisible"}`}
                      password={formData.password}
                      scoreWordStyle={formData.password === "" ? { visibility: "hidden" } : {}}
                      onChangeScore={(s) => setPasswordScore(s)}
                    />
                  </div>
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      disabled={loading || passwordScore !== 4}
                      type="submit"
                    >
                      {loading ? <Icons.spinner className="mr-2 size-4 animate-spin" /> : "Sign Up"}
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
          <div>
            <div className={`text-error ${error !== "|" ? "visible" : "invisible"}`}>
              <p className="text-sm font-medium text-destructive">{error}</p>
            </div>
          </div>
          <div className="mb-10">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative mt-5 flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>
            <Button className="mt-5 w-full" disabled={loading} type="button" variant="outline">
              <Icons.google className="mr-2 size-4" /> Google
            </Button>
            <Button className="mt-5 w-full" disabled={loading} type="button" variant="outline">
              <Icons.apple className="mr-2 size-4" /> Apple
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default SignUpForm
