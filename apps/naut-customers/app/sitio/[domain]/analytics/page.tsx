import { H2 } from "@/components/ui/typography"
import { AppCard } from "@/components/app-card"
import { Facebook, Search } from "lucide-react"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import AppForm from "@/components/app-form"
import { handleAnalyticsSubmit } from "@/lib/actions/analytics"
import { db } from "@/db"
import { site } from "@/db/schema"
import { eq } from "drizzle-orm"

export default async function SiteAnalytics( { params }: {
  params: Promise<{
    domain: string;
  }>
} ) {
  const domain = (await params).domain

  const siteInfo = await db.query.site.findFirst({
    where: eq(site.domain, domain)
  })

  const analyticsCards = [
    {
      title: "Meta",
      closedDescription: "Configura el Pixel de Meta para rastrear conversiones",
      openDescription: "Agrega el Pixel de Meta para rastrear conversiones",
      icon: Facebook,
      fields: [
        {
          name: "domain",
          type: "hidden" as const,
          label: "",
          value: domain
        },
        {
          name: "metaId",
          label: "Meta Pixel ID",
          type: "text" as const,
          placeholder: siteInfo?.metaId || "Ingresa el ID del Pixel de Meta",
          description: "Puedes encontrar este ID en tu Meta Business Manager",
          validation: {
            required: true,
            minLength: 5,
          }
        }
      ]
    },
    {
      title: "Google",
      closedDescription: "Configura Google Analytics para analizar el tráfico",
      openDescription: "Agrega Google Analytics para analizar el tráfico",
      icon: Search,
      fields: [
        {
          name: "domain",
          type: "hidden" as const,
          label: "",
          value: domain
        },
        {
          name: "googleId",
          label: "Measurement ID",
          type: "text" as const,
          placeholder: siteInfo?.googleId || "Ingresa el ID de Google Analytics",
          description: "Puedes encontrar este ID en tu cuenta de Google Analytics",
          validation: {
            required: true,
            pattern: "^G-[A-Z0-9]+$"
          }
        }
      ]
    }
  ]
  
  return (
    <div>
      <H2 className="mt-16 ml-12">Analytics</H2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
        {analyticsCards.map((card) => (
          <Drawer key={card.title}>
            <DrawerTrigger asChild>
              <div>
                <AppCard
                  title={card.title}
                  description={card.closedDescription}
                  icon={card.icon}
                />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle>{card.title}</DrawerTitle>
                  <DrawerDescription>{card.openDescription}</DrawerDescription>
                </DrawerHeader>
                <div className="py-8">
                <AppForm
                  fields={card.fields}
                  title={card.title}
                  action={handleAnalyticsSubmit}
                />
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        ))}
      </div>
    </div>
  )
}