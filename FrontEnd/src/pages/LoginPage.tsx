import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form'; // Wait, I installed react-hook-form
// Let me correct that to react-hook-form
import { useForm as useHookForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { LinkIcon } from 'lucide-react';
// import api from '../services/api.ts';  

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useHookForm({
    defaultValues: { email: '', password: '' }
  });
  // console.log("LoginPage in the LoginPage.tsx");

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (error) {
      console.error("login Failed ",error);
    } finally {
      setIsLoading(false);
    }
  };


const check =()=>{
  console.log("Sign in way");
}

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-slate-50 dark:bg-[#0F172A]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="flex justify-center mb-8">
          <div className="bg-[#2563EB] p-3 rounded-xl shadow-lg shadow-blue-500/20">
            <LinkIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        
        <Card className="border-0 shadow-xl shadow-slate-200/50 dark:shadow-none backdrop-blur-xl bg-white/90 dark:bg-[#1E293B]/90">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message as string}
              />
              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...register('password', { required: 'Password is required' })}
                  error={errors.password?.message as string}
                />
                <div className="flex justify-end mt-1">
                  <a href="#" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button type="submit" className="w-full mt-6" isLoading={isLoading}>
                Sign In
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-100 dark:border-slate-800 pt-6">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 dark:text-blue-400 font-medium hover:underline" onClick={check}>
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );


}
