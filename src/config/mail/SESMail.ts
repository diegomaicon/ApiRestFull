import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import aws from 'aws-sdk'
import mailConfig from '@config/mail/mail'

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate{
  file: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  mail: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export default class SESMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const handlebarsMailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      })
    });

    const { email, name } = mailConfig.defaults.from;

    const message = await transporter.sendMail({
      from: {
        name: from?.name || name,
        address : from?.mail || email
      },
      to :{
        name: to.name,
        address : to.mail
      },
      subject: subject,
      html: await handlebarsMailTemplate.parse(templateData)
    })
   }
}


