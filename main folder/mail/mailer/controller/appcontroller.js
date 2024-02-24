const nodemailer=require('nodemailer');
const { PASSWORD, EMAIL } = require('../env.js');
const Mailgen = require('mailgen');
const Mail = require('nodemailer/lib/mailer/index.js');

// tutorial from Daily tution

// sending email from testing account:- ethereal
const signup = async (req, res) => {
    try {
        const testAccount = await nodemailer.createTestAccount();

        const transport = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass  // Corrected property name
            }
        });

        let message = {
            from: '"Fred Foo 👻" <foo@example.com>',
            to: "bar@example.com, baz@example.com",
            subject: "Hello ✔",
            text: "Hello world?",
            html: "<b>Hello world?</b>",
        };

        const info = await transport.sendMail(message);
        return res.status(200).json({
            msg: "Mail sent successfully",
            info: info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        });
        
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

// sending email from gmail account
const getbill=(req,res)=>{
    const {userEmail}=req.body
    let config={
        service:'gmail',
        auth:{
            user:EMAIL,
            pass:PASSWORD
        }
    }

    let transporter=nodemailer.createTransport(config)
    let mailgen=new Mailgen({
        theme:'default',
        product:{
            name:'Mailgen',
            link:'https://mailgen.js/'
        }
    })

    let response={
        body:{
            name:"Ankit chakraborty",
            intro:"your bill ",
            table:{
                data:[
                    {
                        item:"nodeMailer stack book",
                        description:"Backend on email sending",
                        price:"$10"
                    }
                ]
            },
            outro:"Looking forward for more sending using smpt server"
        }
    }

    let mail=mailgen.generate(response)
    let message={
        from: EMAIL,
        to: userEmail,
        subject:"thank you smtp",
        html:mail
    }

    transporter.sendMail(message).then(()=>{
        res.status(200).json(
            "mail sent succes"
        )
    }).catch(error=>{
        res.status(404).json({message:error.message})
    })
    
}

module.exports={
    signup,
    getbill
}