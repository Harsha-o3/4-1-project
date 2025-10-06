import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import User from './User.js';

export class Pharmacy extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public licenseNo?: string;
  public address?: string;
  public contactNumber?: string;
  public openingHours!: any;
  public inventoryShared!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pharmacy.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      field: 'user_id'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    licenseNo: {
      type: DataTypes.STRING(255),
      field: 'license_no'
    },
    address: {
      type: DataTypes.TEXT
    },
    contactNumber: {
      type: DataTypes.STRING(20),
      field: 'contact_number'
    },
    openingHours: {
      type: DataTypes.JSON,
      defaultValue: {},
      field: 'opening_hours'
    },
    inventoryShared: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'inventory_shared'
    }
  },
  {
    sequelize,
    modelName: 'Pharmacy',
    tableName: 'pharmacies',
    underscored: true
  }
);

// Associations
Pharmacy.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Pharmacy, { foreignKey: 'userId', as: 'pharmacy' });

export default Pharmacy;