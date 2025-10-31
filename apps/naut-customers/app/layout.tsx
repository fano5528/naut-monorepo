import "@/public/fontawesome/fontawesome.css"; // Icons
import "@/public/fontawesome/solid.css"; // Icons
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { esES } from '@clerk/localizations'
import { H1 } from "@/components/ui/typography";
import Image from "next/image";
import { bergern, dmMono } from "@/fonts/fonts";
import { Toaster } from "@/components/ui/toaster";

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      localization={esES}
      signInUrl="/iniciar-sesion"
      signUpUrl="/registrarse"
      appearance={{
        variables: {
          colorPrimary: "#2adf94",
        },
      }}
    >
      <html lang="en" className={`${bergern.variable} ${dmMono.variable}`}>
        <body>
          <div className="hidden lg:block">
            {children}
          </div>
          <div className="block lg:hidden">
            <div className="z-50 flex flex-col items-center justify-center absolute inset-0 bg-black p-10">
              <Image className="h-12 w-auto" src="https://internaut.nyc3.cdn.digitaloceanspaces.com/naut.mx/favicon.ico" alt="Logo" width={1000} height={1000} />
              <H1 className="text-white mt-10 text-center">Tenemos un pequeño problema...</H1>
              <p className="text-white mt-2 text-center">Actualmente, Naut no está disponible en dispositivos móviles. Por favor, accede desde un dispositivo con pantalla grande.</p>
            </div>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
