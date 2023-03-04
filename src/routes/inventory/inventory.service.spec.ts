import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';
import { DatabaseModule } from '../../database/database.module';

jest.setTimeout(30000);
describe('InventoryService', () => {
  let service: InventoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([InventoryModel]), DatabaseModule],
      providers: [InventoryService],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create 200000 new items', async () => {
    const newItems = [];
    for (let i = 0; i < 200000; i++) {
      newItems.push({
        name: `Item ${i}`,
        location: createLocation(),
        price: 9.99,
      });
    }
    const result = await service.createNewInventories(newItems);
    expect(result.length).toBe(200000);
  });

  function createLocation() {
    const locations = [
      'მთავარი ოფისი',
      'კავეა გალერია',
      'კავეა თბილისი მოლი',
      'კავეა ისთ ფოინთი',
      'კავეა სითი მოლი',
    ];
    const randomLocationIndex = Math.floor(Math.random() * locations.length);
    return locations[randomLocationIndex];
  }
});
