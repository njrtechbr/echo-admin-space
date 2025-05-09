
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface PostData {
  id?: number;
  title: string;
  content: string;
  status: "draft" | "published";
}

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<PostData>({
    title: "",
    content: "",
    status: "draft",
  });

  useEffect(() => {
    if (id) {
      // In a real app, this would be an API call
      // Simulating fetching post data
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          // Mock API call
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Mock data
          const mockPost = {
            id: parseInt(id),
            title: `Post ${id} Title`,
            content: `This is the content of post ${id}.`,
            status: id === "1" || id === "3" ? "published" : "draft",
          } as PostData;
          
          setPost(mockPost);
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to load post data.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "Success",
        description: id ? "Post updated successfully" : "Post created successfully",
      });

      navigate("/posts");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving the post.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (value: "draft" | "published") => {
    setPost({
      ...post,
      status: value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              rows={10}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup 
              value={post.status} 
              onValueChange={handleStatusChange as (value: string) => void} 
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="draft" id="draft" />
                <Label htmlFor="draft" className="cursor-pointer">Draft</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="published" id="published" />
                <Label htmlFor="published" className="cursor-pointer">Published</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex space-x-2 justify-end">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/posts")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : id ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
