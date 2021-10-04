import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { gConsole } from "./index";
import * as fs from "fs";
import * as path from "path";
import { GMath } from "gems-tools";
export const useMail = function () {
  const user = {
    name: "wydcz_game@qq.com",
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
        user: user.name,
        pass: user.pass
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
      from: `"《我要当村长》" <${user.name}>`,
      to,
      subject: "您的注册验证码到了 ✔",
      text: "《我要当村长》注册验证码",
      html
    });
    const timer = setTimeout(() => {
      codeMailCache.delete(to);
    }, 5 * 60 * 1000);
    setTimeout(() => {
      if (codeMailCache.has(to)) codeMailCache.get(to).canReSend = true;
    }, 60 * 1000);
    codeMailCache.set(to, { code: randomCode, canReSend: false, timer });
    return {
      isNew: true,
      code: randomCode,
      info
    };
  }
  function validCode(email: string, code: string) {
    if (codeMailCache.has(email)) {
      const mailIns = codeMailCache.get(email);
      if (mailIns.code === code) {
        clearTimeout(mailIns.timer);
        codeMailCache.delete(email);
        return {
          valid: true,
          msg: "验证成功"
        };
      }
      return {
        valid: false,
        msg: "验证码错误"
      };
    }
    return {
      valid: false,
      msg: "验证码已失效"
    };
  }
  return {
    init,
    send,
    sendValidCode,
    validCode
  };
};
export const gMail = useMail();
