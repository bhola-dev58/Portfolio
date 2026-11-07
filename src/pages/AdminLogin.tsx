import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ShieldCheck, ArrowLeft, Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Force pure Light Mode for Admin Login
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const wasDark = root.classList.contains("dark");

    root.classList.remove("dark");
    root.classList.add("light");
    body.classList.add("admin-light-mode");

    return () => {
      root.classList.remove("light");
      body.classList.remove("admin-light-mode");
      if (wasDark) {
        root.classList.add("dark");
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      if (data?.session) {
        toast.success("Welcome back, Admin!");
        navigate("/admin/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-light-mode min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-center items-center px-4 py-12">
      <SEO title="Admin Login | Portfolio CMS" />

      {/* Back to Site Button */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portfolio Website</span>
        </Link>
      </div>

      <Card className="w-full max-w-md p-8 bg-white border border-slate-200/90 shadow-xl rounded-2xl space-y-6">
        {/* Brand Icon & Heading */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white mx-auto shadow-md shadow-orange-500/20">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Admin <span className="text-orange-600">Portal</span>
          </h2>
          <p className="text-xs text-slate-500">
            Sign in with your administrator credentials to manage portfolio content.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs font-semibold text-slate-700">
              Admin Email
            </Label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-orange-500 text-slate-900 rounded-xl"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
              Password
            </Label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 bg-slate-50 border-slate-200 focus-visible:ring-orange-500 text-slate-900 rounded-xl"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2.5 rounded-xl shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AdminLogin;
