import nodemailer from "nodemailer";
import ejs from "ejs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const getCurrentDirectory = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return __dirname;
};

const getTemplate = (mailType) => {
  switch (mailType) {
    case "welcome":
      return "welcome.ejs";
    case "reset":
      return "forgotPassword.ejs";
    default:
      return "welcome.ejs";
  }
}
const sendMail = async ({ to, subject, link, mailType }) => {
  const __dirname = getCurrentDirectory();
  const template = getTemplate(mailType);

  ejs.renderFile(
    __dirname + "/" +  template,
    { email: to, link },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        var mainOptions = {
          from: "alok.yadav6000@gmail.com",
          to,
          subject,
          html: data,
        };
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          service: process.env.SMTP_SERVICE,
          secure: false,
          auth: {
            user: process.env.GOOGLE_USERNAME,
            pass: process.env.GOOGLE_PASSWORD,
          },
        });
        
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log("mailError", err);
          } else {
            console.log("Message sent: " + info.messageId);
          }
        });
      }
    }
  );
};

export default sendMail;
