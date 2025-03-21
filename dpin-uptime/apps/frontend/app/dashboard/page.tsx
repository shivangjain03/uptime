import Link from "next/link"
import Image from "next/image"
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Cloud,
  Code2,
  Globe,
  LineChart,
  Server,
  Shield,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="dark flex min-h-screen w-full flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full max-w-full flex h-20 items-center justify-between px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex gap-2 items-center text-xl font-bold md:text-2xl">
            <Activity className="h-6 w-6 md:h-7 md:w-7 text-primary" />
            <span>UptimeGuard</span>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="#features"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Testimonials
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                Documentation
              </Link>
            </nav>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden md:inline-flex">
                Log in
              </Button>
              <Button size="sm" className="px-4 py-2 text-base">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-12">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Monitor Your Services with Confidence
                  </h1>
                  <p className="text-lg max-w-[800px] text-muted-foreground md:text-xl">
                    Real-time monitoring, instant alerts, and comprehensive analytics for your websites, APIs, and
                    services.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button className="h-12 px-8 text-base">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" className="h-12 px-8 text-base">
                    View Demo
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm md:text-base text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>99.9% Uptime</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>24/7 Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span>Instant Alerts</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-lg border bg-background p-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-background/0 z-10"></div>
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    width={1200}
                    height={800}
                    alt="Dashboard Preview"
                    className="object-cover"
                  />
                  <div className="absolute bottom-4 left-4 right-4 grid grid-cols-1 sm:grid-cols-3 gap-2 z-20">
                    <div className="flex items-center space-x-2 rounded-md bg-background/80 p-2 backdrop-blur">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div className="text-sm font-medium">All Systems Operational</div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-background/80 p-2 backdrop-blur">
                      <Clock className="h-5 w-5 text-primary" />
                      <div className="text-sm font-medium">Response Time: 120ms</div>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md bg-background/80 p-2 backdrop-blur">
                      <AlertCircle className="h-5 w-5 text-yellow-500" />
                      <div className="text-sm font-medium">1 Alert Pending</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Everything You Need to Stay Online</h2>
                <p className="max-w-[1200px] text-muted-foreground md:text-xl">
                  Comprehensive monitoring tools designed to keep your services running smoothly
                </p>
              </div>
            </div>
            <div className="w-full grid items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Globe className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Website Monitoring</CardTitle>
                  <CardDescription>
                    Monitor your websites for availability, performance, and content changes
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Server className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">API Monitoring</CardTitle>
                  <CardDescription>
                    Track API endpoints for availability, response time, and data integrity
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Real-time Alerts</CardTitle>
                  <CardDescription>
                    Get instant notifications via email, SMS, Slack, or webhook when issues arise
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <LineChart className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Advanced Analytics</CardTitle>
                  <CardDescription>Detailed performance metrics and historical data to identify trends</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Shield className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">SSL Monitoring</CardTitle>
                  <CardDescription>Track SSL certificate expiration and security configuration</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Cloud className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Global Monitoring</CardTitle>
                  <CardDescription>Check your services from multiple locations around the world</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Activity className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Uptime Reporting</CardTitle>
                  <CardDescription>Generate detailed uptime reports and SLA compliance metrics</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">Performance Testing</CardTitle>
                  <CardDescription>Analyze load times and performance bottlenecks across your services</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="w-full grid items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
                  <p className="max-w-[800px] text-muted-foreground md:text-xl">
                    Simple setup, powerful monitoring, and actionable insights in minutes
                  </p>
                </div>
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold">Add Your Endpoints</h3>
                      <p className="text-muted-foreground">
                        Simply enter the URLs you want to monitor and configure check intervals
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold">Configure Alerts</h3>
                      <p className="text-muted-foreground">
                        Set up notification channels and alert conditions based on your needs
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold">Monitor & Respond</h3>
                      <p className="text-muted-foreground">
                        Get alerted when issues occur and use our dashboard to diagnose problems
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full h-[400px] overflow-hidden rounded-lg border bg-background p-2">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    width={1200}
                    height={800}
                    alt="Setup Process"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[1200px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your business
                </p>
              </div>
            </div>
            <div className="w-full grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <div className="text-4xl font-bold">
                    $29<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>Perfect for small websites and personal projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>10 monitors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>5-minute check intervals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Email alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>3 months data retention</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Professional</CardTitle>
                    <div className="rounded-full bg-background/20 px-2 py-1 text-xs font-medium">Popular</div>
                  </div>
                  <div className="text-4xl font-bold">
                    $79<span className="text-sm font-normal opacity-80">/month</span>
                  </div>
                  <CardDescription className="opacity-80">Ideal for businesses with multiple services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>50 monitors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>1-minute check intervals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Email, SMS & Slack alerts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>12 months data retention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>API access</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-background text-primary hover:bg-background/90">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="text-4xl font-bold">
                    $199<span className="text-sm font-normal text-muted-foreground">/month</span>
                  </div>
                  <CardDescription>For large organizations with complex needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Unlimited monitors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>30-second check intervals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>All alert channels + webhooks</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>24 months data retention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Advanced API access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <CardTitle>Custom</CardTitle>
                  <div className="text-4xl font-bold">
                    Contact<span className="text-sm font-normal text-muted-foreground"> for pricing</span>
                  </div>
                  <CardDescription>Tailored solutions for specific requirements</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Custom monitor configurations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Custom check intervals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Custom alert integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Custom data retention</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>White-label options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Contact Sales</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Developers Worldwide</h2>
                <p className="max-w-[1200px] text-muted-foreground md:text-xl">
                  See what our customers have to say about UptimeGuard
                </p>
              </div>
            </div>
            <div className="w-full grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Code2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Sarah Chen</CardTitle>
                      <CardDescription>Lead Developer, TechCorp</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "UptimeGuard has been a game-changer for our team. The instant alerts have helped us resolve issues
                    before our customers even notice them."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Globe className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Mark Johnson</CardTitle>
                      <CardDescription>CTO, E-commerce Platform</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "We've reduced our downtime by 95% since implementing UptimeGuard. The global monitoring gives us
                    confidence that our services are available worldwide."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Alex Rodriguez</CardTitle>
                      <CardDescription>DevOps Engineer, SaaS Startup</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The detailed analytics have helped us identify performance bottlenecks we didn't even know existed.
                    Our site is now faster and more reliable than ever."
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-background/60 backdrop-blur">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Server className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Emma Wilson</CardTitle>
                      <CardDescription>System Administrator, FinTech</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "The customizable dashboards and reporting features have made it easy to demonstrate our uptime
                    improvements to management. Excellent tool!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24 grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Ready to ensure your services never go down?
              </h2>
              <p className="text-lg max-w-[800px] text-muted-foreground md:text-xl/relaxed">
                Join thousands of developers who trust UptimeGuard to keep their services online.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row justify-start lg:justify-end">
              <Button className="h-12 px-8 text-base">Start Free Trial</Button>
              <Button variant="outline" className="h-12 px-8 text-base">
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-8">
        <div className="w-full max-w-full px-6 md:px-10 lg:px-16 xl:px-24 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex gap-2 items-center text-xl font-semibold">
            <Activity className="h-6 w-6 text-primary" />
            <span>UptimeGuard</span>
          </div>
          <p className="text-center text-base text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UptimeGuard. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="text-base text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

