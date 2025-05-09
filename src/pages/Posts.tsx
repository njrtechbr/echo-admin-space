
import { useState } from "react";
import PostList from "@/components/posts/PostList";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SearchPosts from "@/components/posts/SearchPosts";

export default function PostsPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
        <Button 
          variant="outline" 
          onClick={() => setIsSearchOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Advanced Search
        </Button>
      </div>
      <PostList />
      
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
