"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectPage({ to }) {
  const router = useRouter();

  useEffect(() => {
    router.push(to);
  }, [router, to]);

  return <p className="text-center text-gray-600">Redirecting...</p>;
}
