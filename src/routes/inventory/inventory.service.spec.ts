import { Test, TestingModule } from '@nestjs/testing';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';
import { DatabaseModule } from '../../database/database.module';


jest.setTimeout(30000);
describe('InventoryService', () => {
  let service: InventoryService;
  const maxItemsNumber = 200000;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SequelizeModule.forFeature([InventoryModel]), DatabaseModule],
      providers: [InventoryService],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it(`should create ${maxItemsNumber} new items`, async () => {
    const newItems = [];
    for (let i = 0; i < maxItemsNumber; i++) {
      newItems.push({
        name: `Item ${i}`,
        location: createLocation(),
        price: 9.99,
      });
    }
    const result = await service.createNewInventories(newItems);
    expect(result.length).toBe(maxItemsNumber);
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
