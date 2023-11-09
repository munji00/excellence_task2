"use strict";
import nodemailer from 'nodemailer';
import env from 'dotenv';

env.config();

const transporter = nodemailer.createTransport({
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
}

