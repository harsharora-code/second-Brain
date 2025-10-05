import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { backendUrl } from "./Config"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function Signin() {
    const usernameRef =  useRef<HTMLInputElement>(null);
    const passwordRef =  useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin() {
        const username  = usernameRef.current?.value;
        const password =  passwordRef.current?.value;

        const response =  await axios.post(`${backendUrl}api/v1/signin`, {
          username,
          password
        })
        const token  = response.data.token;
        localStorage.setItem("token", token);
        navigate('/')
    }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link"
          onClick={() => {
            navigate('/signup')
          }}
          >Signup</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                ref={usernameRef}
                type="text"
                placeholder="username"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
              id="password"
              ref={passwordRef}
               type="password"
                required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit"
        onClick={signin}
        className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
