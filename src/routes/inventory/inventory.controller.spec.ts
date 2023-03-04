import { Test, TestingModule } from '@nestjs/testing';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';
import { DatabaseModule } from '../../database/database.module';

describe('InventoryController', () => {
  let controller: InventoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([InventoryModel]), DatabaseModule],
      controllers: [InventoryController],
      providers: [InventoryService],
      exports: [InventoryService],
    }).compile();

    controller = module.get<InventoryController>(InventoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
