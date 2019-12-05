//Load the Sendgrid email library
const sgMail = require ('@sendgrid/mail')
//Set the API key - with the generated API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

//sendWelcomeEmail function
const sendWelcomeEmail = (email, firstName) => {
    sgMail.send({
        to: email,
        from: 'ayobami.sm@gmail.com',
        subject: 'Thanks for signing up, ' + firstName,
        text: `Welcome to Taskia, ${firstName}. Let me know how you feel about the app. Thanks.`
    })

}

//sendExitingEmail function
const sendExitingEmail = (email, firstName) => {
    sgMail.send({
        to: email,
        from: 'ayobami.sm@gmail.com',
        subject: 'Oops. We will miss you!, ' + firstName,
        text: `It is painful to see you going, ${firstName}. Kindly let us know why this is happening, and what we could have done to keep you. Thanks.`
    })
}

/** 
//sendDayreminderEmail function
const sendDayReminderEmail = (taskName, firstName, timeDue, email) => {
    sgMail.send({
        to: email,
        from: 'ayobami.sm@gmail.com',
        subject: taskName + ' is about time, ' + firstName,
        text: `This is to remind you that ${taskName} is just ${timeDue) days time. Do not miss it. Thanks for using Taskia.`
    })
}

//sendHourReminderEmail function
const sendHourReminderEmail = (taskName, firstName, timeDue, email) => {
    sgMail.send({
        to: email,
        from: 'ayobami.sm@gmail.com',
        subject: taskName + ' is about time, ' + firstName,
        text: `This is to remind you that ${taskName} is just ${timeDue) hour(s) time. Do not miss it. Thanks for using Taskia.`
    })
}
*/
module.exports = {
    sendWelcomeEmail,
    sendExitingEmail
}