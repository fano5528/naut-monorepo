import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { ArrowUpRight } from "lucide-react"

interface AppCardProps {
    title: string
    description: string
    icon: LucideIcon
}

export function AppCard({ title, description, icon: Icon }: AppCardProps) {
    return (
        <Card className="transition-colors cursor-pointer hover:bg-muted relative group">
            <ArrowUpRight className="absolute top-4 right-4 w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-col items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                    <CardTitle className="mt-4 text-xl">{title}</CardTitle>
                    <CardDescription className="mt-1">
                        {description}
                    </CardDescription>
                </div>
            </CardHeader>
        </Card>
    )
} 