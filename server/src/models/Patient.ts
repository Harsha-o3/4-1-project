import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import User from './User.js';

export class Patient extends Model {
  public id!: string;
  public userId!: string;
  public dob?: Date;
  public gender?: string;
  public village?: string;
  public address?: string;
  public bloodGroup?: string;
  public allergies?: string;
  public existingConditions?: string;
  public offlineKey?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Patient.init(
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
    dob: {
      type: DataTypes.DATEONLY
    },
    gender: {
      type: DataTypes.STRING(10)
    },
    village: {
      type: DataTypes.STRING(255)
    },
    address: {
      type: DataTypes.TEXT
    },
    bloodGroup: {
      type: DataTypes.STRING(10),
      field: 'blood_group'
    },
    allergies: {
      type: DataTypes.TEXT
    },
    existingConditions: {
      type: DataTypes.TEXT,
      field: 'existing_conditions'
    },
    offlineKey: {
      type: DataTypes.STRING(255),
      field: 'offline_key'
    }
  },
  {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    underscored: true
  }
);

// Associations
Patient.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasOne(Patient, { foreignKey: 'userId', as: 'patient' });

export default Patient;