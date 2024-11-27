import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "./input";
import { ArrowRight } from "lucide-react";
import LogoForm from "@/public/logo-no-text.svg";
import MultiSelect, { IMultiselectOption } from "./multi-select";

const multiselectOptions: IMultiselectOption[] = [
  { id: 1, value: "option1", label: "Option 1" },
  { id: 2, value: "option2", label: "Option 2" },
  { id: 3, value: "option3", label: "Option 3" },
  { id: 4, value: "option4", label: "Option 4" },
  { id: 5, value: "option5", label: "Option 5" },
  { id: 6, value: "option6", label: "Option 6" },
  { id: 7, value: "option7", label: "Option 7" },
  { id: 8, value: "option8", label: "Option 8" },
  { id: 9, value: "option9", label: "Option 9" },
  { id: 10, value: "option10", label: "Option 10" },
];

const FormCustomer: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col gap-4 lg:gap-0 lg:flex-row bg-background rounded-3xl p-[10%] lg:p-20 text-foreground">
      <div className="relative w-full lg:w-1/2 flex h-full flex-col justify-between lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="z-0 w-full h-full flex flex-col gap-10"
        >
          <h1 className="font-bold">
            Ready to Explore <br /> Digital Ads Potential?
          </h1>
          <p>Get in touch with us today!</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="hidden lg:block z-0 w-full h-full mt-10"
        >
          <Image width={462.63} height={428.31} src={LogoForm} alt="" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="absolute w-full h-[300px] lg:hidden top-0 right-0"
        >
          <Image
            fill
            objectFit="cover"
            src={LogoForm}
            alt=""
            className="opacity-20"
          />
          <div className="absolute -bottom-0 h-60 w-full bg-gradient-to-t from-background from-30% via-background/70 to-transparent"></div>
        </motion.div>
        <div className="hidden lg:block absolute -bottom-16 h-60 w-full bg-gradient-to-t from-background via-background via-50% to-transparent"></div>
      </div>
      <motion.form
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        action=""
        className="flex-1 w-full h-full flex flex-col gap-6 lg:gap-10"
      >
        <div>
          <Input
            id="name"
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className=""
          />
        </div>
        <div>
          <Input
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="Ex: name@mail.com"
          />
        </div>
        <div>
          <MultiSelect options={multiselectOptions} />
        </div>
        <div className={`flex flex-col gap-2 w-full`}>
          <label className="font-semibold " htmlFor="message">
            <h4>Message</h4>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Enter your message"
            className={`z-10 text-[14px] md:text-[16px] lg:text-[20px] flex min-h-36 w-full border-b-2 border-input outline-none bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>
        <button className="md:h-16 min-w-56 p-4 bg-foreground rounded-full text-primary md:text-xl font-semibold flex gap-1 items-center justify-center hover:opacity-50 transition-all duration-100">
          Let’s get started
          <ArrowRight size={25} />
        </button>
      </motion.form>
    </div>
  );
};

export default FormCustomer;
