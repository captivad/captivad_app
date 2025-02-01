"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useResetPassword } from "../admin.service";
import React from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { IPayloadResetPassword } from "@/app/api/auth/reset-password/reset-password.interface";
import { EyeClosed, EyeIcon } from "lucide-react";

export default function AdminLogin() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [openNewPassword, setOpenNewPassword] = React.useState(false);
  const [openConfirmPassword, setOpenConfirmPassword] = React.useState(false);

  const { mutate: handleResetPassword, isPending } = useResetPassword({
    onSuccess() {
      resetForm();
      toast.success("Reset Password Success");
      navigate.push("/admin/login");
    },
  });

  const validationSchema = Yup.object().shape({
    token: Yup.string().required("Token is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
  });

  const {
    values,
    handleSubmit,
    handleChange,
    errors,
    touched,
    handleBlur,
    resetForm,
    setFieldValue,
  } = useFormik<IPayloadResetPassword>({
    initialValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleResetPassword(values);
    },
  });

  React.useEffect(() => {
    if (token) {
      setFieldValue("token", token);
    }
  }, [token, setFieldValue]);
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Reset Password</h1>
            <p className="py-6 text-center max-w-md">
              Complate the form below to reset your password
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  name="newPassword"
                  onChange={handleChange}
                  type={openNewPassword ? "text" : "password"}
                  placeholder="newPassword"
                  className={`input input-bordered ${
                    touched.newPassword && errors.newPassword
                      ? "input-error"
                      : ""
                  }`}
                  required
                  onBlur={handleBlur}
                  value={values.newPassword}
                />
                <label
                  onClick={() => setOpenNewPassword(!openNewPassword)}
                  className=" absolute bottom-[12px] right-4 bg-transparent cursor-pointer"
                >
                  {!openNewPassword ? (
                    <EyeIcon size={20} className="" />
                  ) : (
                    <EyeClosed size={20} className="" />
                  )}
                </label>
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  type={openConfirmPassword ? "text" : "password"}
                  placeholder="confirmPassword"
                  className={`input input-bordered ${
                    touched.confirmPassword && errors.confirmPassword
                      ? "input-error"
                      : ""
                  }`}
                  required
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                />
                <label
                  onClick={() => setOpenConfirmPassword(!openConfirmPassword)}
                  className=" absolute bottom-[12px] right-4 bg-transparent cursor-pointer"
                >
                  {!openConfirmPassword ? (
                    <EyeIcon size={20} className="" />
                  ) : (
                    <EyeClosed size={20} className="" />
                  )}
                </label>
              </div>
              <div className="form-control mt-6">
                <button disabled={isPending} className="btn btn-primary">
                  {isPending ? "Processing..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
