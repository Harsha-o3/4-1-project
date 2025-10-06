import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import bcrypt from 'bcryptjs';

export class User extends Model {
  declare id: string;
  declare role: 'PATIENT' | 'DOCTOR' | 'PHARMACY' | 'ADMIN';
  declare email: string | null;
  declare phone: string | null;
  declare passwordHash: string | null;
  declare name: string;
  declare meta: any | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public async comparePassword(password: string): Promise<boolean> {
    if (!this.passwordHash) return false;
    return bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    role: {
      type: DataTypes.ENUM('PATIENT', 'DOCTOR', 'PHARMACY', 'ADMIN'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      validate: { isEmail: true }
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      field: 'password_hash'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    meta: {
      type: DataTypes.JSON,
      defaultValue: null
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.passwordHash) {
          user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
        }
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('passwordHash') && user.passwordHash) {
          user.passwordHash = await bcrypt.hash(user.passwordHash, 12);
        }
      }
    }
  }
);

export default User;