import { cookies } from "next/headers";
import RootClient from "./client";

export default function RootPage() {
  const environment = globalThis.process?.env.NEXT_PUBLIC_SHORT_ENV;
  const cookieStore = cookies();

  return <RootClient environment={environment!} />;
}
