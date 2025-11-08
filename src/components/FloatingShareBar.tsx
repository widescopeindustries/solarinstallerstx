import React from "react";
import { Share2, FileDown, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const FloatingShareBar = () => {
  const { toast } = useToast();
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const pageTitle = typeof document !== "undefined" ? document.title : "";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl);
    toast({ title: "Link Copied!", description: "URL is now in your clipboard." });
  };

  return (
    <div className="fixed left-4 bottom-1/2 translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
      <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`, '_blank')} aria-label="Share on X">
        <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, '_blank')} aria-label="Share on Facebook">
        <svg xmlns="https://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.print()} aria-label="Save as PDF">
        <FileDown className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={copyToClipboard} aria-label="Copy Link">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};
