import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryModel } from '../../models/inventory.model';

@Module({
  imports: [SequelizeModule.forFeature([InventoryModel])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryModule {}
