import { H2 } from "@/components/ui/typography";
import { db } from "@/db";
import { eq, and, desc } from "drizzle-orm";
import { cmsType, cmsField, cmsEntryContent, cmsEntry } from "@/db/schema";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis, 
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function cmsTypeHomePage({ params }: {
    params: Promise<{
      domain: string;
      type: string;
      page: string;
    }>
  }) {
    const domain = (await params).domain
    const type = (await params).type
    const page = (await params).page
    const cmsTypeData = await db.select().from(cmsType).where(and(eq(cmsType.uid, type), eq(cmsType.siteDomain, domain)))
    const titleField = await db.select().from(cmsField).where(and(eq(cmsField.cmsTypeId, cmsTypeData[0].id), eq(cmsField.blockPropMappedTo, "title")))
    const entries:any = await db.query.cmsEntry.findMany({
      with: {
        categories: {
          with: {
            category: {
              columns: {
                name: true
              }
            }
          }
        },
        contents: {
          where: eq(cmsEntryContent.cmsFieldId, titleField[0].id),
          columns: {
            value: true
          }
        }
      },
      orderBy: (entries) => [desc(entries.createdAt)],
      limit: 25,
      offset: (parseInt(page) - 1) * 25
    })

    const totalPages = await db.select({ id: cmsEntry.id }).from(cmsEntry).where(eq(cmsEntry.cmsTypeId, cmsTypeData[0].id))
    const totalPagesNumber = Math.ceil(totalPages.length / 25)
    return (
    <div className="w-full mt-16 px-12">
            <div className="flex flex-col gap-6">
                <H2>{cmsTypeData[0].name}</H2>
                <div className="flex justify-end absolute right-12">
                    <Button asChild>
                        <Link href={`/sitio/${domain}/cms/${type}/nuevo`}>
                            <Plus className="h-4 w-4" />
                            Nueva entrada
                        </Link>
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{titleField[0].name}</TableHead>
                            <TableHead>Categoría</TableHead>
                        </TableRow>
                        {entries.map((entry:any) => (
                            console.log(entry),
                            <TableRow key={entry.id}>
                                <TableCell>{entry.contents[0].value.payload}</TableCell>
                                <TableCell>{entry.categories[0].category.name}</TableCell>
                                <TableCell>
                                  <Button asChild>
                                    <Link href={`/sitio/${domain}/cms/${type}/editar/${entry.id}`}>
                                      Editar
                                    </Link>
                                  </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableHeader>
                </Table>
            </div>
            <div className="mt-8 pb-12">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious 
                                href={`/sitio/${domain}/cms/${type}/${Number(page) - 1}`}
                                aria-disabled={Number(page) <= 1}
                                className={Number(page) <= 1 ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>

                        {/* First page */}
                        <PaginationItem>
                            <PaginationLink 
                                href={`/sitio/${domain}/cms/${type}/1`}
                                isActive={page === "1"}
                            >
                                1
                            </PaginationLink>
                        </PaginationItem>

                        {/* Show ellipsis if there are many pages */}
                        {Number(page) > 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Current page */}
                        {Number(page) !== 1 && Number(page) !== totalPagesNumber && (
                            <PaginationItem>
                                <PaginationLink
                                    href={`/sitio/${domain}/cms/${type}/${page}`}
                                    isActive={true}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        {/* Show ellipsis if there are many pages */}
                        {Number(page) < totalPagesNumber - 1 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Last page */}
                        {totalPagesNumber > 1 && (
                            <PaginationItem>
                                <PaginationLink
                                    href={`/sitio/${domain}/cms/${type}/${totalPagesNumber}`}
                                    isActive={Number(page) === totalPagesNumber}
                                >
                                    {totalPagesNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )}

                        <PaginationItem>
                            <PaginationNext
                                href={`/sitio/${domain}/cms/${type}/${Number(page) + 1}`}
                                aria-disabled={Number(page) >= totalPagesNumber}
                                className={Number(page) >= totalPagesNumber ? "pointer-events-none opacity-50" : ""}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
  )
}