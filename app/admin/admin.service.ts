import { ILoginPayload } from "@/app/api/auth/[...nextauth]/route";
import { IFetchStatus } from "@/helpers/general.helper";
import { useMutation } from "@tanstack/react-query";
import { signIn, signOut } from "next-auth/react";

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
