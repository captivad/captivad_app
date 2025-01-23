import CardBlog from "@/app/(content)/blog/components/card-blog";
import FormCustomer from "@/components/form-customer";
import moment from "moment";
import { IBlogContent } from "./blog.interface";
import ButtonNavigation from "@/components/button-navigation";
import { PencilLine } from "lucide-react";
import Search from "@/components/search";

const dataDamiBlog: IBlogContent[] = [
  {
    uuid: "cedcebdf-d369-4d2e-9e2b-2b2c8f43d578",
    title:
      "A/B Testing Adalah: Pengertian, Fungsi, dan Pentingnya Dalam Digital Marketing",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472837/Frame_45_h4dojr.png",
    createdDt: moment().toISOString(),
    category: "marketing",
  },
  {
    uuid: "fcd73283-48b7-431f-9d12-843481eeb009",
    title: "UGC: Apa Itu dan Pentingnya dalam Strategi Marketing",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472838/image_18_p2w7av.png",
    createdDt: moment().subtract(1, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "60e7e5dd-d87f-46af-9769-21b4d276b6b7",
    title:
      "TikTok Ads: Pengertian, Jenis, Cara Kerja, dan Tips Beriklan Efektif CaptivAd Team . 25 Oct",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472829/image_19_tlvepu.png",
    createdDt: moment().subtract(4, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "19643159-3c28-4cc6-8f80-8539eeddc465",
    title: "OOH: Strategi Pemasaran Offline, Apa Tetap Efektif di Era Digital?",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733473738/image_20_kuuu37.png",
    createdDt: moment().subtract(1, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "324cbe43-3db5-4ead-bfcf-b67d6d5ed3df",
    title: "Micro Influencers: Pengaruh Besar dari Jumlah Pengikut yang Kecil",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472830/image_21_crow5x.png",
    createdDt: moment().subtract(2, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "324cbe43-3db5-4ead-bfcf-b67d6d5ed3df",
    title: "Micro Influencers: Pengaruh Besar dari Jumlah Pengikut yang Kecil",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472830/image_21_crow5x.png",
    createdDt: moment().subtract(2, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "324cbe43-3db5-4ead-bfcf-b67d6d5ed3df",
    title: "Micro Influencers: Pengaruh Besar dari Jumlah Pengikut yang Kecil",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472830/image_21_crow5x.png",
    createdDt: moment().subtract(2, "day").toISOString(),
    category: "marketing",
  },
  {
    uuid: "324cbe43-3db5-4ead-bfcf-b67d6d5ed3df",
    title: "Micro Influencers: Pengaruh Besar dari Jumlah Pengikut yang Kecil",
    content:
      "Dalam dunia digital marketing, influencer marketing telah menjadi strategi yang populer untuk meningkatkan brand awareness dan engagement. Namun, tidak semua influencer memiliki jangkauan dan dampak yang sama. Salah satu kategori yang semakin populer adalah micro influencers. Artikel ini akan membahas apa itu micro influencers, perbedaannya dengan jenis influencer lainnya, serta kelebihan dan kekurangannya.",
    imageUrl:
      "https://res.cloudinary.com/dlvyzfhj2/image/upload/v1733472830/image_21_crow5x.png",
    createdDt: moment().subtract(2, "day").toISOString(),
    category: "marketing",
  },
];

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
          redirect={"/blog"}
          className=" md:max-w-60 rounden-box "
        >
          <PencilLine size={25} />
          Write a Article
        </ButtonNavigation>
      </section>

      <article className="p-[10%] lg:p-20">
        <div className="flex gap-4 justify-between flex-col lg:flex-row">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <button className="btn btn-ghost btn-sm lg:btn-md btn-active">
              <p>Highlights</p>
            </button>
            <button className="btn btn-ghost btn-sm lg:btn-md">
              <p>All</p>
            </button>
            <button className="btn btn-ghost btn-sm lg:btn-md">
              <p>Marketing</p>
            </button>
            <button className="btn btn-ghost btn-sm lg:btn-md">
              <p>News</p>
            </button>
            <button className="btn btn-ghost btn-sm lg:btn-md">
              <p>Online Tren</p>
            </button>
          </div>
          <Search className="lg:w-1/4" />
        </div>
        <div className="grid grid-cols-6 gap-2 md:gap-6 w-full justify-center py-[5%]">
          {dataDamiBlog.map((item, index) => {
            if (index === 0 || index === 1) {
              return (
                <CardBlog
                  key={index}
                  content={item}
                  className="col-span-6 md:col-span-3"
                />
              );
            }

            return (
              <CardBlog
                key={index}
                content={item}
                className="col-span-6 md:col-span-2"
              />
            );
          })}
        </div>
      </article>

      <section id="form" className="lg:h-full p-[5%] lg:p-20 bg-foreground">
        <FormCustomer />
      </section>
    </>
  );
}
