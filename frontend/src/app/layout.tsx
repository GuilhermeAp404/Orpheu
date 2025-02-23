import type { Metadata } from "next";
import "./globals.scss";
import { AuthProvider } from "@/providers/auth";
import {Toaster} from 'sonner'

export const metadata: Metadata = {
  title: "Orpheu",
  description: "Gerenciador para pequenos negocios",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <main>
          <Toaster richColors={true} position="top-center" expand={true}/>
          <AuthProvider>
            {children}
          </AuthProvider>
        </main>
      </body>
    </html>
  );
}
