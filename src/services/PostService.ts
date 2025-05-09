
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type PostInsert = Database["public"]["Tables"]["posts"]["Insert"];
export type PostUpdate = Database["public"]["Tables"]["posts"]["Update"];

export const PostService = {
  async getPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },
  
  async getPost(id: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async createPost(post: PostInsert) {
    const { data, error } = await supabase
      .from('posts')
      .insert(post)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async updatePost(id: string, updates: PostUpdate) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return data;
  },
  
  async deletePost(id: string) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  },

  async searchPosts(query: string) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async semanticSearch(query: string) {
    // In a real implementation, this would call an edge function to:
    // 1. Generate embeddings for the query
    // 2. Perform a vector similarity search
    // For now, we'll simulate the results
    
    // Simulated semantic search results
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .limit(5);
      
    if (error) throw error;
    
    // Sort the results by a simulated relevance score
    return data.map(post => ({
      ...post,
      relevance: Math.random() * 0.5 + 0.5 // Simulate relevance score between 0.5 and 1.0
    })).sort((a, b) => b.relevance - a.relevance);
  }
};
