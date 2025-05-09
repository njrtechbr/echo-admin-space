
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { PostService, type Post } from "@/services/PostService";
import { useToast } from "@/components/ui/use-toast";

export default function RecentPosts() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const data = await PostService.getPosts();
        setPosts(data.slice(0, 4)); // Get only the 4 most recent posts
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load recent posts",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecentPosts();
  }, [toast]);

  return (
    <Card className="col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Posts</CardTitle>
        <Button
          size="sm"
          onClick={() => navigate('/posts/new')}
        >
          Add New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-4 text-xs font-semibold text-muted-foreground border-b pb-2">
            <div>Title</div>
            <div>Status</div>
            <div>Date</div>
            <div>Author</div>
          </div>
          
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">
              Loading recent posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="py-8 text-center">
              <p className="text-muted-foreground mb-2">No posts found</p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate('/posts/new')}
              >
                Create your first post
              </Button>
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="grid grid-cols-4 items-center py-2">
                <div className="font-medium truncate">
                  <Button 
                    variant="link" 
                    className="h-auto p-0 font-medium text-left justify-start"
                    onClick={() => navigate(`/posts/${post.id}`)}
                  >
                    {post.title}
                  </Button>
                </div>
                <div>
                  <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(post.created_at!).toLocaleDateString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Admin
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
