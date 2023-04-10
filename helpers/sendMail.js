const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendEmail = async (email, verificationToken) => {

    const msg = {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: `<p>By clicking on the following link, you are confirming your email address. 
        <a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Confirm email address</a></p>`
    }
    try {
        await sgMail.send(msg)
    } catch (error) {
        throw new Error(error.message)
    }
}
module.exports = sendEmail;

