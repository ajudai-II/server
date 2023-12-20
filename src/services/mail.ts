const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(
  smtpTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: "pedidodoajudai@gmail.com",
      pass: "rvmhyuiugeaxypce",
      clientId: "749644619913-qe65e9oa5mc5fto47vsbiil018pbq94v.apps.googleusercontent.com",
      clientSecret: "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",
      refreshToken: "04WOWk9X16A1XCgYIARAAGAQSNwF-L9IrnRwv_PTZQ-uvUg_JnM5C-0CompAxWGb0m21vFeRWTQBifq-y8yG2-3hPJmxsQEp5Lf0"
    }
  })
);

export async function sendRecoveryCode(email: string, code: number): Promise<void> {
  const mailOptions = {
    from: "pedidodoajudai@gmail.com",
    to: email,
    subject: 'Código de Recuperação de Senha',
    text: `Seu código de recuperação de senha é: ${code}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error: ", error);
    throw error; // Lançar o erro para que o controlador possa tratá-lo
  }
}
