import { H2 } from "@/components/ui/typography"
import { db } from "@/db"
import { page } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ArrowRight, SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"

export default async function SiteEditor({ params }: {
    params: Promise<{
      domain: string;
    }>
  }) {
    const domain = (await params).domain
    const pagesInSite = await db.select().from(page).where(eq(page.siteDomain, domain))

    return (
        <div className="w-full mt-16 px-12">
            <div className="flex flex-col gap-6">
                <H2>Páginas editables</H2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Título</TableHead>
                            <TableHead>Ruta</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pagesInSite.map((page) => (
                            <TableRow key={page.id}>
                                <TableCell className="font-semibold">{page.title}</TableCell>
                                <TableCell className="font-mono font-medium text-xs">
                                    <Link target="_blank" href={`https://${domain}${page.route}`} className="underline bg-slate-200 p-1.5 rounded-sm gap-2">
                                        https://{domain}{page.route}
                                        <SquareArrowOutUpRight className="h-3 w-3 inline ml-1" />
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="link"
                                        size="sm"
                                        asChild
                                        className="hover:bg-transparent"
                                    >
                                        <Link
                                            href={`/editor/${domain}${page.route}`}
                                            className="flex items-center gap-2"
                                        >
                                            Editar
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {pagesInSite.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    No hay páginas creadas
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}