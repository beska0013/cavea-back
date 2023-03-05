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

  getAllLocations(){
    const file = fs.readFileSync('./src/assets/locations.json', 'utf8');
    return JSON.parse(file);
  }

  async getInventoryList(location = '', pageNumber = 1) {
    const limit = 20;
    const offset = (pageNumber - 1) * limit;
    const attributes = ['id', 'name', 'location', 'price', 'createdAt'];
    const order = [['createdAt', 'DESC']];
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

    return Promise.all([
      this.inventoryModel.findAll(options),
      this.inventoryModel.count(),
    ]).then(([data, total]) => ({
      rows: data,
      total: total,
    }));
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
    const options = {
      rejectOnEmpty: undefined,
      where: {
        id: {
          [Op.gt]: id,
        },
      },
      order: [['id', 'ASC']],
      limit: 1,
    } as FindOptions<any>;
    return this.inventoryModel.findOne(options);
  }
}
