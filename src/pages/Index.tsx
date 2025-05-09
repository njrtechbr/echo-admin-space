
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get user from localStorage
    const user = localStorage.getItem('user');
    
    // If user is logged in, redirect to dashboard
    if (user) {
      navigate('/dashboard');
    } else {
      // If user is not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    </div>
  );
};

export default Index;
