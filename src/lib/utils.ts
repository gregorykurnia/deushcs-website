import { createCn } from "cn/config";

// Teach the class merger the Daylight theme names from globals.css (@theme),
// so `cn("text-h2", "text-ink")` keeps both: one is a size, the other a colour.
export const cn = createCn({
  extend: {
    theme: {
      text: [
        "display", "closing", "h2", "h2-article", "stat", "h3-lead", "h3", "h3-panel",
        "title", "title-sm", "lede", "lede-sm", "body", "body-sm", "card", "ui", "label", "meta",
      ],
      shadow: ["soft", "float", "btn", "warm"],
      radius: ["xs", "sm", "field", "md", "float-sm", "float", "lg", "xl", "pill"],
      container: ["content", "wide", "head", "article"],
    },
  },
});
