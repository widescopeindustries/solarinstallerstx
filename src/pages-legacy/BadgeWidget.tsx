import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BadgeWidgetPage = () => {
    const { toast } = useToast();
    const badgeHtml = `<a href="https://solarinstallerstx.com" target="_blank"><img src="https://solarinstallerstx.com/images/verified-badge.png" alt="Verified on SolarInstallersTX" width="150" height="150"></a>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(badgeHtml);
        toast({ title: "Code Copied!", description: "Add this HTML to your website." });
    };

    return (
        <>
            <SEOHead
                title="Installer Badge | SolarInstallersTX"
                description="Add the SolarInstallersTX verified badge to your website to build trust with potential customers."
                canonicalUrl="https://solarinstallerstx.com/badge"
                robots="noindex, nofollow"
            />
            <div className="min-h-screen bg-background">
                <Header />
                <main className="container mx-auto px-4 py-16 text-center">
                    <h1 className="text-4xl font-bold mb-4">Add Our Badge to Your Site</h1>
                    <h2 className="text-lg text-muted-foreground mb-8">
                        Showcase your commitment to quality by displaying the SolarInstallersTX verified badge.
                    </h2>
                    <div className="flex flex-col items-center gap-4">
                        <Image
                          src="/solar-safety-scored-badge.png"
                          alt="Verified on SolarInstallersTX - Solar Safety Scored Badge"
                          className="w-48 h-auto"
                          width={704}
                          height={368}
                          loading="lazy"
                          sizes="192px"
                        />
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto w-full max-w-lg">
                            <code>{badgeHtml}</code>
                        </pre>
                        <Button onClick={copyToClipboard}>Copy Code</Button>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    )
}

export default BadgeWidgetPage;
