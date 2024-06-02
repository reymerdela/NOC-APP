import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
import { SendEmailLogs } from "./send-email-logs";

describe('Send email logs', () => {

    const mockEmailService = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    }

    const mockLogRepository: LogRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }
    
    const sendEmailLogs = new SendEmailLogs(
        mockEmailService as any,
        mockLogRepository
    )

    beforeEach(() => {
        jest.clearAllMocks()
    })


   test('should call send email and save log', async () => {
    

    const result = await sendEmailLogs.execute('reymer@google.com')
    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
        message: 'Log email sent',
        origin: 'send-email-logs.ts',
        level: 'low',
        createdAt: expect.any(Date)
    })

   }); 

   test('should log in case of error', async () => {
    
    mockEmailService.sendEmailWithFileSystemLogs.mockResolvedValue(false)

    const result = await sendEmailLogs.execute('reymer@google.com')
    expect(result).toBe(false)
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith({
        message: 'Error: Email log not sent',
        level: 'hight',
        createdAt: expect.any(Date),
        origin: 'send-email-logs.ts'
    })

   });
});