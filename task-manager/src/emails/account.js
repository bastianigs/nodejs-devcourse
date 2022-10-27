const sgMail = require('@sendgrid/mail')

const defEmail = 'sebastianigescu@trash-mail.com'
const sgApiKey = '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'
sgMail.setApiKey(sgApiKey)

// ----------------------------------------------

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: defEmail,
        subject: 'Welcome to our Task App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: defEmail,
        subject: 'Cancelation confirmed',
        text: `${name}, why did you want to cancel the account?`
    })
}

module.exports = { 
    sendWelcomeEmail,
    sendCancelationEmail
}