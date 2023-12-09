"use strict";
import nodemailer from 'nodemailer';
import env from 'dotenv';
import {google}  from 'googleapis';
import {mailInter} from '../interfaces.td.js'

env.config();

const OAuth2 = google.auth.OAuth2;
const OAuth2_client = new OAuth2(process.env.G_CLIENT_ID, process.env.G_CLIENT_SECRET)
OAuth2_client.setCredentials({refresh_token:process.env.G_REFRESH_TOKEN})

export const send_mail = (data:mailInter) => {
  const access_token = OAuth2_client.getAccessToken();

  const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
      type:'OAuth2',
      user:"mohdumairsiddiqui00@gmail.com",
      clientId:process.env.G_CLIENT_ID,
      clientSecret:process.env.G_CLIENT_SECRET,
      refreshToken:process.env.G_REFRESH_TOKEN,
      accessToken:access_token as unknown as string

    }
  })

  const mail_options = {
    from: "mohdumairsiddiqui00@gmail.com",
    to:data.to,
    subject:data.subject,
    text: data.message,
    html:`<b><h2>${data.message}</h></b>
          <a href=${data.url}>${data.link}</a>`,
  }

  transport.sendMail(mail_options , (err:Error | null, result)=>{
    if(err) console.log(err)
    else console.log(result)

    transport.close();
  })
}

/*const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user:"mohdumairsiddiqui00@gmail.com",
    pass:"aipi mpul vywc qiub",
  }
});

 export const mailSender = async(data) => {
    const info = await transporter.sendMail({
    from: "mohdumairsiddiqui00@gmail.com",
    to: data.to,
    subject: data.subject,
    text: data.message,
    html:`<b><h2>${data.message}</h></b>
          <a href=${data.url}>${data.link}</a>`,
  });
}*/

