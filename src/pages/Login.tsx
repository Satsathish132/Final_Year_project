import { useState } from 'react';
 import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { userKey } from '@/lib/userStorage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
   const location = useLocation();
  const { toast } = useToast();
 
   const from = (location.state as { from?: string })?.from || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Load profile image from user-specific key
      const profileImageKey = userKey('profile_image');
      const storedProfileImage = localStorage.getItem(profileImageKey);

      const userToStore = {
        ...data.user,
        ...(storedProfileImage && { profileImage: storedProfileImage }),
      };

      localStorage.setItem("pathlytics_user", JSON.stringify(userToStore));
      localStorage.setItem("token", data.token);

      toast({
        title: "Welcome back!",
        description: "Login successful"
      });

      navigate(from);

    } else {
      toast({
        title: "Login Failed",
        description: data.message,
        variant: "destructive"
      });
    }

  } catch (error) {
    toast({
      title: "Server Error",
      description: "Unable to connect to server",
      variant: "destructive"
    });
  }

  setIsLoading(false);
};
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-xl bg-primary/30 backdrop-blur flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">P</span>
            </div>
            <span className="font-display font-bold text-2xl text-primary-foreground">
              PATHLYTICS-CAREER
            </span>
          </Link>
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">
            Welcome Back
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Continue your career journey with personalized guidance and roadmaps.
          </p>
          
          {/* Decorative elements */}
          <div className="absolute bottom-20 left-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute top-32 right-16 w-48 h-48 bg-primary/30 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile back button */}
          <Link to="/" className="lg:hidden flex items-center gap-2 text-muted-foreground mb-8 hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to home</span>
          </Link>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Log in</h2>
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
