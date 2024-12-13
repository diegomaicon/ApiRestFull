import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate{
  template: string;
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

export default class EtherealMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const account = await nodemailer.createTestAccount();
    const handlebarsMailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: account.user,
            pass: account.pass
        }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address : from?.mail || 'equipe@apivendas.com.br'
      },
      to :{
        name: to.name,
        address : to.mail
      },
      subject: subject,
      html: await handlebarsMailTemplate.parse(templateData)
    })

    console.log('Message sent: %s', message.messageId);
    // Pré-visualização disponível apenas ao enviar através de uma conta Ethereal
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

   }
}


