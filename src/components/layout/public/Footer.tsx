import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50 dark:bg-slate-950 text-muted-foreground">
      <div className="container px-4 py-10 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1: Brand Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-lg text-foreground">
            <Image
              src="/logo.jpg"
              alt="City Service Portal"
              width={32}
              height={32}
              className="rounded-md object-contain"
            />
            <span className="text-green-600 font-extrabold">City Service</span>
          </div>
          <p className="text-xs leading-relaxed">
            Empowering citizens to report issues, request municipal services, and build a cleaner, safer city together.
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Quick Links</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">All Services</Link></li>
            <li><Link href="/public-requests" className="hover:underline">Public Complaints</Link></li>
            <li><Link href="/about" className="hover:underline">About Smart City</Link></li>
          </ul>
        </div>

        {/* Col 3: Services */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Services</h4>
          <ul className="space-y-2 text-xs">
            <li><span>Waste Management (Free)</span></li>
            <li><span>Street Light Repair (Free)</span></li>
            <li><span>Plumbing & Drainage (Paid)</span></li>
            <li><span>Road Maintenance (Free)</span></li>
          </ul>
        </div>

        {/* Col 4: Emergency / Support */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Emergency Hotline</h4>
          <p className="text-xs">Hotline: 16108 (Toll Free)</p>
          <p className="text-xs">Support: support@cityservice.gov.bd</p>
          <p className="text-xs">Available 24/7 for citizen support</p>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs">
        © {new Date().getFullYear()} City Service Portal. All rights reserved.
      </div>
    </footer>
  );
}