import cron, { CronJob } from "cron";
import fs from "fs";
import settings from "../settings";
import { json } from "express";
import { sendMessage } from "./gateway";

export interface Message {
  text: string;
  recipient: string;
  timestamp: Date;
}

/**
 * Cron job to trigger SMS sending
 * 
 * The job is executed every 10 seconds.
 */
const job = new CronJob("*/10 * * * * *", function () {
  run();
});
job.start();

/**
 * Send Messages.
 * 
 * This method checks for new messages in the 'outbox' folder and creates
 * a message send request for every new message.
 * 
 * Messages being sent successfully are moved to the 'sent' folder.
 */
function run() {
  readDir(settings.outbox)
    .then((files) =>
      files.forEach((file) => {
        readMessage(`${settings.outbox}/${file}`)
          .then((message) => {
            sendMessage(message).then(() => moveFile(file, settings.sent));
          })
          .catch((err) =>
            console.log(`Error reading message file ${file} - ${err}`)
          );
      })
    )
    .catch((err) =>
      console.log(`Error reading directory ${settings.outbox} - ${err}`)
    );
}

/**
 * Read the content of the given directory.
 * 
 * This is just a 'promisified' wrapper around fs.readdir
 * 
 * @param dir - the directory to be read
 */
function readDir(dir: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files: string[]) => {
      if (err) reject(err);
      else resolve(files);
    });
  });
}

/**
 * Reads a Message from a file.
 * 
 * @param path - the file to be read
 */
function readMessage(path: string): Promise<Message> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) reject(err);
      else {
        const message = JSON.parse(data) as Message;
        resolve(message);
      }
    });
  });
}

/**
 * Moves the given file to the given folder.
 * 
 * In case the target folder does not exist it is created.
 * 
 * @param file - the file to be moved
 * @param folder - the target folder
 */
function moveFile(file: string, folder: string) {
  if (!fs.existsSync(folder)) {
    fs.mkdir(folder, { recursive: true }, (err) => {
      console.log(err);
    });
  }
  fs.rename(`${settings.outbox}/${file}`, `${settings.sent}/${file}`, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
