import getSessionInfo from "./session";
import axios, { AxiosResponse } from "axios";
import { mocked } from "ts-jest/utils";

jest.mock("axios");

const response: AxiosResponse = {
  data: `<?xml version="1.0" encoding="UTF-8"?>
  <response>
  <SesInfo>SessionID=ackN2xXIK5AzIeAcil7YDfTND/30svoqPxKLi4g5+xEuGz+OsXe7UicDb9ajaC7ZEDB4bNxMPjxQRUzjmkHWFX6dYtyE1x4HflfPk6yd4NDlQb8WcG96ULN/NJJ0aXdE</SesInfo>
  <TokInfo>qbQVd1qf791DIJIPII2KEJ55cE2g/G5r</TokInfo>
  </response>`,
  status: 200,
  statusText: "OK",
  config: {},
  headers: {},
};

describe("getSessionInfo", () => {
  it("returns a session info and token", (done) => {
    const expected = {
      session:
        "SessionID=ackN2xXIK5AzIeAcil7YDfTND/30svoqPxKLi4g5+xEuGz+OsXe7UicDb9ajaC7ZEDB4bNxMPjxQRUzjmkHWFX6dYtyE1x4HflfPk6yd4NDlQb8WcG96ULN/NJJ0aXdE",
      token: "qbQVd1qf791DIJIPII2KEJ55cE2g/G5r",
    };
    mocked(axios.get).mockImplementationOnce(() => Promise.resolve(response));

    getSessionInfo().then((actual) => {
      expect(actual).toEqual(expected);
      done();
    });
  });
});
