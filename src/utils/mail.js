import Mailgen from "mailgen";

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
    forgotPasswordContent
}