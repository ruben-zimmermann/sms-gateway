import generateMessage from "./message";
import { toSingleLine } from "./utils";
import moment from "moment";

describe("generateMessage", () => {
  it("generates a correct message", () => {
    const timestamp = new Date();
    const actual = generateMessage({
      text: "Sample Text",
      recipients: ["123456"],
      timestamp: timestamp,
    });
    const expected = toSingleLine(
      `<?xml version="1.0" encoding="UTF-8"?>
    <request>
        <Index>-1</Index>
        <Phones>
            <Phone>123456</Phone>
        </Phones>
        <Sca></Sca>
        <Content>Sample Text</Content>
        <Length>11</Length>
        <Reserved>1</Reserved>
        <Date>${moment(timestamp).format("YYYY-MM-DD HH:mm:ss")}</Date>
    </request>`
    );
  });
});
