import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('LogRepositoryImpl', () => {
    
    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }

    const logRespository = new LogRepositoryImpl(mockLogDatasource)

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test('saveLog should call logDatasource with arguments',async () => {
        const log = {level: LogSeverityLevel.High,message: 'test'} as LogEntity

        await logRespository.saveLog(log)
        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log)

    });

    test('getLog should called the datasource with arguments', async () => {
        await logRespository.getLog(LogSeverityLevel.Low)
        expect(mockLogDatasource.getLog).toHaveBeenCalledWith(LogSeverityLevel.Low)

    });

});