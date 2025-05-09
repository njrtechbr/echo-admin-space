
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Header() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  useEffect(() => {
    // Get user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4">
      <div className="w-full flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full pl-8 bg-gray-50"
          />
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-right">
            <p className="text-sm font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-cms-primary text-white flex items-center justify-center">
            {user?.name ? user.name[0] : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}
