const { Resend } = require("resend");
exports.resendMails = new Resend(process.env.RESEND_API_KEY);
