import { HOME } from "@/components/navbar";
import { redirect } from "next/navigation";

export default function Root() {
  redirect(HOME);
}
