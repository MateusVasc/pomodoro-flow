import { Clock, Moon, Sun } from 'lucide-react'
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form'
import { Button } from '../ui/button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Link } from 'react-router-dom'

const passRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  pass: z.string().min(8, {
    message: "Password must have at least 2 characters"})
    .max(15, {
      message: "Password can't have more then 15 characters"
    })
    .regex(passRegex, {
      message: "Password must have at least 1 uppercase letter, 1 number and 1 special character"
    })
});

const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      pass: ""
    },
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // it seams I need to do something with the form values here... I don't know what tho...
    console.log(values)
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4'>
      <div className="w-full max-w-md space-y-6">
        {/* Header with icons */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center justify-between w-full">
            <Link to={'/'} className='flex items-center gap-2'>
              <Clock className='h-6 w-6 text-primary' />
              <span className='text-xl font-bold'>Pomodoro Flow</span>
            </Link>
            <div className="flex">
              <Sun />
              {/* <Moon /> */}
            </div>
          </div>
          <h1 className='text-2xl font-bold'>Welcome back</h1>
          <p className='text-sm text-muted-foreground'>Enter your credentials to access your account</p>
        </div>

        {/* Form */}
        <Form {... form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='email@example.com' {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='pass'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <span>Forgot password?</span>
                  <FormControl>
                    <Input type='password' placeholder='Enter your password' {...field}/>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type='submit'>Sign in</Button>
          </form>
        </Form>

        {/* Google btn + Register link */}
        <Button>
          <svg className="" viewBox="0 0 24 24">
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
        <p>Don't have an account? <span>Sign up</span></p>
      </div>
    </div>
  )
}

export default LoginForm