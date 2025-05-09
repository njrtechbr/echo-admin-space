
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, BookText } from "lucide-react";
import { PostService, type Post } from "@/services/PostService";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface SearchResult extends Post {
  relevance?: number;
}

export default function SearchPosts() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searchType, setSearchType] = useState<"keyword" | "semantic">("keyword");
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      let searchResults;
      
      if (searchType === "keyword") {
        searchResults = await PostService.searchPosts(query);
      } else {
        searchResults = await PostService.semanticSearch(query);
      }
      
      setResults(searchResults);
    } catch (error: any) {
      toast({
        title: "Search failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // Mock data for semantic search examples
  const semanticExamples = [
    { query: "increasing website visitors", explanation: "Will find posts about 'traffic growth', 'SEO strategies', etc." },
    { query: "content creation strategies", explanation: "Matches posts about 'writing tips', 'blogging best practices', etc." },
    { query: "user experience improvements", explanation: "Finds posts about 'UI design', 'usability testing', etc." }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="keyword" onValueChange={(value) => setSearchType(value as "keyword" | "semantic")}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="keyword">Keyword Search</TabsTrigger>
          <TabsTrigger value="semantic">Semantic Search</TabsTrigger>
        </TabsList>
        
        <TabsContent value="keyword" className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts by keywords..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Search for posts that contain exact matches of your keywords.
          </p>
        </TabsContent>
        
        <TabsContent value="semantic" className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <BookText className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search posts by meaning..."
                className="pl-8"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading || !query.trim()}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Search for posts with similar meaning, even if they use different words.
          </p>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Example Semantic Searches</CardTitle>
              <CardDescription>Try these examples to see how semantic search works</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {semanticExamples.map((example, i) => (
                  <li key={i} className="bg-muted/50 p-3 rounded-md">
                    <Button 
                      variant="link" 
                      className="p-0 h-auto font-semibold"
                      onClick={() => {
                        setQuery(example.query);
                      }}
                    >
                      "{example.query}"
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">{example.explanation}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">
            Search Results ({results.length})
          </h3>
          
          <div className="space-y-4">
            {results.map((post) => (
              <Card key={post.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <Link to={`/posts/${post.id}`} className="hover:underline">
                      <CardTitle>{post.title}</CardTitle>
                    </Link>
                    <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  {post.relevance && searchType === "semantic" && (
                    <div className="text-xs text-muted-foreground">
                      Relevance: {Math.round(post.relevance * 100)}%
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {post.summary ? (
                    <p className="text-sm">{post.summary}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {post.content.substring(0, 150)}...
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
      
      {query && !isLoading && results.length === 0 && (
        <div className="text-center py-8">
          <p>No results found for "{query}"</p>
          <p className="text-sm text-muted-foreground mt-1">Try a different search term or search method.</p>
        </div>
      )}
    </div>
  );
}
