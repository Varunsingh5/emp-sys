const nodemailer = require("nodemailer")
const EMAIL_USER = "singhvarun9101998@gmail.com";
const EMAIL_PASSWORD = "hopeyumgpdyviepe";

module.exports = async (emailID, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD
        }
    });

    const subject = 'Register On Connection';
    let emailHtml = `
    <h1 style="text-align: center;">Register</h1>
    <br/>
    <p>Login to change your first time new password.</p>
    <a href="${link}">${link}</a>
    Thanks for registration.
    `;
    const mailOptions = {
        from: `Connection <${EMAIL_USER}>`, // sender address
        to: emailID, // list of receivers
        subject, // Subject line
        text: subject,
        html: emailHtml// html text body
    };
    transporter.sendMail(mailOptions)
        .then(result => console.log('result:::::::', result))
        .catch(error => console.log('error:::::::', error));
};

// export const sendMail = async (emailID, data) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: EMAIL_USER,
//             pass: EMAIL_PASSWORD
//         }
//     });

//     const subject = 'Register On Connection';
//     let emailHtml = `
//     <h1 style="text-align: center;">Register</h1>
//     <br/>
//     <p>Login to change your first time new password.</p>
//     Thanks for registration.
//     `;
//     const mailOptions = {
//         from: `Connection <${EMAIL_USER}>`, // sender address
//         to: emailID, // list of receivers
//         subject, // Subject line
//         text: subject,
//         html: emailHtml// html text body
//     };
//     transporter.sendMail(mailOptions)
//         .then(result => console.log('result:::::::', result))
//         .catch(error => console.log('error:::::::', error));
// };