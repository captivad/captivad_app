"use client";

import { useGetBlogPost } from "../blog.web.service";
import CardBlog from "./card-blog";

const ListArticleLatest: React.FC = () => {
  const { data: listArticle, isLoading } = useGetBlogPost({
    page: 1,
    search: "",
    category: "",
    size: 3,
  });

  return (
    <div className="bg-[#242424] rounded-box p-2">
      {!isLoading &&
        listArticle?.rows.map((item, index) => {
          return <CardBlog key={index} content={item} image={false} />;
        })}
    </div>
  );
};

export default ListArticleLatest;
