import { db } from "@/db";
import { cmsCategory, cmsEntry, cmsEntryCategory, cmsEntryContent, cmsField, cmsType } from "@naut/schemas";
import { eq, and, desc, isNotNull } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  id: string;
  pagination?: string;
}

export default async function AcutisBlock({ id, pagination }: Props) {
  // Get current page from searchParams or default to 1
  const page = pagination ? parseInt(pagination as string) : 1;
  const perPage = 12;
  const offset = (page - 1) * perPage;

  // Get category data
  const categoryData = await db.select().from(cmsCategory).where(eq(cmsCategory.id, parseInt(id)));

  // Get all entries for this category with pagination
  const entryCategoryData = await db.select()
    .from(cmsEntryCategory)
    .innerJoin(cmsEntry, eq(cmsEntryCategory.cmsEntryId, cmsEntry.id))
    .where(
      and(
        eq(cmsEntryCategory.cmsCategoryId, parseInt(id)),
        isNotNull(cmsEntry.publishedAt)
      )
    )
    .orderBy(desc(cmsEntry.publishedAt))
    .limit(perPage)
    .offset(offset);

  // Get total count for pagination - only count published entries
  const totalEntries = await db.select()
    .from(cmsEntryCategory)
    .innerJoin(cmsEntry, eq(cmsEntryCategory.cmsEntryId, cmsEntry.id))
    .where(
      and(
        eq(cmsEntryCategory.cmsCategoryId, parseInt(id)),
        isNotNull(cmsEntry.publishedAt)
      )
    );

  const totalPages = Math.ceil(totalEntries.length / perPage);

  // Get entry data for each entry
  const entries = await Promise.all(
    entryCategoryData.map(async (entryCategory) => {
      // Get the entry and its type
      const entryData = await db.select()
        .from(cmsEntry)
        .where(eq(cmsEntry.id, entryCategory.cmsEntry.id));

      const cmsTypeData = await db.select()
        .from(cmsType)
        .where(eq(cmsType.id, entryData[0].cmsTypeId));

      // Get all fields for this type
      const cmsFields = await db.select({
        name: cmsField.name,
        blockPropMappedTo: cmsField.blockPropMappedTo,
        id: cmsField.id
      })
        .from(cmsField)
        .where(eq(cmsField.cmsTypeId, cmsTypeData[0].id));

      // Find specific fields
      const titleField = cmsFields.find((field) => field.blockPropMappedTo === "title");
      const thumbnailField = cmsFields.find((field) => field.blockPropMappedTo === "thumbnail");

      // Get content for each field
      const titleData: any = await db.select()
        .from(cmsEntryContent)
        .where(and(
          eq(cmsEntryContent.cmsEntryId, entryData[0].id),
          eq(cmsEntryContent.cmsFieldId, titleField?.id || 0)
        ));

      const thumbnailData: any = await db.select()
        .from(cmsEntryContent)
        .where(and(
          eq(cmsEntryContent.cmsEntryId, entryData[0].id),
          eq(cmsEntryContent.cmsFieldId, thumbnailField?.id || 0)
        ));

      return {
        id: entryData[0].id,
        title: titleData[0]?.value.payload,
        thumbnail: thumbnailData[0]?.value.payload,
        publishedAt: entryData[0].publishedAt,
      };
    })
  );

  return (
    <div className="px-16 mx-auto mt-6">
      <h1 className="text-3xl sm:text-5xl font-bold tracking-tight font-font2 text-color2">{categoryData[0]?.name}{page > 1 && ` - Página ${page}`}</h1>
      <p className="mt-2 text-text">{categoryData[0]?.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:mt-12 sm:gap-12">
        {entries.map((entry) => (
          <div className="flex flex-col gap-4" key={entry.id}>
            <Link href={`/cms/entry/${entry.id}`}>
              <Image src={ entry.thumbnail ? entry.thumbnail as string : "https://internaut.nyc3.cdn.digitaloceanspaces.com/sublime.jpg"} alt={entry.title as string} width={500} height={500} className="w-full shadow-md hover:scale-[1.01] aspect-[3/2] object-cover" />
            </Link>
            <Link href={`/cms/entry/${entry.id}`}>
              <h2 className="text-lg font-semibold font-font2 lg:text-xl">{entry.title}</h2>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8 sm:mt-16">
          {/* Previous page button */}
          <Link
            href={`/cms/category/${id}/${Math.max(1, page - 1)}`}
            className={`px-2 py-2 rounded-full ${
              page === 1
                ? 'text-text/50 cursor-not-allowed'
                : 'text-text hover:bg-text/10'
            }`}
            aria-disabled={page === 1}
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(pageNum => {
              // Always show first and last page
              if (pageNum === 1 || pageNum === totalPages) return true;
              // Show current page and 2 pages before and after
              if (Math.abs(pageNum - page) <= 2) return true;
              return false;
            })
            .map((pageNum, index, array) => {
              // Add ellipsis if there's a gap
              if (index > 0 && pageNum - array[index - 1] > 1) {
                return (
                  <div key={`ellipsis-${pageNum}`} className="flex items-center">
                    <span className="px-4 py-2 text-text">...</span>
                    <Link
                      href={`/cms/category/${id}/${pageNum}`}
                      className={`px-4 py-2 rounded-md ${
                        pageNum === page
                          ? 'bg-color1 text-white'
                          : 'bg-bg2 text-text hover:bg-color1/10'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={pageNum}
                  href={`/cms/category/${id}/${pageNum}`}
                  className={`px-4 py-2 rounded-md ${
                    pageNum === page
                      ? 'bg-color1 text-white'
                      : 'bg-bg2 text-text hover:bg-color1/10'
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}

          {/* Next page button */}
          <Link
            href={`/cms/category/${id}/${Math.min(totalPages, page + 1)}`}
            className={`px-2 py-2 rounded-full ${
              page === totalPages
                ? 'text-text/50 cursor-not-allowed'
                : 'text-text hover:bg-text/10'
            }`}
            aria-disabled={page === totalPages}
          >
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      )}
    </div>
  );
}