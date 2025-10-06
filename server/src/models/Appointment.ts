import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/connection.js';
import Patient from './Patient.js';
import Doctor from './Doctor.js';

export class Appointment extends Model {
  public id!: string;
  public patientId!: string;
  public doctorId!: string;
  public scheduledTime!: Date;
  public status!: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  public mode!: 'VIDEO' | 'AUDIO' | 'IN_PERSON';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Appointment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    patientId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'patient_id'
    },
    doctorId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'doctor_id'
    },
    scheduledTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'scheduled_time'
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'),
      defaultValue: 'PENDING'
    },
    mode: {
      type: DataTypes.ENUM('VIDEO', 'AUDIO', 'IN_PERSON'),
      defaultValue: 'VIDEO'
    }
  },
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointments',
    underscored: true
  }
);

// Associations
Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

export default Appointment;