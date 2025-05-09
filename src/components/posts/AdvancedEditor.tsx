
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Wand2, RefreshCw } from "lucide-react";

interface AdvancedEditorProps {
  initialTitle?: string;
  initialContent?: string;
  initialSummary?: string;
  onSave: (data: { title: string; content: string; summary: string }) => void;
  isLoading?: boolean;
}

export default function AdvancedEditor({
  initialTitle = "",
  initialContent = "",
  initialSummary = "",
  onSave,
  isLoading = false
}: AdvancedEditorProps) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [summary, setSummary] = useState(initialSummary);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{ titles: string[], summaries: string[] }>({ titles: [], summaries: [] });
  const { toast } = useToast();
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Adjust textarea height automatically
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, [content]);

  const generateAISuggestions = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate API call to generate suggestions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample AI-generated titles and summaries
      const generatedTitles = [
        "The Ultimate Guide to Content Management Systems",
        "Unleashing the Power of Modern CMS Platforms",
        "How to Optimize Your Content Strategy with a CMS"
      ];
      
      const generatedSummaries = [
        "This comprehensive guide explores the key features and benefits of content management systems, offering practical insights for businesses of all sizes.",
        "Discover how modern CMS platforms are revolutionizing digital content creation and management, with real-world examples and case studies.",
        "Learn the essential strategies for optimizing your content workflow using the latest CMS tools and techniques."
      ];
      
      setAiSuggestions({
        titles: generatedTitles,
        summaries: generatedSummaries
      });
      
      toast({
        title: "AI suggestions generated!",
        description: "Choose from our suggested titles and summaries or continue with your own.",
      });
    } catch (error) {
      toast({
        title: "Failed to generate suggestions",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const applyTitle = (suggestion: string) => {
    setTitle(suggestion);
    toast({
      description: "Title applied successfully!",
    });
  };

  const applySummary = (suggestion: string) => {
    setSummary(suggestion);
    toast({
      description: "Summary applied successfully!",
    });
  };

  const handleSave = () => {
    onSave({ title, content, summary });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="text-xl font-bold"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={generateAISuggestions}
            disabled={isGenerating || content.length < 50}
            title="Generate AI suggestions"
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wand2 className="h-4 w-4" />}
          </Button>
        </div>
        
        {aiSuggestions.titles.length > 0 && (
          <Card className="p-3 bg-muted/50">
            <p className="text-sm font-medium mb-2">AI-suggested titles:</p>
            <div className="space-y-2">
              {aiSuggestions.titles.map((suggestion, idx) => (
                <div key={idx} className="flex justify-between items-center bg-background p-2 rounded-md">
                  <span className="text-sm">{suggestion}</span>
                  <Button size="sm" variant="ghost" onClick={() => applyTitle(suggestion)}>Apply</Button>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <Tabs defaultValue="write">
        <TabsList>
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="write" className="space-y-4">
          <Textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            className="min-h-[300px] resize-none"
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Summary</label>
            <div className="flex items-center gap-2">
              <Textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Write a short summary of your post (optional)"
                className="min-h-[100px] resize-none"
              />
              {content.length > 100 && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={generateAISuggestions}
                  disabled={isGenerating}
                  title="Generate AI summary suggestions"
                >
                  {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              )}
            </div>
            
            {aiSuggestions.summaries.length > 0 && (
              <Card className="p-3 bg-muted/50">
                <p className="text-sm font-medium mb-2">AI-suggested summaries:</p>
                <div className="space-y-2">
                  {aiSuggestions.summaries.map((suggestion, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-background p-2 rounded-md">
                      <span className="text-sm">{suggestion}</span>
                      <Button size="sm" variant="ghost" onClick={() => applySummary(suggestion)}>Apply</Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </TabsContent>
        <TabsContent value="preview" className="min-h-[400px] prose prose-sm max-w-none">
          <h1>{title || "Untitled Post"}</h1>
          {summary && <div className="bg-muted p-4 rounded-md italic mb-4">{summary}</div>}
          {content ? (
            <div className="whitespace-pre-wrap">{content}</div>
          ) : (
            <p className="text-muted-foreground">No content to preview</p>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading || !title || !content}>
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Save Post
        </Button>
      </div>
    </div>
  );
}
