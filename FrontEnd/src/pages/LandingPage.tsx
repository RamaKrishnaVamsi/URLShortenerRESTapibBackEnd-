import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LinkIcon, BarChart3, Zap, Shield, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const LoginReq = () =>{
    alert("Login required to convert the links");
  }
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 -z-10" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Short links, big results.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Create short links, QR Codes, and Link-in-bio pages. Share them anywhere. 
              Track what's working, and what's not.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-3xl mx-auto bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-4 md:p-6 rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-slate-400" />
                </div>
                <Input 
                  type="url" 
                  placeholder="Paste your long link here..." 
                  className="pl-10 h-14 text-lg bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-blue-500"
                />
              </div>
              <Button onClick={LoginReq} size="lg" className="h-14 px-8 text-lg w-full md:w-auto shrink-0 bg-blue-600 hover:bg-blue-700">
                Shorten Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-slate-500 mt-3 text-left pl-2">
              By clicking Shorten, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to manage links</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform provides comprehensive tools to help you create, manage, and analyze your short links effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-8 w-8 text-amber-500" />}
              title="Lightning Fast"
              description="Our global CDN ensures your short links redirect instantly from anywhere in the world."
              delay={0}
            />
            <FeatureCard 
              icon={<BarChart3 className="h-8 w-8 text-blue-500" />}
              title="Advanced Analytics"
              description="Track clicks, geographic data, referrers, and device types in real-time."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-emerald-500" />}
              title="Secure & Reliable"
              description="Enterprise-grade security with HTTPS on all links and 99.9% uptime guarantee."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to boost your link performance?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of modern teams who use our platform to manage their links.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-slate-50">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
    >
      <div className="mb-4 bg-white dark:bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
