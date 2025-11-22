'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const NewsletterSignup = () => {
    const { toast } = useToast();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // This would be a call to a service like Mailchimp, ConvertKit, etc.
        // For now, we'll simulate the API call.
        await new Promise(res => setTimeout(res, 1000));

        setIsLoading(false);
        setEmail("");
        toast({
            title: "Subscribed!",
            description: "Thanks for joining our newsletter. Look for Texas solar tips in your inbox soon."
        });
    }

    return (
        <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
            <h3 className="font-bold text-lg mb-2">Get Texas Solar News</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Join our newsletter for the latest on incentives, technology, and installer deals.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email for newsletter"
                />
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Subscribing..." : "Subscribe"}
                </Button>
            </form>
        </div>
    )
}
