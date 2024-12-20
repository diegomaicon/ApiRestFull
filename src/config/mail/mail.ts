interface IMailConfig{
  driver: 'ethereal' | 'ese';
  defaults: {
    from: {
      email: string;
      name: string;
    }
   }
}
export default {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
    email: 'contato@dmsdeveloper.ct.ws',
    name: 'Equipe API Vendas',
    }
  }
} as IMailConfig
