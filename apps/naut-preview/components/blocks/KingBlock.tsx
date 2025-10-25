import Image from "next/image";
import Headerlink from "../headerlink/Headerlink";
import Link from "../headerlink/Headerlink";
import Text from "../text/Text";
import { eq, desc, and, isNotNull } from "drizzle-orm";
import { db } from "@/db";
import { cmsEntry, cmsEntryCategory, cmsEntryContent, cmsCategory, cmsType, cmsField } from "@/db/schema";

// Add revalidation every minute
export const revalidate = 60;

export interface Props {
  title: string;
  subtitle: string;
  ctaText: string;
  typeUid: string;
  domain: string;
  edit: boolean;
  reference: any;
}

export default async function KingBlock(props: Props) {
  // Get blog type ID first
  const blogType = await db.select().from(cmsType).where(and(eq(cmsType.uid, props.typeUid), eq(cmsType.siteDomain, props.domain)));

  if (!blogType) {
    throw new Error("Blog type not found");
  }

  const postsInDb = await db.select().from(cmsEntry).where(and(eq(cmsEntry.cmsTypeId, blogType[0].id), isNotNull(cmsEntry.publishedAt))).orderBy(desc(cmsEntry.createdAt)).limit(4);

  const fields = await db.select().from(cmsField).where(eq(cmsField.cmsTypeId, blogType[0].id));
  const fullPosts: any[] = [];

  for (const post of postsInDb) {
    const contents: any = {};
    const category = await db.select({ cmsCategoryName: cmsCategory.name }).from(cmsEntryCategory).innerJoin(cmsCategory, eq(cmsEntryCategory.cmsCategoryId, cmsCategory.id)).where(eq(cmsEntryCategory.cmsEntryId, post.id));
    for (const field of fields) {
      const content: any = await db.select({ value: cmsEntryContent.value }).from(cmsEntryContent).where(and(eq(cmsEntryContent.cmsEntryId, post.id), eq(cmsEntryContent.cmsFieldId, field.id)));
      contents[field.uid] = content[0] ? content[0].value.payload : null;
    }
    fullPosts.push({
      id: post.id,
      title: contents.title,
      image: contents.thumbnail || "https://internaut.nyc3.cdn.digitaloceanspaces.com/sublime.jpg",
      category: category[0].cmsCategoryName,
    });
  }


  return (
    <div className="w-complete sm:w-complete-sm mt-16 sm:mt-24 mx-auto">
      <Text className="text-md sm:text-lg font-bold text-color2 w-full" name={props.reference.subtitle} edit={props.edit}>
        {props.subtitle}
      </Text>
      <Text className="text-3xl sm:text-5xl font-bold text-color1 mt-4 font-font2 mb-12 w-full" name={props.reference.title} edit={props.edit}>
        {props.title}
      </Text>

      <div className="h-auto lg:h-[600px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] xl:grid-cols-2 gap-12 lg:gap-6 lg:grid-rows-3 max-w-7xl">

        <Link
          href={`/cms/entry/${fullPosts[0].id}`}
          edit={props.edit}
          className="hidden lg:block w-full aspect-square h-auto lg:w-auto lg:aspect-auto relative hover:scale-[101%] lg:row-span-3"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${fullPosts[0].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <p className="text-xs uppercase tracking-wide">{fullPosts[0].category}</p>
            <h2 className="text-2xl font-bold mt-2 font-font2">{fullPosts[0].title}</h2>
          </div>
        </Link>


        {fullPosts.map((post, index) => (
          <div
            key={index}
            className={`flex gap-4 flex-col lg:flex-row ${index === 0 ? "lg:hidden" : ""
              }`}
          >
            <Link edit={props.edit} href={`/cms/entry/${post.id}`} className="h-full lg:flex-shrink-0">
              <Image
                className="aspect-[3/2] object-cover w-full lg:h-full lg:w-auto hover:scale-[102%]"
                src={post.image}
                alt={post.title}
                width={1000}
                height={1000}
              />
            </Link>
            <div className="flex flex-col justify-start">
              <p className="font-medium text-xs text-color2 uppercase tracking-wide">{post.category}</p>
              <Link edit={props.edit} href={`/cms/entry/${post.id}`} className="text-lg font-bold text-color1 group-hover:text-color2 transition-colors mt-1 leading-[1.5]">
                {post.title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6 lg:mt-12">
        <Headerlink
          edit={props.edit}
          href={`/cms/home/${props.typeUid}`}
          className="group inline-flex items-center gap-3 text-color2 hover:text-color2 font-medium"
        >
          <Text className="group inline-flex items-center gap-3 text-color2 hover:text-color2 font-medium" name={props.reference.ctaText} edit={props.edit}>{props.ctaText}</Text>
          <div className="w-8 h-8 rounded-full border-2 border-color2 flex items-center justify-center group-hover:bg-color2/40 transform group-hover:translate-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Headerlink>
      </div>
    </div>
  );
}