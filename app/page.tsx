import { HOME } from "@/utils/router";
import { redirect } from "next/navigation";

export default function Root() {
  redirect(HOME);
}
