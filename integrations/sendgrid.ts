import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendGridMail = async (email: string, name: string) => {
  const msg = {
    to: email,
    from: "nirmalya.email@gmail.com",
    subject: `Welcome ${name}`,
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendGridMail;
