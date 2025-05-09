
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export default function RecentPosts() {
  const navigate = useNavigate();
  
  // In a real app, these would be fetched from an API
  const posts = [
    {
      id: 1,
      title: "Getting Started with our CMS",
      status: "published",
      date: "Today",
      author: "Admin User",
    },
    {
      id: 2,
      title: "Advanced Content Management Techniques",
      status: "draft",
      date: "Yesterday",
      author: "Admin User",
    },
    {
      id: 3,
      title: "SEO Optimization for Content",
      status: "published",
      date: "3 days ago",
      author: "Admin User",
    },
    {
      id: 4,
      title: "Customizing Your CMS Workflow",
      status: "draft",
      date: "1 week ago",
      author: "Admin User",
    },
  ];

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
          <div className="grid grid-cols-4 text-xs font-semibold text-gray-500 border-b pb-2">
            <div>Title</div>
            <div>Status</div>
            <div>Date</div>
            <div>Author</div>
          </div>
          {posts.map((post) => (
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
              <div className="text-sm text-gray-500">{post.date}</div>
              <div className="text-sm text-gray-500">{post.author}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
