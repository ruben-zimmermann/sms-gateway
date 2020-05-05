import moment from "moment";
import { toSingleLine } from "./utils";
import { text } from "express";

interface Message {
  text: string;
  recipients: Array<string>;
  timestamp: Date;
}

export default function generateMessageRequestBody(message: Message) {
  const { text, recipients, timestamp } = message;
  return `<?xml version="1.0" encoding="UTF-8"?>
        <request>
            <Index>-1</Index>
            <Phones>
                ${recipients
                  .map((recipient) => `<Phone>${recipient}</Phone>`)
                  .join("\n")}
            </Phones>
            <Sca></Sca>
            <Content>${text}</Content>
            <Length>${text.length}</Length>
            <Reserved>1</Reserved>
            <Date>${moment(timestamp).format("YYYY-MM-DD HH:mm:ss")}</Date>
        </request>`;
}
