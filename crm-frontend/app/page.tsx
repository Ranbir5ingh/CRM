import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Car, Users, FileText } from "lucide-react"

export default function LandingPage() {
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Car className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">VehicleCRM</span>
          </div>
          <Link href="/auth/login">
            <Button variant="outline">Login</Button>
          </Link>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Manage Your Vehicle Rental Business <span className="text-primary">Efficiently</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
              A comprehensive CRM solution designed specifically for vehicle rental companies to streamline operations,
              track vehicles, and manage customers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/login">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Book a Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border">
                <Car className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Vehicle Management</h3>
                <p className="text-muted-foreground">
                  Track your entire fleet, maintenance schedules, and availability in real-time.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Customer Management</h3>
                <p className="text-muted-foreground">
                  Store customer information, rental history, and preferences for personalized service.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <FileText className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Document Management</h3>
                <p className="text-muted-foreground">
                  Digitize and organize all your documents with automatic expiry notifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Increased Efficiency</h3>
                  <p className="text-muted-foreground">Automate routine tasks and focus on growing your business.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Better Customer Experience</h3>
                  <p className="text-muted-foreground">
                    Provide faster service with all information at your fingertips.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Real-time Analytics</h3>
                  <p className="text-muted-foreground">Make data-driven decisions with comprehensive reporting.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold mb-1">Reduced Paperwork</h3>
                  <p className="text-muted-foreground">
                    Go digital and eliminate the hassle of physical document management.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Rental Business?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Join hundreds of rental companies already using our platform to streamline their operations.
            </p>
            <Link href="/auth/login">
              <Button size="lg" className="gap-2">
                Get Started Today <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Car className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">VehicleCRM</span>
            </div>
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} VehicleCRM. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
