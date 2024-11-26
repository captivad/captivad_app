import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "./input";
import { ArrowRight } from "lucide-react";
import LogoForm from "@/public/logo-no-text.svg";

const FormCustomer: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 lg:gap-0 lg:flex-row bg-background rounded-3xl p-[5%] lg:p-20 lg:pb-0 text-foreground">
      <div className="relative w-1/2 flex h-full flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="z-0 w-full h-full flex flex-col gap-10"
        >
          <h2 className="text-[24px] md:text-[60px] lg:font-5xl font-bold">
            Ready to Explore <br /> Digital Ads Potential?
          </h2>
          <p className="text-[16px] lg:text-[24px]">
            Get in touch with us today!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="hidden lg:block z-0 w-full h-full"
        >
          <Image width={462.63} height={428.31} src={LogoForm} alt="" />
        </motion.div>
        <div className="hidden lg:block absolute bottom-0 h-60 w-full bg-gradient-to-t from-background to-transparent"></div>
      </div>
      <form action="" className="flex-1 w-full h-full flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        >
          <Input
            id="name"
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className=""
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
        >
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="Ex: name@mail.com"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className={`flex flex-col gap-2 w-full`}
        >
          <label className=" text-2xl font-semibold " htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            className={`flex min-h-36 w-full border-b-2 border-input outline-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="md:h-16 min-w-56 p-4 bg-foreground rounded-full text-primary md:text-xl font-semibold flex gap-1 items-center justify-center hover:opacity-50 transition-all duration-100"
        >
          Let’s get started
          <ArrowRight size={25} />
        </motion.button>
      </form>
    </div>
  );
};

export default FormCustomer;
