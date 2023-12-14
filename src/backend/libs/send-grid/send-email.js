import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendEmail(message) {
  await sgMail.send(message);
  console.log("Email sent");
}
