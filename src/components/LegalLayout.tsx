import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShieldCheck, FileText, Scale, CreditCard } from "lucide-react"

interface LegalLayoutProps {
    title: string
    lastUpdated: string
    children: React.ReactNode
}

export function LegalLayout({ title, lastUpdated, children }: LegalLayoutProps) {
    const sidebarLinks = [
        { name: 'Privacy Policy', href: '/privacy', icon: ShieldCheck },
        { name: 'Terms of Service', href: '/terms', icon: FileText },
        { name: 'Refund Policy', href: '/refund', icon: CreditCard },
    ]

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
            <div className="grid md:grid-cols-[300px_1fr] gap-12">
                {/* Sidebar */}
                <aside className="hidden md:block">
                    <div className="sticky top-24 space-y-6">
                        <div className="space-y-1">
                            <h3 className="font-bold text-lg mb-4 px-4">Legal Information</h3>
                            {sidebarLinks.map((link) => (
                                <Button
                                    key={link.href}
                                    variant="ghost"
                                    asChild
                                    className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted"
                                >
                                    <Link href={link.href}>
                                        <link.icon className="h-4 w-4" />
                                        {link.name}
                                    </Link>
                                </Button>
                            ))}
                        </div>

                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-6">
                                <h4 className="font-semibold mb-2">Contact Legal</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Questions about our policies? Contact our compliance team.
                                </p>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium">Solar Installers TX</p>
                                    <p className="text-sm text-muted-foreground">info@solarinstallerstx.com</p>
                                    <p className="text-sm text-muted-foreground">(682) 999-0953</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </aside>

                {/* Content */}
                <main>
                    <div className="mb-10 border-b pb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900 dark:text-slate-100">{title}</h1>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                            <p>Last Updated: <span className="font-medium text-foreground">{lastUpdated}</span></p>
                        </div>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 dark:prose-headings:text-slate-100
            prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-li:text-slate-600 dark:prose-li:text-slate-300
            prose-strong:text-slate-900 dark:prose-strong:text-slate-100">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
