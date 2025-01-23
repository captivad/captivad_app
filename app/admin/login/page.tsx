"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "../admin.service";
import React from "react";
import { ILoginPayload } from "@/app/api/auth/[...nextauth]/route";
import { useFormik } from "formik";
import { HOME } from "@/utils/router";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function AdminLogin() {
  const navigate = useRouter();
  const { status } = useSession();
  if (status === "authenticated") navigate.push(HOME);

  const { mutate: handleLogin, isPending } = useLogin({
    onSuccess(data) {
      console.log(data);
      if (data?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate.push(HOME);
        }, 1000);
      }
    },
  });

  const { values, handleSubmit, handleChange } = useFormik<ILoginPayload>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      handleLogin(values);
    },
  });
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-center">Login now!</h1>
          <p className="py-6">Access login for admin Captivad Office</p>
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
                className="input input-bordered"
                required
                value={values.email}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                value={values.password}
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>
            <div className="form-control mt-6">
              <button disabled={isPending} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
