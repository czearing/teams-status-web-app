import { signIn, useSession } from "next-auth/react";
import Head from "next/head";

export default function Home() {
  const { data: session } = useSession();

  return <div>Hello</div>;
}
