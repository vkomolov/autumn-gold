"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/"); // заменяет текущий url без добавления в history
    }, 1000);
  }, [router]);

  return <p>Перенаправление...</p>;
}
