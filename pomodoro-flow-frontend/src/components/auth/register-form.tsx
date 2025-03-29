import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import ThemeToggle from "../theme/theme-toggle";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const nameRegex = /^[a-zA-Z0-9._\s-]{3,30}$/;
const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const formSchema = z.object({
  name: z.string().regex(nameRegex, {message: "Invalid name"}),
  email: z.string().email({ message: "Invalid email address" }),
  pass: z.string().min(8, {
    message: "Password must have at least 8 characters"})
    .max(30, {
      message: "Password can't have more then 30 characters"
    })
    .regex(passRegex, {
      message: "Password must have at least 1 uppercase letter, 1 number and 1 special character"
    }),
    areTearmsAccepted: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms and conditions",
    })
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      pass: "",
      areTearmsAccepted: false
    },
  });
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  };

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4'>
      <div className="w-full max-w-md space-y-6">
        {/* Header with icons */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-between w-full">
            <Link to={'/'} className='flex items-center gap-2'>
              <Clock className='h-6 w-6 text-primary' />
              <span className='text-xl font-bold'>PomodoroFlow</span>
            </Link>
            <ThemeToggle />
          </div>
          <h1 className='text-2xl font-bold'>Create an account</h1>
          <p className='text-sm text-muted-foreground'>Enter your information to get started</p>
        </div>

        {/* Form */}
        <Form {... form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Name</FormLabel>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                    <FormControl>
                    <Input placeholder='Jonh Doe' {...field} className='pl-10'/>
                  </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <FormLabel>Email</FormLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground"/>
                    <FormControl>
                    <Input placeholder='name@example.com' {...field} className='pl-10'/>
                  </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='pass'
              render={({ field }) => (
                <FormItem className='space-y-2'>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                  </div>
                  <div className="relative">
                    <Lock className='absolute left-3 top-3 h-4 w-4 text-muted-foreground'/>
                    <FormControl>
                      <Input type='password' placeholder='••••••••' className='pl-10' {...field}/>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='areTearmsAccepted'
              render={({ field }) => (
                <FormItem className="space-x-2">
                    <div className="flex items-center">
                        <FormControl>
                            <Checkbox 
                            id="terms"
                            checked={field.value} 
                            onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <Label htmlFor="terms" className="text-sm px-2">
                            I agree to the{""}
                            <Link to="/" className="text-primary hover:underline">
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link to="/" className="text-primary hover:underline">
                                Privacy Policy
                            </Link>
                        </Label>
                    </div>
                    <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full'>Create account</Button>
          </form>
        </Form>

        <Separator />

        {/* Google btn + Register link */}
        <Button variant={'outline'} className='w-full'>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Sign in with Google
        </Button>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm