import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe('Checkservice UseCase', () => {
    const mockRepository = {
        saveLog: jest.fn(),
        getLog: jest.fn()
    }
    const sucessCallback = jest.fn()
    const errorCallback = jest.fn()
    
    
    const checkService = new CheckService(
        mockRepository,
        sucessCallback,
        errorCallback
    )

    beforeEach(() =>{
        jest.clearAllMocks()
    })


    test('should call successCallback when fetch return true', async () => {

        const wasOk = await checkService.execute('https://google.com')
        expect(wasOk).toBe(true) 
        expect(sucessCallback).toHaveBeenCalled()
        expect(errorCallback).not.toHaveBeenCalled()

        expect(mockRepository.saveLog).toHaveBeenCalledWith(
            expect.any(LogEntity)
        )
    });
});