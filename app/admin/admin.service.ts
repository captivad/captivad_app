import { ILoginPayload } from "@/app/api/auth/[...nextauth]/route";
import { IBaseResponse, IFetchStatus } from "@/helpers/general.helper";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { signIn, signOut } from "next-auth/react";
import { IPayloadForgotPassword } from "../api/auth/forgot-password/forgot-password.interface";
import toast from "react-hot-toast";
import {
  IOtpVerification,
  IPayloadOtpVerification,
} from "../api/auth/otp-verification/otp-verification.interface";
import { IPayloadResetPassword } from "../api/auth/reset-password/reset-password.interface";

export function useLogin({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (payload: ILoginPayload) => {
      console.log(payload, "payload");
      const response = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      console.log(response, "response");

      return response;
    },
    onSuccess,
  });
}

// export function useUserMe() {
//   return useQuery({
//     queryKey: ["user-me"],
//     queryFn: async () => {
//       const response = await fetch("/api/auth/session");
//       return response.json();
//     },
//   });
// }

export function useForgotPassword({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (payload: IPayloadForgotPassword) => {
      const response = await axios<IBaseResponse<string>>({
        method: "POST",
        url: "/api/auth/forgot-password",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useOtpVerification({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (payload: IPayloadOtpVerification) => {
      const response = await axios<IBaseResponse<IOtpVerification>>({
        method: "POST",
        url: "/api/auth/otp-verification",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.payload;
    },
    onSuccess(data) {
      onSuccess && onSuccess(data);
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useResetPassword({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async (payload: IPayloadResetPassword) => {
      const response = await axios<IBaseResponse<string>>({
        method: "POST",
        url: "/api/auth/reset-password",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    },
    onSuccess,
    onError: (e) => {
      toast.error(e.message);
    },
  });
}

export function useLogout({ onSuccess }: IFetchStatus) {
  return useMutation({
    mutationFn: async () => {
      const response = await signOut({
        redirect: false,
      });
      return response;
    },
    onSuccess,
  });
}
