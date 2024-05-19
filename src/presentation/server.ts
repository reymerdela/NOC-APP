import { CheckService } from '../domain/use-cases/checks/check-service'
import { FileSystemDatasource } from '../infraestructure/datasources/fie-system.datasource'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const emailService = new EmailService()
export class Server {
  public static start() {
    console.log('Server started ...')
    // const url = 'https://google.com'

    // emailService.sendEmail({
    //   to: 'reymerdelacruzm@gmail.com',
    //   subject: 'Hola, prueba desde node',
    //   htmlBody: '<h1>Esto es una prueba</h1>',
    // })
    // emailService.sendEmailWithFileSystemLogs('fabianmdz1912@gmail.com')
    // CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok!`),
    //     (error) => console.log(error)
    //   ).execute(url)
    // })
  }
}
