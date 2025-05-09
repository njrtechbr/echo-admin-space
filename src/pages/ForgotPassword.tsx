
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-cms-primary">CMS Admin</h1>
          <p className="mt-2 text-gray-600">Reset your password</p>
        </div>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
