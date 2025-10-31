import { db } from "@/db";
import { cmsType, cmsCategory, cmsEntry, cmsEntryCategory, cmsEntryContent, cmsField } from "@naut/schemas";
import { eq, desc, and, isNotNull } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default async function JuanDiegoBlock(props: { typeUid: string, pagination: string }) {

  const page = props.pagination ? parseInt(props.pagination as string) : 1;
  const perPage = page === 1 ? 13 : 12;
  const offset = page === 1 ? 0 : (page - 1) * perPage + 1;

  const cmsTypeData = await db.select().from(cmsType).where(eq(cmsType.uid, props.typeUid));

  // Get all entries with pagination and their categories
  const entryData = await db.select({
    id: cmsEntry.id,
    publishedAt: cmsEntry.publishedAt,
    categoryId: cmsCategory.id,
    categoryName: cmsCategory.name
  })
    .from(cmsEntry)
    .leftJoin(cmsEntryCategory, eq(cmsEntry.id, cmsEntryCategory.cmsEntryId))
    .leftJoin(cmsCategory, eq(cmsEntryCategory.cmsCategoryId, cmsCategory.id))
    .where(and(
      eq(cmsEntry.cmsTypeId, cmsTypeData[0].id),
      isNotNull(cmsEntry.publishedAt)
    ))
    .orderBy(desc(cmsEntry.publishedAt))
    .limit(perPage)
    .offset(offset);

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

  // Get entries with their content
  const entries = await Promise.all(
    entryData.map(async (entry) => {
      const titleData:any = await db.select()
        .from(cmsEntryContent)
        .where(and(
          eq(cmsEntryContent.cmsEntryId, entry.id),
          eq(cmsEntryContent.cmsFieldId, titleField?.id || 0)
        ));

      const thumbnailData:any = await db.select()
        .from(cmsEntryContent)
        .where(and(
          eq(cmsEntryContent.cmsEntryId, entry.id),
          eq(cmsEntryContent.cmsFieldId, thumbnailField?.id || 0)
        ));

      return {
        id: entry.id,
        title: titleData[0]?.value.payload,
        thumbnail: thumbnailData[0]?.value.payload,
        publishedAt: entry.publishedAt,
        categoryId: entry.categoryId,
        categoryName: entry.categoryName || 'Sin categoría'
      };
    })
  );

  // Get total count for pagination
  const totalEntries = await db.select()
    .from(cmsEntry)
    .where(and(
      eq(cmsEntry.cmsTypeId, cmsTypeData[0].id),
      isNotNull(cmsEntry.publishedAt)
    ));

  const totalPages = Math.ceil((totalEntries.length - 1) / 12); // Account for featured post on first page

  return (
    <>
      <div className="px-16 mx-auto mt-12">
        { cmsTypeData[0].tagline ? (
          <>
        <h3 className="text-md font-semibold uppercase tracking-wide text-color2 text-center">
          {cmsTypeData[0].name}
        </h3>
        <h1 className="text-3xl font-bold font-font2 text-color1 text-center sm:text-5xl">
          {cmsTypeData[0].tagline}
        </h1>
        </>
        ) : (
          <h1 className="text-3xl font-bold font-font2 text-color1 text-center sm:text-5xl">
            {cmsTypeData[0].name}
          </h1>
        )}
        <p className="text-center text-text mt-5">
          {cmsTypeData[0].description}
        </p>

        {entries[0] && page === 1 && (
          <Link href={`/cms/entry/${entries[0].id}`} className="block">
            <div className="relative w-full h-[500px] mt-8 overflow-hidden hover:scale-[1.005] shadow-xl duration-200">
              <Image
                src={entries[0].thumbnail || '/placeholder.jpg'}
                alt={entries[0].title}
                fill
                className="object-cover transition-transform duration-300"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium uppercase tracking-wider text-white hover:text-color2">
                      {entries[0].categoryName}
                    </h3>
                  <h2 className="text-3xl font-bold text-white font-font2">
                    {entries[0].title}
                  </h2>
                </div>
              </div>
            </div>
          </Link>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mt-12">
          {entries.slice(page === 1 ? 1 : 0).map((entry) => (
            <div key={entry.id}>
              <Link href={`/cms/entry/${entry.id}`} className="block">
                <div className="relative aspect-[3/2] overflow-hidden shadow-sm hover:scale-[1.01] duration-200">
                  <Image
                    src={entry.thumbnail || '/placeholder.jpg'}
                    alt={entry.title}
                    fill
                    className="object-cover transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="mt-5 space-y-2">
                <Link href={entry.categoryId ? `/cms/category/${entry.categoryId}` : '#'}>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-color2/80 hover:text-color2">
                    {entry.categoryName}
                  </h3>
                </Link>
                <Link href={`/cms/entry/${entry.id}`}>
                  <h2 className="text-xl font-semibold font-font2 text-color1 transition-colors">
                    {entry.title}
                  </h2>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-12 sm:mt-16">
          {/* Previous page button */}
          <Link
            href={`/cms/home/${props.typeUid}/${Math.max(1, page - 1)}`}
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
                      href={`/cms/home/${props.typeUid}/${pageNum}`}
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
                  href={`/cms/home/${props.typeUid}/${pageNum}`}
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
            href={`/cms/home/${props.typeUid}/${Math.min(totalPages, page + 1)}`}
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
      </div>
    </>
  );
}