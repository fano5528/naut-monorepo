import { H2 } from "@/components/ui/typography"
import { BarChart2, Pencil } from "lucide-react"
import { LucideIcon } from "lucide-react"
import Link from "next/link"
import { AppCard } from "@/components/app-card"

interface SiteHomeProps {
    params: Promise<{
        domain: string
    }>
}

interface SiteCard {
    title: string
    description: string
    href: string
    icon: LucideIcon
}

const siteCards: SiteCard[] = [
    {
        title: "Editor",
        description: "Personaliza tu sitio web: edita contenido, cambia el diseño y gestiona tus páginas",
        href: "paginas",
        icon: Pencil
    },
    {
        title: "Analytics",
        description: "Analiza el rendimiento de tu sitio: visitas, interacciones y comportamiento de usuarios",
        href: "analytics",
        icon: BarChart2
    }
]

export default async function SiteHome({ params }: SiteHomeProps) {
    const { domain } = await params

    return (
        <>
            <H2 className="mt-16 ml-12">Inicio</H2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-10">
                {siteCards.map((card) => (
                    <Link key={card.href} href={`/sitio/${domain}/${card.href}`}>
                        <AppCard
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                        />
                    </Link>
                ))}
            </div>
        </>
    )
}
