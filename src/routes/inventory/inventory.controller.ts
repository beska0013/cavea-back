import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { PostInventoryDto } from '../../dto/post-inventory.dto';
import { InventoryService } from './inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private srv: InventoryService) {}

  @Get('locations')
  getLocation() {
    return this.srv.getAllLocations();
  }

  @Get()
  getInventoryList(@Query('location') location = '', @Query('page') page = 1) {
    return this.srv.getInventoryList(location, page);
  }

  @Post()
  createInventory(@Body() newItems: PostInventoryDto[]) {
    return this.srv.createNewInventories(newItems);
  }

  @Delete(':id')
  deleteInventoryById(
    @Param('id') inventoryId: string,
    @Body() body: { id: number },
  ) {
    return this.srv.deleteInventoryById(Number(inventoryId), body.id);
  }
}
