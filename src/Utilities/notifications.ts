import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"edetime94@gmail.com",
        pass:"wbyxxrsuipxtxbpe"
    },
    tls:{
        rejectUnauthorized:false
    }
})

export const sendmail = async (to:string, html:string) =>{
    try{
        const response = await transporter.sendMail({
            from:"edetime94@gmail.com" ,
            to:to,
            subject:"Welcome",
            html
        })

    }catch(err){
        console.log(err)
    }
}

export const emailHtml = (email:string, password:string)=>{
    const mail = `<h1>Welcome</h1>
                <p>Your username: ${email}</p><br>
                <p>Your password: ${password}</p><br>
                <p> Thank you </p>`

                return mail
}