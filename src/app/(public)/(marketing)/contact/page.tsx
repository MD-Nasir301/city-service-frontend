import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  Clock,
  Send,
  Sparkles,
  HelpCircle,
  HardHat,
} from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Under Construction Banner */}
      <div className="max-w-5xl mx-auto bg-amber-200 border border-amber-200 rounded-xl p-4 flex items-center gap-3 text-amber-800 shadow-sm">
        <div className="size-9 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 text-amber-700">
          <HardHat className="size-5" />
        </div>
        <div className="text-xs sm:text-sm">
          <p className="font-bold">Page Under Development. Coming Soon . . .</p>
          <p className="text-amber-700/80">
            This contact form is currently in demo mode. Messaging and backend
            API integration are under active construction.
          </p>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3">
        <Badge
          variant="outline"
          className="bg-indigo-50 text-indigo-700 border-indigo-200 px-3 py-1 rounded-full text-xs font-semibold"
        >
          <Sparkles className="size-3.5 mr-1.5 inline" /> Get In Touch
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          How Can <span className="text-violet-500">We Help You </span> Today?
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Have questions regarding civic services, service tracking, or online
          payments? Send us a message and our team will assist you.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info Cards Column */}
        <div className="space-y-4">
          <Card className="border-indigo-100 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="size-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Clock className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  Working Hours
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sunday - Thursday: 9:00 AM - 5:00 PM
                  <br />
                  Emergency services remain 24/7 active.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-emerald-100 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="size-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  Email Support
                </h3>
                <p className="text-xs text-slate-500">
                  support@smartcity.gov.bd
                  <br />
                  Expected response within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-100 shadow-sm">
            <CardContent className="p-5 flex items-start gap-4">
              <div className="size-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="size-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-slate-800 text-sm">
                  Helpline Center
                </h3>
                <p className="text-xs text-slate-500">
                  Toll-Free Hotline: 16123
                  <br />
                  Citizen Service Desk: +880 2 9966-0000
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick FAQ Box */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
              <HelpCircle className="size-4" /> Need Quick Answers?
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Check out your citizen dashboard to view real-time request
              statuses or complete pending payments instantly via Stripe.
            </p>
          </div>
        </div>

        {/* Contact Form Column */}
        <Card className="lg:col-span-2 border shadow-sm">
          <CardHeader className="border-b bg-slate-50/50">
            <CardTitle className="text-lg font-bold text-slate-800">
              Send Us a Direct Message
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-700">
                    Your Full Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    className="h-10 text-xs"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-700">
                    Your Email Address
                  </Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    className="h-10 text-xs"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Subject
                </Label>
                <Input
                  type="text"
                  placeholder="e.g. Inquiry regarding Road Repair Request #102"
                  className="h-10 text-xs"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-700">
                  Your Message
                </Label>
                <Textarea
                  placeholder="Write down your detailed query or message here..."
                  rows={5}
                  className="text-xs resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs px-6 h-10"
              >
                <Send className="size-3.5 mr-2" /> Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
