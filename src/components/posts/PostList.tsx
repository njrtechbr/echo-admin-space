
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { ChevronDown, FileText, FilePen, Trash2, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { PostService, type Post } from "@/services/PostService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchPosts from "./SearchPosts";

export default function PostList() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await PostService.getPosts();
        setPosts(data);
      } catch (error: any) {
        toast({
          title: "Error loading posts",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPosts();
  }, [toast]);

  const handleDelete = async (id: string) => {
    try {
      await PostService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast({
        title: "Post deleted",
        description: "The post has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete post: " + error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="mr-2 h-4 w-4" />
            Advanced Search
          </Button>
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
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  Loading posts...
                </TableCell>
              </TableRow>
            ) : posts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <p>No posts found</p>
                  <Button 
                    variant="link" 
                    onClick={() => navigate("/posts/new")}
                    className="mt-2"
                  >
                    Create your first post
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    <Link 
                      to={`/posts/${post.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {post.title}
                    </Link>
                    {post.summary && (
                      <p className="text-xs text-muted-foreground truncate max-w-md mt-1">
                        {post.summary}
                      </p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(post.created_at!).toLocaleDateString()}
                  </TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Search Posts</DialogTitle>
          </DialogHeader>
          <SearchPosts />
        </DialogContent>
      </Dialog>
    </div>
  );
}
