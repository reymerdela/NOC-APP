import nodeMailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin'
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity'

interface Attachment {
  filename: string
  path: string
}

export interface SendEmailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
  //Todo: Attachments
}

export class EmailService {
  private transporter = nodeMailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  })

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, htmlBody, subject, attachments = [] } = options
    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      })
      // console.log('Email sent: %s', sendInformation)
      const log = new LogEntity({
        level: LogSeverityLevel.Low,
        message: 'Email sent',
        origin: 'email.service.ts',
      })
      return true
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.High,
        message: 'Error sending email',
        origin: 'email.service.ts',
      })
      return false
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Logs del servidor'
    const htmlBody = `
    <h3>Logs del sistema</h3>
    <p>Se adjunta los logs del sistema</p>
    `
    const attachments = [
      { filename: 'logs-all.log', path: './logs/logs-all.log' },
      { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
      { filename: 'logs-hight.log', path: './logs/logs-hight.log' },
    ]
    return this.sendEmail({
      to,
      subject,
      htmlBody,
      attachments,
    })
  }
}
