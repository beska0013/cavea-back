import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {

  @Get()
  getInventory(): string {
    return 'GET inventory';
  }

  @Post()
  createInventory(): string {
    return 'POST inventory';
  }
  @Delete()
  deleteInventory(): string {
    return 'DELETE inventory';
  }




}
