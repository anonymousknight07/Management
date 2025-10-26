import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail= async( options )=>{
    const mailGenerator= new Mailgen({
        theme:"default",
        product:{
            name:"Task Manager",
            link:"https://localhost:3000"
        }
    })

    const emailTextual=mailGenerator.generatePlaintext(options.mailgenContent)

    const emailHtml= mailGenerator.generate(options.mailgenContent)


    const transporter=nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth:{
            user:process.env.MAILTRAP_SMTP_USER,
            pass:process.env.MAILTRAP_SMTP_PASS
        }
    })

    const mail={
        from: "21951a0504@iare.ac.in",
        to: options.email,
        subject: options.subject,
        text:emailTextual,
        html:emailHtml
    }

    try{
        await transporter.sendMail(mail)
    }
    catch(err){
        console.error(err);
    }


};
 
const emailVerificationContent=(username, verificationUrl)=>{
    return{
        body:{
            name:username,
            intro:"Welcome onboard, Let's get you verified.",
            action:{
                instructions:"To verify your email please click on the following button",
                button:{
                    color:"#22BC66",
                    text: "Verify me",
                    link: verificationUrl,

                },
            },
            outro:"Need Help , or have questions ?  Just reply to this mail and a person from our team will get in touch",
        },
    };
};

const forgotPasswordContent=(username, passwordResetUrl)=>{
    return{
        body:{
            name:username,
            intro:"We got a request to reset your password for this account",
            action:{
                instructions:"To reset your password click on the link below",
                button:{
                    color:"#22BC66",
                    text: "Reset Password",
                    link: passwordResetUrl,

                },
            },
            outro:"Need Help , or have questions ?  Just reply to this mail and a person from our team will get in touch",
        },
    };
};

export{
    emailVerificationContent,
    forgotPasswordContent,
    sendEmail
}