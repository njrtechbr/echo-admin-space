
import StatsCards from "@/components/dashboard/StatsCards";
import RecentPosts from "@/components/dashboard/RecentPosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <StatsCards />
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <RecentPosts />
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-500">
              Welcome to your CMS dashboard. Here are some quick actions to get you started:
            </p>
            <ul className="space-y-2 mt-4">
              <li className="text-sm">
                • Add a new <a href="/posts/new" className="text-blue-600 hover:underline">post</a>
              </li>
              <li className="text-sm">
                • View all <a href="/posts" className="text-blue-600 hover:underline">posts</a>
              </li>
              <li className="text-sm">
                • Manage <a href="/users" className="text-blue-600 hover:underline">users</a>
              </li>
              <li className="text-sm">
                • Update your <a href="/settings" className="text-blue-600 hover:underline">settings</a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
