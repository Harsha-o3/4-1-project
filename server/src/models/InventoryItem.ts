import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import Pharmacy from './Pharmacy.js';

export class InventoryItem extends Model {
  public id!: string;
  public pharmacyId!: string;
  public medicineName!: string;
  public brand?: string;
  public batchNo?: string;
  public expiryDate?: Date;
  public quantity!: number;
  public price!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

InventoryItem.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    pharmacyId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'pharmacy_id'
    },
    medicineName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'medicine_name'
    },
    brand: {
      type: DataTypes.STRING(255)
    },
    batchNo: {
      type: DataTypes.STRING(100),
      field: 'batch_no'
    },
    expiryDate: {
      type: DataTypes.DATEONLY,
      field: 'expiry_date'
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'InventoryItem',
    tableName: 'inventory_items',
    underscored: true
  }
);

// Associations
InventoryItem.belongsTo(Pharmacy, { foreignKey: 'pharmacyId', as: 'pharmacy' });
Pharmacy.hasMany(InventoryItem, { foreignKey: 'pharmacyId', as: 'inventory' });

export default InventoryItem;