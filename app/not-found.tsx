"use client";

import Link from "next/link";
import { Button } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-4xl font-bold">404</h2>
      <p className="mb-8 text-xl">页面未找到</p>
      <Button asChild>
        <Link href="/">返回首页</Link>
      </Button>
    </div>
  );
}
