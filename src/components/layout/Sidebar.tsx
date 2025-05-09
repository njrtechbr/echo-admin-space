
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [collapsed, setCollapsed] = useState(isMobile);
  const location = useLocation();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile !== isMobile) {
        setCollapsed(mobile);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    
    toast({
      title: 'Logged out successfully',
      description: 'You have been logged out of your account.',
    });
    
    navigate('/login');
  };

  const menuItems = [
    {
      href: "/dashboard",
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      href: "/posts",
      title: "Posts",
      icon: <FileText size={20} />,
    },
    {
      href: "/users",
      title: "Users",
      icon: <Users size={20} />,
    },
    {
      href: "/settings",
      title: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className={cn(
      "min-h-screen bg-cms-primary text-white flex flex-col",
      collapsed ? "w-16" : "w-64",
      "transition-all duration-300 ease-in-out"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <h1 className="text-xl font-bold">CMS Admin</h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10"
        >
          <Menu size={20} />
        </Button>
      </div>

      <div className="flex-1 py-6">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white",
                collapsed && "justify-center"
              )}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="ml-3">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className={cn(
            "w-full text-white/70 hover:bg-white/10 hover:text-white",
            collapsed && "justify-center"
          )}
          onClick={handleLogout}
        >
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Logout</span>}
        </Button>
      </div>
    </div>
  );
}
