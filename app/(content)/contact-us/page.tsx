"use client";
import FormCustomer from "@/components/form-customer";
import { motion } from "framer-motion";
import React from "react";

export default function OurServices() {
  return (
    <>
      {/* ###########################  section-form  ############################ */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        id="form"
        className="h-full px-[5%] lg:pb-0 py-[15%] bg-background"
      >
        <FormCustomer />
      </motion.section>
    </>
  );
}
