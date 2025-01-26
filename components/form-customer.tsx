"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Input } from "./input";
import { ArrowRight } from "lucide-react";
import LogoForm from "@/public/logo-no-text.svg";
import MultiSelect, { IMultiselectOption } from "./multi-select";

import { useFormik } from "formik";
import * as Yup from "yup";
import { IPayloadSendEmail } from "@/app/api/email-provider/email-provider.interface";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useGetCategory } from "@/app/(content)/our-works/our-work.web.service";

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

const validationSchema: Yup.Schema<IPayloadSendEmail> = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  interests: Yup.string().required("Interest is required"),
  message: Yup.string().required("Message is required"),
});

const FormCustomer: React.FC = () => {
  //list category options
  const { data: listCategory } = useGetCategory();
  const categoryOptions = React.useMemo(() => {
    if (!listCategory) return [];
    return listCategory?.map((item, _i) => ({
      id: _i,
      value: String(item.id),
      label: item.name,
    }));
  }, [listCategory]);

  const [interestSelected, setInterestSelected] = React.useState<
    IMultiselectOption[]
  >([]);
  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    isSubmitting,
    resetForm,
  } = useFormik<IPayloadSendEmail>({
    initialValues: {
      name: "",
      email: "",
      interests: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      setInterestSelected([]);
      try {
        await axios.post("/api/email-provider", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Send email successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Send email failed!");
      }
      resetForm();
    },
  });

  // console.log(values, "values");

  return (
    <div className="relative h-full w-full flex flex-col gap-4 lg:gap-10 lg:flex-row bg-background rounded-3xl p-[5%] lg:p-20 pb-0 text-foreground overflow-hidden">
      <div className="w-full lg:w-1/2 flex h-full flex-col justify-between lg:overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="z-0 w-full h-full flex flex-col gap-4 lg:gap-10 text-center lg:text-left"
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
          className="hidden lg:block z-0 w-full h-full mt-24"
        >
          <Image width={462.63} height={428.31} src={LogoForm} alt="" />
          <div className="absolute -bottom-0 h-60 w-full bg-gradient-to-t from-background from-10% via-background/70 to-transparent"></div>
        </motion.div>
      </div>
      <motion.form
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="flex-1 w-full h-full flex flex-col gap-6 lg:gap-10 z-10"
        onSubmit={handleSubmit}
      >
        <div>
          <Input
            onChange={handleChange}
            value={values.name}
            id="name"
            label="Name"
            type="text"
            name="name"
            placeholder="Enter your name"
            className={`${errors.name && touched.name ? "border-red-500" : ""}`}
          />
        </div>
        <div>
          <Input
            onChange={handleChange}
            value={values.email}
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder="Ex: name@mail.com"
            className={`${
              errors.email && touched.email ? "border-red-500" : ""
            }`}
          />
        </div>
        <div>
          <MultiSelect
            options={categoryOptions}
            onChange={(selected) => {
              setInterestSelected(selected);
              setFieldValue(
                "interests",
                selected.map((item) => item.value).join(",")
              );
            }}
            value={interestSelected}
            errors={
              errors.interests && touched.interests ? errors.interests : ""
            }
          />
        </div>
        <div className={`flex flex-col gap-2 w-full`}>
          <label className="font-semibold " htmlFor="message">
            <h4>Message</h4>
          </label>
          <textarea
            onChange={handleChange}
            value={values.message}
            id="message"
            name="message"
            placeholder="Enter your message"
            className={`${
              errors.message && touched.message ? "border-red-500" : ""
            } z-10 text-[14px] md:text-[16px] lg:text-[20px] flex min-h-36 w-full border-b-2 border-input outline-none bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50`}
          />
        </div>
        <div className="w-full flex justify-center my-10 lg:my-0">
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 md:h-16 min-w-44 max-w-44 md:min-w-52 md:max-w-52 lg:w-full lg:max-w-full p-4 bg-foreground rounded-full text-primary text-sm md:text-xl font-semibold flex gap-1 items-center justify-center hover:opacity-50 transition-all duration-100"
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <p className="flex items-center gap-2">
                Send Inquery
                <ArrowRight className="w-6 aspect-square" />
              </p>
            )}
          </button>
        </div>
      </motion.form>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="absolute flex justify-center w-full h-[300px] lg:hidden -bottom-20 m-auto mr-0 right-0 left-0 z-0"
      >
        <Image
          width={600}
          height={600}
          priority
          src={LogoForm}
          alt=""
          className="opacity-20"
        />
        <div className="absolute -bottom-0 h-60 w-full bg-gradient-to-t from-background from-30% via-background/70 to-transparent"></div>
      </motion.div>
      {/* <div className="hidden lg:block absolute -bottom-16 h-60 w-full bg-gradient-to-t from-background from-30% via-transparent to-transparent"></div> */}
    </div>
  );
};

export default FormCustomer;
