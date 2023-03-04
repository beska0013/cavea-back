import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';
import { Op } from 'sequelize';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryModel) private inventoryModel: typeof InventoryModel,
  ) {}

  async getInventoryList(location = '', pageNumber = 1) {
    const limit = 20;
    const offset = (pageNumber - 1) * limit;
    const attributes = ['id', 'name', 'location', 'price'];
    const options =
      location === ''
        ? { limit, offset, attributes }
        : { limit, offset, attributes, where: { location } };

    return this.inventoryModel.findAndCountAll(options);
  }
  async createNewInventories(newItems: any[]) {
    return await this.inventoryModel.bulkCreate(newItems);
  }
  async deleteInventoryById(inventoryId: number, nextId: number) {
    const nextItem = await this.getNextItem(nextId);
    return await this.inventoryModel
      .destroy({ where: { id: inventoryId } })
      .then(() => nextItem);
  }

  private getNextItem(id: number) {
    return this.inventoryModel.findOne({
      rejectOnEmpty: undefined,
      where: {
        id: {
          [Op.gt]: id,
        },
      },
      order: [['id', 'ASC']],
      limit: 1,
    });
  }
}
