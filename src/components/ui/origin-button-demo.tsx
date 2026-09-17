"use client";

import React from "react";
import { OriginButton } from "@/components/ui/origin-button";

export function OriginButtonPreview() {
  return (
    <div className="flex items-center justify-center p-8 bg-neutral-900 rounded-xl">
      <OriginButton>Origin Button</OriginButton>
    </div>
  );
}

export default OriginButtonPreview;
