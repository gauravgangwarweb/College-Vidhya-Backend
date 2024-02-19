import { createTransport } from "nodemailer"

const transporter = createTransport({
    host: process.env.NM_HOST,
    port: process.env.NM_PORT,
    secure: false,
    auth: {
        user: process.env.NM_USER,
        pass: process.env.NM_PASS,
    },
})

export const sendMail = (to, name, otp) => {
    const mailOptions = {
        from: "otp@mailer.jitenderkumar.in",
        to,
        subject: "OTP for login",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dear ${name}</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing us. Use the following OTP to complete your Sign Up procedures.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />CEO Gaurav Gangwar</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}

export const resendOtpMail = (to, name, otp) => {
    const mailOptions = {
        from: "otp@mailer.jitenderkumar.in",
        to,
        subject: "OTP for Password Reset",
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Dear ${name == undefined ? "User" : name}</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Use the following OTP to complete your Password Reset procedures.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />CEO Gaurav Gangwar</p>
          <hr style="border:none;border-top:1px solid #eee" />
        </div>
      </div>`,
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
}
