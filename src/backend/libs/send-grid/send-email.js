import sgMail from "@sendgrid/mail";
import { createVerifyEmailMessage } from "./messages";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail() {
  const msg = {
    from: "kostya1989com@gmail.com", // Change to your verified sender
    to: "ligus.konstantin@gmail.com", // Change to your recipient
    subject: "Sending with SendGrid is Fun",
    html: '<head><style>div{background-color: #be5151;}</style></head><div><h3>and easy to do anywhere, even with Node.js</h3><p>hello</p><img alt="banner" fetchpriority="high" width="300" height="200" decoding="async" data-nimg="1" class="Banner_image__A5_Hc" style="color:transparent" src="https://ci4.googleusercontent.com/proxy/Dxe9Tkt9xvcWab5atHiQECczzQWEl5wxs1bFEqWVS6jgM-7pSYubVJ4gMhkobX4uKKKXv4IlRQ7vovNLxN5ABIRvuB_0-gj6-fPe6ggiWwTYoZFBS01IF1i1hZr5lgmNo6CfN8GOivdJT63Z51EqU4g2m0SNRjjReFiuOatzB-M3fL9X3A=s0-d-e1-ft#http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/f14ebce4-5076-4b6f-9e38-6163a77c6dcc/948x542.jpg"></div>',
  };
  const verifyMsg = createVerifyEmailMessage({
    emailForVerify: "ligus.konstantin@gmail.com",
    linkForVerify: "https://www.google.com",
  });
  sgMail
    .send(verifyMsg)
    .then(() => {
      console.log("Email sent");
    })
    .catch(error => {
      console.error(error);
    });
}
