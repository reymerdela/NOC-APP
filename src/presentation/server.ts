import { LogSeverityLevel } from '../domain/entities/log.entity'
import { CheckService } from '../domain/use-cases/checks/check-service'
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple'
import { FileSystemDatasource } from '../infraestructure/datasources/fie-system.datasource'
import { MongoLogDataSource } from '../infraestructure/datasources/mongo-log.datasource'
import { PostgresLogDatasource } from '../infraestructure/datasources/postgre-log.datasource'
import { LogRepositoryImpl } from '../infraestructure/repositories/log.repository.impl'
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service'

const fsLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
)
const postgreLogRepository = new LogRepositoryImpl(
  new PostgresLogDatasource()
)
const emailService = new EmailService()
export class Server {
  public static async start() {
    console.log('Server started ...')
    const url = 'https://www.google.com'

    // emailService.sendEmail({
    //   to: 'reymerdelacruzm@gmail.com',
    //   subject: 'Hola, prueba desde node',
    //   htmlBody: '<h1>Esto es una prueba</h1>',
    // })
    // emailService.sendEmailWithFileSystemLogs('fabianmdz1912@gmail.com')
    CronService.createJob('*/5 * * * * *', () => {
      new CheckServiceMultiple(
        [fsLogRepository,mongoLogRepository,postgreLogRepository],
        () => console.log(`${url} is ok!`),
        (error) => console.log(error)
      ).execute(url)
    })

    // const logs = await LogRepository.getLog(LogSeverityLevel.Medium)
    // console.log(logs);
    
  }
}
