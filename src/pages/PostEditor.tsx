
import PostForm from "@/components/posts/PostForm";

export default function PostEditorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
      </div>
      <PostForm />
    </div>
  );
}
