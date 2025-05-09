
import PostList from "@/components/posts/PostList";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
      </div>
      <PostList />
    </div>
  );
}
