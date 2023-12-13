const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config();
const { User } = require('../modals/users');

// Configuration for nodemailer.
let transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const registerEmail = async (userEmail, user) => {
    try {
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: 'Flickbase: - Leading Content Writing Platform.',
                link: process.env.EMAIL_MAIN_URL,
                // logo: 'Deepak Chaudhary', // Replace with your logo URL
                copyright: `Copyright © ${Date()} Deepak Chaudhary. All rights reserved.`,
            },
        });

        const email = {
            body: {
                name: userEmail,
                greeting: 'Hello,',
                title: 'Welcome to Flickbase!',
                intro: 'We\'re thrilled to have you join us.',
                action: {
                    instructions: 'To validate your account, please click the button below:',
                    button: {
                        color: '#22BC66',
                        text: 'Validate Your Account',
                        link: `${process.env.SITE_DOMAIN}verification?t=${emailToken}`,
                    },
                },
                outro: 'If you need any assistance, feel free to reach out. We\'re here to help!',
                signature: 'Best regards,<br>The Flickbase Team',
            },
        };

        let emailBody = mailGenerator.generate(email);

        let message = {
            from: process.env.EMAIL,
            to: userEmail,
            subject: 'Welcome to Flickbase',
            html: emailBody,
        };

        await transporter.sendMail(message);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    registerEmail,
};
