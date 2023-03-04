import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryModel) private inventoryModel: typeof InventoryModel,
  ) {}

  async getInventoryList(location = '', pageNumber = 1) {
    const limit = 20;
    const offset = (pageNumber - 1) * limit;
    const options =
      location === ''
        ? { limit, offset }
        : { limit, offset, where: { location } };

    return this.inventoryModel.findAndCountAll(options);
  }
  async createNewInventories(newItems: any[]) {
    return await this.inventoryModel.bulkCreate(newItems);
  }

  async deleteInventoryById(inventoryId: number) {
    return await this.inventoryModel.destroy({ where: { id: inventoryId } });
  }
}
