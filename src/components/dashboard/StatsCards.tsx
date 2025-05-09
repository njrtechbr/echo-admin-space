
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileText, Users, FileCheck } from "lucide-react";

export default function StatsCards() {
  // In a real app, these would be fetched from an API
  const stats = [
    {
      title: "Total Posts",
      value: 28,
      description: "4 published today",
      icon: <FileText className="h-5 w-5 text-muted-foreground" />,
      change: "+12.5%",
    },
    {
      title: "Published Posts",
      value: 21,
      description: "80% of all posts",
      icon: <FileCheck className="h-5 w-5 text-muted-foreground" />,
      change: "+8.2%",
    },
    {
      title: "Active Users",
      value: 15,
      description: "3 new this week",
      icon: <Users className="h-5 w-5 text-muted-foreground" />,
      change: "+5.4%",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            {stat.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center space-x-2">
              <CardDescription className="text-xs">
                {stat.description}
              </CardDescription>
              <span className="text-xs font-medium text-green-600">
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
