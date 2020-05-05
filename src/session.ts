import axios from "axios";
import { parseString } from "xml2js";

const URL = "http://192.168.8.1/api/webserver/SesTokInfo";

export interface SessionInfo {
  session: string;
  token: string;
}

export default function getSessionInfo() {
  return new Promise((resolve, reject) => {
    axios.get(URL).then((response) => {
      const xmlData = response.data;
      parseString(xmlData, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve({ session: result.sesInfo, token: result.tokInfo });
      });
    });
  });
}
