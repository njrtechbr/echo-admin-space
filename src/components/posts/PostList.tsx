
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, FileText, FilePen, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Post {
  id: number;
  title: string;
  status: "draft" | "published";
  date: string;
  author: string;
}

export default function PostList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // In a real app, these would be fetched from an API
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Getting Started with our CMS",
      status: "published",
      date: "2023-05-01",
      author: "Admin User",
    },
    {
      id: 2,
      title: "Advanced Content Management Techniques",
      status: "draft",
      date: "2023-04-28",
      author: "Admin User",
    },
    {
      id: 3,
      title: "SEO Optimization for Content",
      status: "published",
      date: "2023-04-25",
      author: "Admin User",
    },
    {
      id: 4,
      title: "Customizing Your CMS Workflow",
      status: "draft",
      date: "2023-04-20",
      author: "Admin User",
    },
  ]);

  const handleDelete = (id: number) => {
    // In a real app, this would be an API call
    setPosts(posts.filter((post) => post.id !== id));
    toast({
      title: "Post deleted",
      description: "The post has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search posts..."
            className="pl-8"
          />
          <FileText 
            className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
          />
        </div>
        <Button onClick={() => navigate("/posts/new")}>
          Add New Post
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Author</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">
                  <Link 
                    to={`/posts/${post.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {post.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </TableCell>
                <TableCell>{post.date}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 p-0"
                      >
                        <ChevronDown className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => navigate(`/posts/${post.id}`)}
                        className="cursor-pointer"
                      >
                        <FilePen className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(post.id)}
                        className="cursor-pointer text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
