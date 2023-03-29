const Newsletter = require("../Models/newsletterModel");
const nodemailer = require("nodemailer");
const company = require("../Models/companyModel");

const getMails = async (req, res) => {
  try {
    const mail = await Newsletter.find();
    return res.status(200).json(mail);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve mails" });
  }
};

const addMail = async (req, res) => {
  const { userMail } = req.body;

  if (!userMail) {
    return res.status(400).json({ message: "Fill in required fields" });
  }

  const mails = await Newsletter.create({
    userMail,
  });

  if (mails) {
    return res.status(201).json(mails);
  } else {
    return res.status(400).json({ message: "an eror ocurred" });
  }
};
const sendMail = async (req, res) => {
  const { subject, content, userMail,companyName } = req.body;

  if (!subject || !content || !userMail || !companyName) {
    return res.status(400).json({ message: "Fill in required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    requireTLS: true,
    secure: false,
    auth: {
      user: "daemonhq12@gmail.com",
      pass: "ynmysghtcxapybcb",
    },
   
  });
  

  const mailOptions = {
    from: "hellcat.inc@gmail.com",
    to: `${userMail}`,
    subject:` Newsletter from ${companyName},
    ${subject}`,
    html: `<p>${content}</p>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  return res.status(200).json({ message: "mail sent" });
};
const deleteMail = async (req, res) => {
  const mailId = req.params.id;

  const comp = await Newsletter.findByIdAndDelete(mailId);

  if (!comp) {
    return res.status(404).json({ message: "Mail not found" });
  }

  res.status(200).json({ message: "Mail deleted successfully" });
};

module.exports = {
  getMails,
  sendMail,
  addMail,
  deleteMail,
};
