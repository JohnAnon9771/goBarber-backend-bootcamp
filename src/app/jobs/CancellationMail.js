import { format, parseISO } from 'date-fns';
import formatLocale from 'date-fns/locale/pt-BR';
import Mail from '../../config/mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { appointment } = data;
    await Mail.sendMail({
      to: `${appointment.provider.name} <${appointment.prodider.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.provider.name,
        user: appointment.user.name,
        date: format(
          parseISO(appointment.date),
          "'dia' dd 'de' MMM', ás' H:mm'h'",
          {
            locale: formatLocale
          }
        )
      }
    });
  }
}

export default new CancellationMail();
