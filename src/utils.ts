import { stringify } from "querystring";

export function toSingleLine(text: string) {
  return text
    .split("/\r?\n/")
    .map((line) => line.trim())
    .join("");
}
