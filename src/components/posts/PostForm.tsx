
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AdvancedEditor from "./AdvancedEditor";
import { PostService, type Post } from "@/services/PostService";
import { supabase } from "@/integrations/supabase/client";

export default function PostForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Partial<Post>>({
    title: "",
    content: "",
    summary: "",
    status: "draft",
  });

  useEffect(() => {
    if (id) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const fetchedPost = await PostService.getPost(id);
          setPost(fetchedPost);
        } catch (error: any) {
          toast({
            title: "Error",
            description: "Failed to load post data: " + error.message,
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, toast]);

  const handleSave = async (formData: { title: string; content: string; summary: string }) => {
    setIsLoading(true);

    try {
      const { user } = await supabase.auth.getUser();
      if (!user) {
        throw new Error("You must be logged in to save a post");
      }

      const updatedPost = {
        ...post,
        title: formData.title,
        content: formData.content,
        summary: formData.summary,
        user_id: user.id,
      };

      let result;
      if (id) {
        result = await PostService.updatePost(id, updatedPost);
      } else {
        result = await PostService.createPost(updatedPost as any);
      }

      toast({
        title: "Success",
        description: id ? "Post updated successfully" : "Post created successfully",
      });

      navigate("/posts");
    } catch (error: any) {
      toast({
        title: "Error",
        description: "There was a problem saving the post: " + error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (value: string) => {
    setPost({
      ...post,
      status: value as "draft" | "published",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{id ? "Edit Post" : "Create New Post"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <AdvancedEditor
            initialTitle={post.title}
            initialContent={post.content}
            initialSummary={post.summary}
            onSave={handleSave}
            isLoading={isLoading}
          />
          
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup 
              value={post.status} 
              onValueChange={handleStatusChange} 
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
