import BackButton from "@/components/button-back";
import { dateRange } from "@/utils/general";
import moment from "moment";
import Markdown from "react-markdown";
import { fetchDetailArticle } from "../blog.web.service";
import { Metadata } from "next";
import Image from "next/image";
import { metadata } from "@/app/layout";
import { article } from "framer-motion/m";
import { IBlogPost } from "@/app/api/blog/blog.interface";
import NavigateToErrorPage from "@/components/navigate-error";
import ListArticleLatest from "../components/list-article-latest";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  return {
    ...metadata,
    title: `Blog | ${params.slug.split("%20").join(" ")}`,
    description: params.slug.split("%20").join(" "),
  };
}

export default async function BlogDetails({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const id = searchParams.id;

  // Ambil data artikel langsung di komponen
  const article = await fetchDetailArticle(id as string);
  if (!article) {
    return <NavigateToErrorPage />;
  }
  return (
    <>
      <article>
        <div className="relative w-full h-full xl:min-h-[80vh] bg-background flex justify-center pt-44 pb-20 md:pt-60">
          <Image
            className="absolute z-0 top-0 left-0 w-full object-cover"
            priority
            fill
            src={article?.thumbnail_url}
            alt=""
          />
          <div className="z-20 w-full px-[10%] lg:px-20 flex flex-col">
            <div className="flex justify-start mb-6 w-20">
              <BackButton />
            </div>
            <div className="flex justify-start flex-1 lg:mt-10">
              <div className="flex flex-col w-full md:w-[80%] text-center">
                <div className="flex flex-col lg:gap-4 mb-[10%]">
                  <h1 className="text-left">{article?.title}</h1>
                </div>
                <div className="flex gap-6 lg:gap-10 xl:gap-20 w-full justify-start">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Category</h4>
                    {article?.categories?.map((item, index) => (
                      <h6 key={index} className="text-left">
                        {item}
                      </h6>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Author</h4>
                    <h6 className="text-left">{article?.author}</h6>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h4 className="text-left">Date</h4>
                    <h6 className="text-left">
                      {dateRange({
                        createdDt: moment(article?.created_dt).format(
                          "dddd DD MMMM YYYY"
                        ),
                      })}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-20% via-black/60 to-background z-10"></div>
        </div>

        <div className="w-full grid grid-cols-7 gap-10 px-[10%] lg:px-20 pb-20">
          <div className="col-span-7 lg:col-span-5">
            <div
              className="flex flex-col gap-2 lg:gap-4"
              dangerouslySetInnerHTML={{
                __html: article?.main_content || "",
              }}
            ></div>
            <div></div>
          </div>
          <hr className="col-span-7 border-t-2 md:hidden" />
          <div className="col-span-7 lg:col-span-2">
            <h3 className="mb-4">Latest Blog</h3>
            <ListArticleLatest />
          </div>
        </div>
      </article>
    </>
  );
}
