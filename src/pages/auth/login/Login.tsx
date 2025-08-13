import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { Input } from "../../../components/ui/input";
import buildingImage from "../../../assets/loginimg.png";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../../features/auth/login/service"; // <-- your service
import { useAuth } from "../../../components/auth/AuthContext";

function Login() {
  const [email, setEmail] = useState("owner@gmail.com");
  const [password, setPassword] = useState("Owner@2025");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {login} = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await loginService({ email, password });
      login(res?.data)
      console.log("Login API Response:", res);
      const { message, data } = res.data || {};
      if (res?.success) {
        toast.success(message || "Login successful!");
        navigate("/");
      } else {
        toast.error(message || "Invalid credentials");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left form */}
      <div className="flex flex-col justify-center px-10 w-1/2">
        <h1 className="text-3xl font-bold text-[64px] text-[#B200FF] text-center mb-2">
          MGM - ANAND
        </h1>
        <p className="text-gray-500 mb-8 text-center">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-[18px] mb-1">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@propertyrms.com"
              className="w-full border rounded px-3 py-2"
              defaultValue="owner@gmail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-[18px] mb-1">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border rounded px-3 py-2 pr-10"
                defaultValue="owner@2025"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      {/* Right image */}
      <div className="w-1/2">
        <img
          src={buildingImage}
          alt="Building"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Login;
