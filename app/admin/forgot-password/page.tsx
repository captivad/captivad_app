"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForgotPassword } from "../admin.service";
import React, { use } from "react";
import { useFormik } from "formik";
import { HOME } from "@/utils/router";
import toast from "react-hot-toast";
import { IPayloadForgotPassword } from "@/app/api/auth/forgot-password/forgot-password.interface";
import * as Yup from "yup";
import ModalOtpVerify from "./components/modal-otp-verify";

export default function AdminLogin() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());

  const { mutate: handleForgotPassword, isPending } = useForgotPassword({
    onSuccess() {
      const modal = document.getElementById(
        `my_modal_otp_verify`
      ) as HTMLDialogElement;
      modal?.showModal();
      resetForm();
    },
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
  });

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
  } = useFormik<IPayloadForgotPassword>({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      params.set("email", values.email);
      navigate.push(`?${params.toString()}`);
      handleForgotPassword(values);
    },
  });
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Forgot Password</h1>
            <p className="py-6 text-center max-w-md">
              Complate the form below to get OTP and reset your password
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="email"
                  className={`input input-bordered ${
                    touched.email && errors.email ? "input-error" : ""
                  }`}
                  required
                  onBlur={handleBlur}
                  value={values.email}
                />
              </div>
              <div className="form-control mt-6">
                <button disabled={isPending} className="btn btn-primary">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalOtpVerify />
    </>
  );
}
