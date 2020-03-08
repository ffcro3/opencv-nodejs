import Mail from '../../lib/Mail';

class FinishMail {
  get key() {
    return 'FinishMail';
  }

  async handle({ data }) {
    const { emailData } = data;

    console.log(
      `Exporting Data Finish. From: ${emailData.data}, at: ${emailData.date}. Quantity: ${emailData.value}`
    );

    await Mail.sendMail({
      to: `${emailData.provider} <${emailData.email}>`,
      subject: `${emailData.data} has finished!`,
      template: 'finish',
      context: {
        source: emailData.data,
        date: emailData.date,
      },
    });
  }
}

export default new FinishMail();
