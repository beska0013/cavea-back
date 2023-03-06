import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';
import { FindOptions, Op } from 'sequelize';
import * as fs from 'fs';
@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(InventoryModel) private inventoryModel: typeof InventoryModel,
  ) {}

  getAllLocations() {
    const file = fs.readFileSync('./src/assets/locations.json', 'utf8');
    return JSON.parse(file);
  }

  async getInventoryList(location = '', pageNumber = 1) {
    const limit = 20;
    const offset = (pageNumber - 1) * limit;
    const attributes = [
      'id',
      'name',
      'location',
      'price',
      'createdAt',
      'updatedAt',
    ];
    const order = [['updatedAt', 'DESC']];
    const options =
      location === ''
        ? ({ limit, offset, attributes, order } as FindOptions<any>)
        : ({
            attributes,
            where: { location },
            order,
            limit,
            offset: offset,
          } as unknown as FindOptions<any>);
    return this.inventoryModel.findAndCountAll(options).then((res) => ({
      ...res,
      limit: limit,
    }));
  }
  async createNewInventories(newItems: any[]) {
    return await this.inventoryModel.bulkCreate(newItems);
  }
  async deleteInventoryById(inventoryId: number, nextId: number) {
    return await this.inventoryModel
      .destroy({ where: { id: inventoryId } })
      .then(async (res) => {
        const nextItem = await this.getLastUpdatedItem(nextId);
        return {
          deleted_id: inventoryId,
          next_item: nextItem,
          count: res,
        };
      });
  }

  private getLastUpdatedItem(updatedAt: number) {
    const options = {
      rejectOnEmpty: false,
      where: {
        updatedAt: {
          [Op.lt]: updatedAt,
        },
      },
      attributes: ['id', 'name', 'location', 'price', 'createdAt', 'updatedAt'],
      order: [['updatedAt', 'DESC']],
      limit: 1,
    } as FindOptions<any>;
    return this.inventoryModel.findOne(options);
  }
}
