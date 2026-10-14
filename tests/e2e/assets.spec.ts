import { expect, test } from "@playwright/test";

// DESIGN-GUIDE.md §8.4: screenshots go through next/image as AVIF or WebP. next/image answers with the
// first format in next.config.ts's `images.formats` that the browser's Accept header allows.
const screenshot = "/_next/image?url=%2Fassets%2Fgba-1-crop.png&w=640&q=75";

test("browsers that accept AVIF get AVIF", async ({ request }) => {
  const response = await request.get(screenshot, {
    headers: { Accept: "image/avif,image/webp,image/*,*/*;q=0.8" },
  });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/avif");
});

test("browsers without AVIF get WebP", async ({ request }) => {
  const response = await request.get(screenshot, {
    headers: { Accept: "image/webp,image/*,*/*;q=0.8" },
  });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe("image/webp");
});
