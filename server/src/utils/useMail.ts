import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { gConsole } from ".";
import * as fs from "fs";
import * as path from "path";
import { GMath } from "gems-tools";
export const useMail = function () {
  const user = {
    name: "2366282414@qq.com",
    pass: "jnbmlsrhpdyhdhge"
  };
  let basePath = "";
  let transporter: Transporter<SMTPTransport.SentMessageInfo>;
  let codeHtml = "";
  const codeMailCache: Map<
    string,
    { code: string; canReSend: boolean; timer: NodeJS.Timer }
  > = new Map();
  async function init(bPath: string) {
    basePath = bPath;
    codeHtml = fs.readFileSync(path.join(basePath, "mail.html"), "utf8");
    transporter = createTransport({
      host: "smtp.qq.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: user.name, // generated ethereal user
        pass: user.pass // generated ethereal password
      }
    });
    gConsole.color("邮件初始化完成", "greenBG");
  }
  async function send(mail: Mail.Options) {
    const info = await transporter.sendMail(mail);
    return info;
  }
  async function sendValidCode(to: string) {
    if (codeMailCache.has(to)) {
      const item = codeMailCache.get(to);
      if (item.canReSend) {
        clearTimeout(item.timer);
      } else return { isNew: false };
    }
    const randomCode = GMath.randomLenNum(6, false) as string;
    const html = codeHtml.replace("$mail", to).replace("$code", randomCode);
    const info = await send({
      from: '"《我要当村长》" <2366282414@qq.com>',
      to,
      subject: "您的注册验证码到了 ✔",
      text: "《我要当村长》注册验证码",
      html
    });
    const timer = setTimeout(() => {
      codeMailCache.delete(to);
    }, 5 * 60 * 1000);
    setTimeout(() => {
      codeMailCache.get(to).canReSend = true;
    }, 60 * 1000);
    codeMailCache.set(to, { code: randomCode, canReSend: false, timer });
    return {
      isNew: true,
      code: randomCode,
      info
    };
  }
  return {
    init,
    send,
    sendValidCode
  };
};
export const gMail = useMail();