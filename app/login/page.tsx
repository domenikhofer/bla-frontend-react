"use server";

import { signIn, auth } from "@/auth";

export default async function Page() {

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">🔐</button>
    </form>
  );
}
