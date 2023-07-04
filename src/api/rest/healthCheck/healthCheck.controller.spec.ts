import { TerminusModule, TypeOrmHealthIndicator } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheckController } from './healthCheck.controller';

const returnValue = 'returnValue';
const typeOrmHealthIndicatorMock = {
  pingCheck: jest.fn(() => returnValue),
};

describe('HealthCheckController', () => {
  let healthCheckController: HealthCheckController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthCheckController],
      imports: [TerminusModule],
      providers: [
        {
          provide: TypeOrmHealthIndicator,
          useValue: typeOrmHealthIndicatorMock,
        },
      ],
    }).compile();

    healthCheckController = app.get<HealthCheckController>(HealthCheckController);
  });

  describe('root', () => {
    it('should return value', () => {
      const res = healthCheckController.check();
      expect(res).not.toBeNull();
      expect(typeOrmHealthIndicatorMock.pingCheck).toBeCalledTimes(1);
      expect(typeOrmHealthIndicatorMock.pingCheck).toBeCalledWith('database');
      expect(typeOrmHealthIndicatorMock.pingCheck).toReturnWith(returnValue);
    });
  });
});
