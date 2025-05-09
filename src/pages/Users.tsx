
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users as UsersIcon } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  // In a real app, these would be fetched from an API
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "Admin User",
      email: "admin@example.com",
      role: "Administrator",
      status: "active",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@example.com",
      role: "Editor",
      status: "active",
    },
    {
      id: 3,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Author",
      status: "inactive",
    },
    {
      id: 4,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Subscriber",
      status: "active",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
          />
          <Search 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
          />
        </div>
        <Button>Add New User</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <UsersIcon className="mr-2 h-5 w-5" />
            User Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
