import { EmailService, SendEmailOptions } from "./email.service";
import nodeMailer from 'nodemailer'


describe('EmailService', () => {
    
    const mockSendMail = jest.fn()
    const emailService = new EmailService()

    nodeMailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('should send email', async () => {

        const options : SendEmailOptions = {
            htmlBody: '<h1>Test</h1>',
            to: 'reymerxd0@gmail.com',
            subject: 'Test',
        }
        
       await emailService.sendEmail(options)
       expect(mockSendMail).toHaveBeenCalledWith({
            htmlBody: '<h1>Test</h1>',
            to: 'reymerxd0@gmail.com',
            subject: 'Test',
            attachments: expect.any(Array)
        }
       )
    });


    test('should send email with attachments', async () => {
        const email = 'reymerxd0@gmail.com'
        await emailService.sendEmailWithFileSystemLogs(email)
        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs del servidor',
            htmlBody: expect.any(String),
            attachments: expect.arrayContaining([
                { filename: 'logs-all.log', path: './logs/logs-all.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-hight.log', path: './logs/logs-hight.log' },    
            ])
        })

    });
});