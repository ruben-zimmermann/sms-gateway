import getSessionInfo, { SessionInfo } from "./session";

function sendMessage(message: Message) {
  getSessionInfo().then(session);
}

function getHeader(sessionInfo: SessionInfo) {
  const { session, token } = sessionInfo;
  return {
    headers: {
      Host: "192.168.8.1",
      Accept: "*/*",
      "Accept-Language": "de,en-US;q=0.7,en;q=0.3",
      "Accept-Encoding": "gzip, deflate",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      __RequestVerificationToken: token,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Length": "227",
      Origin: "http://192.168.8.1",
      Connection: "keep-alive",
      Referer: "http://192.168.8.1/html/smsinbox.html?smsinbox",
      Cookie: session,
    },
  };
}
