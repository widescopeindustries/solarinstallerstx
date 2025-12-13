import { Metadata } from 'next'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Heart, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us - Texas-Based, Veteran-Owned | Solar Installers TX',
  description: 'SolarInstallersTX.com is a Texas-based, veteran-owned company founded on integrity and service. Learn about our mission to help Texans find trusted solar installers.',
  keywords: ['about solar installers tx', 'veteran owned solar', 'texas solar directory', 'sdvosb solar'],
  openGraph: {
    title: 'About Us - Texas-Based, Veteran-Owned',
    description: 'SolarInstallersTX.com is a Texas-based, veteran-owned company founded on integrity and service.',
    type: 'website',
    url: 'https://solarinstallerstx.com/about',
    images: [
      {
        url: '/opengraph-image.svg',
        width: 1200,
        height: 630,
        alt: 'About Solar Installers TX - Texas-Based, Veteran-Owned',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Texas-Based, Veteran-Owned | Solar Installers TX',
    description: 'SolarInstallersTX.com is a Texas-based, veteran-owned company founded on integrity and service.',
    images: ['/opengraph-image.svg'],
  },
  alternates: {
    canonical: 'https://solarinstallerstx.com/about',
  },
}

const SDVOSB_LOGO_URL = "/images/sba-sdvosb-logo.png"
const OWNER_PORTRAIT_URL = "/images/owner-portrait.jpg"
const SBA_VERIFICATION_URL = "https://veterans.certify.sba.gov/#search"

export default function AboutPage() {
  return (
    <main>
      <div className="bg-background">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
            Texans Serving Texans: Built on a Foundation of Service
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            SolarInstallersTX.com is a Texas-based company dedicated to bringing transparency, quality, and trust to our local solar industry. We&apos;re not a faceless national directory; we&apos;re your neighbors, committed to empowering fellow Texans to make confident energy decisions.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Our Mission</h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              To empower Texas homeowners with reliable, unbiased information and connect them with the most qualified,
              certified solar installers in the state. We believe in <strong className="text-foreground">integrity, service,
              and a transparent process</strong> — because choosing solar is one of the most important investments you&apos;ll make
              for your home and your future.
            </p>
            <div className="mt-8 inline-flex items-center gap-2 bg-background/80 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Serving Texas with Honor and Transparency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Veteran-Owned Section */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
              A Service-Disabled Veteran-Owned Small Business
            </h2>

            <Card className="overflow-hidden shadow-xl border-2 border-primary/20">
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-br from-primary/10 to-primary/20 p-12 flex flex-col items-center justify-center">
                  <Image
                    src={SDVOSB_LOGO_URL}
                    alt="SBA Certified Service-Disabled Veteran-Owned Small Business Logo"
                    className="w-48 h-48 mb-6"
                    width={240}
                    height={300}
                    loading="lazy"
                    sizes="192px"
                  />
                  <a
                    href={SBA_VERIFICATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-center text-primary hover:underline font-semibold flex items-center gap-2"
                  >
                    <Award className="h-5 w-5" />
                    Verify Our Certification
                  </a>
                </div>
                <div className="md:w-3/5 p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="flex-1">
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                        SolarInstallersTX.com is proudly owned and operated by{" "}
                        <strong className="font-semibold text-foreground">Widescope Industries LLC</strong>,
                        a Texas-based, Service-Disabled Veteran-Owned Small Business (SDVOSB) officially certified
                        by the U.S. Small Business Administration (SBA).
                      </p>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                        This certification is more than a credential — it&apos;s a reflection of our core values:{" "}
                        <strong className="font-semibold text-foreground">integrity, discipline, and an unwavering
                        commitment to service</strong>. These are the principles that guide our mission to serve the
                        Texas community with honor and transparency.
                      </p>
                    </div>
                    <div className="flex flex-col items-center md:items-start">
                      <Image
                        src={OWNER_PORTRAIT_URL}
                        alt="Owner Portrait - Veteran Service-Disabled Business Owner"
                        className="w-56 h-auto rounded-lg shadow-lg mb-3"
                        width={720}
                        height={1560}
                        loading="lazy"
                        sizes="224px"
                        quality={90}
                      />
                      <p className="text-sm text-center md:text-left text-muted-foreground italic max-w-[224px]">
                        &quot;New Uniform, New Mission, Same Honor and Integrity throughout.&quot;
                      </p>
                    </div>
                  </div>
                  <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
                    <p className="text-sm md:text-base text-foreground font-medium">
                      When you use our service, you&apos;re supporting a veteran-owned business dedicated to serving
                      our fellow Texans with the same commitment to excellence that defined our military service.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-muted/40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">What Drives Us</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Purpose</h3>
                <p className="text-muted-foreground">
                  To provide Texans with a comprehensive, unbiased, and free resource to find trusted local solar installers.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Award className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Values</h3>
                <p className="text-muted-foreground">
                  Honesty, transparency, and a commitment to quality. We operate with the same integrity that defines our veteran leadership.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Our Community</h3>
                <p className="text-muted-foreground">
                  We are Texans serving Texans. Our goal is to strengthen our local communities by promoting clean energy and supporting local businesses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
