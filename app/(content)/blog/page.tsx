import FormCustomer from "@/components/form-customer";
import ButtonNavigation from "@/components/button-navigation";
import { PencilLine } from "lucide-react";
import Search from "@/components/search";
import { BLOG_DASHBOARD } from "@/utils/router";
import NavbarCategory from "./components/navbar-category";
import SearchResult from "./components/search-result";
import ListArticle from "./components/list-article";

export default function Blog() {
  return (
    <>
      <section
        id="section-intro"
        className="relative w-full min-h-[200px] lg:min-h-[50vh] xl:min-h-[60vh] bg-background flex justify-start md:pt-0 md:items-center"
      >
        <div className="w-full md:w-[85%] text-center z-20 px-[10%] lg:px-20 pt-24 lg:pt-44">
          <h1 className="text-center md:text-left">
            Stay Ahead with Digital Marketing,{" "}
            <br className="hidden md:block" />
            Office Life, and CaptivAd Updates
          </h1>
          <h4 className="my-6 text-center md:text-left">
            Explore your potential with Maizen is <br />
            mindful insights and inspiring stories
          </h4>
        </div>
        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-background from-10% via-black/80 to-background z-10"></div>
      </section>

      <section className="px-[10%] lg:px-20 ">
        <ButtonNavigation
          redirect={BLOG_DASHBOARD}
          className=" md:max-w-60 rounden-box "
        >
          <PencilLine size={25} />
          Write a Article
        </ButtonNavigation>
      </section>

      <article id="section-content" className="p-[10%] lg:p-20">
        <div className="flex gap-4 justify-between flex-col lg:flex-row">
          <NavbarCategory />
          <Search className="lg:w-1/4 max-h-12" />
        </div>
        <SearchResult />
        <ListArticle />
      </article>

      <section id="form" className="lg:h-full p-[5%] lg:p-20 bg-foreground">
        <FormCustomer />
      </section>
    </>
  );
}
