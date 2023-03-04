import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'inventory_tb' })
export class InventoryModel extends Model<InventoryModel> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  price: string;

  @Column({ type: DataType.STRING, allowNull: false })
  location: string;
}
