"use client";

import { getProviders, signIn } from "next-auth/react";
import React from "react";

const page = async () => {
  const providers = await getProviders().then((res) => {
    // console.log(res);
    return res;
  });

  return (
    <div>
      {providers &&
        Object.values(providers).map((provider) => {
          return (
            <div key={provider.id}>
              <button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                ログイン
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default page;
