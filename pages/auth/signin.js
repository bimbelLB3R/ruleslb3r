import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Layout from "../../components/Layout";

export default function SignIn({ providers }) {
  return (
    <div>
      <Layout>
        <div className="flex items-center justify-center m-auto mt-10">
          <div>
            <h1 className="font-roboto text-lg mb-10">Sign In</h1>
            {Object.values(providers).map((provider) => (
              <div key={provider.id}>
                <button
                  onClick={() => signIn(provider.id)}
                  className="bg-slate-200 px-4 py-2 rounded text-orange-600 font-roboto drop-shadow-md hover:drop-shadow-lg "
                >
                  Sign in with {provider.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
