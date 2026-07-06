"use client";

import { useEffect } from "react";

/**
 * Guards releasePointerCapture against NotFoundError races.
 * Next.js 16 devtools draggable indicator triggers this on touch/mobile.
 */
export function PointerCaptureFix() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const proto = Element.prototype;
    const original = proto.releasePointerCapture;

    proto.releasePointerCapture = function releasePointerCaptureSafe(
      this: Element,
      pointerId: number
    ) {
      try {
        if (typeof this.hasPointerCapture === "function" && !this.hasPointerCapture(pointerId)) {
          return;
        }
        original.call(this, pointerId);
      } catch (error) {
        if (error instanceof DOMException && error.name === "NotFoundError") {
          return;
        }
        throw error;
      }
    };

    return () => {
      proto.releasePointerCapture = original;
    };
  }, []);

  return null;
}
