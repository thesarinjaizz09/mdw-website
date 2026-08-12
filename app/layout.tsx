"use client";
import { Geist, Geist_Mono, IBM_Plex_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/providers/auth-provider"
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { WhatsAppFloater } from "@/components/whatsapp-floater";

const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], variable: '--font-sans' })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased h-full", fontMono.variable, "font-sans", ibmPlexSans.variable, "bg-background text-foreground")}
    >
      <head>
        <link rel="icon" href="/mdw-favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
       <div className="flex-1 flex flex-col">
         <TooltipProvider>
           <QueryProvider>
             <AuthProvider>
               <ThemeProvider>{children}</ThemeProvider>
             </AuthProvider>
           </QueryProvider>
         </TooltipProvider>
         {/* Toaster should be rendered without children */}
         <Toaster />
         <WhatsAppFloater />
       </div>
      </body>
    </html>
  )
}
