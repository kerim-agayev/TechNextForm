"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-10 flex-col px-4">
      <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base max-w-full mx-auto">
        You can get new information on{" "}
        <LinkPreview
          url="https://www.instagram.com/technext.az/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          Instagram
        </LinkPreview>
      </p>
    </div>
  );
}
