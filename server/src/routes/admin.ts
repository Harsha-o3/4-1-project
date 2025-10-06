import { Router } from 'express';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Pharmacy from '../models/Pharmacy.js';
import Appointment from '../models/Appointment.js';
import InventoryItem from '../models/InventoryItem.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = Router();

// Get dashboard metrics
router.get('/dashboard', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const metrics = {
      users: {
        total: await User.count(),
        patients: await User.count({ where: { role: 'PATIENT' } }),
        doctors: await User.count({ where: { role: 'DOCTOR' } }),
        pharmacies: await User.count({ where: { role: 'PHARMACY' } })
      },
      appointments: {
        today: await Appointment.count({
          where: {
            scheduledTime: { [Op.gte]: startOfToday },
            status: { [Op.in]: ['PENDING', 'CONFIRMED'] }
          }
        }),
        thisWeek: await Appointment.count({
          where: {
            scheduledTime: { [Op.gte]: startOfWeek }
          }
        }),
        thisMonth: await Appointment.count({
          where: {
            scheduledTime: { [Op.gte]: startOfMonth }
          }
        }),
        completed: await Appointment.count({
          where: { status: 'COMPLETED' }
        })
      },
      inventory: {
        lowStock: await InventoryItem.count({
          where: { quantity: { [Op.lt]: 10 } }
        }),
        expiringSoon: await InventoryItem.count({
          where: {
            expiryDate: {
              [Op.between]: [today, new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)]
            }
          }
        })
      }
    };

    res.json(metrics);
  } catch (error) {
    console.error('Dashboard metrics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users with pagination
router.get('/users', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let whereClause: any = {};
    
    if (role && role !== 'ALL') {
      whereClause.role = role;
    }
    
    if (search) {
      whereClause.name = {
        [Op.like]: `%${search}%`
      };
    }

    const users = await User.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit as string),
      offset,
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'name', 'email', 'phone', 'role', 'createdAt']
    });

    res.json({
      users: users.rows,
      total: users.count,
      page: parseInt(page as string),
      totalPages: Math.ceil(users.count / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get recent appointments
router.get('/appointments/recent', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      limit: 10,
      order: [['scheduledTime', 'DESC']],
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, as: 'user', attributes: ['name', 'phone'] }]
        },
        {
          model: Doctor,
          as: 'doctor',
          include: [{ model: User, as: 'user', attributes: ['name'] }]
        }
      ]
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get low stock alerts
router.get('/inventory/alerts', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const lowStock = await InventoryItem.findAll({
      where: { quantity: { [Op.lt]: 10 } },
      include: [
        {
          model: Pharmacy,
          as: 'pharmacy',
          include: [{ model: User, as: 'user', attributes: ['name', 'phone'] }]
        }
      ],
      order: [['quantity', 'ASC']]
    });

    const expiringSoon = await InventoryItem.findAll({
      where: {
        expiryDate: {
          [Op.between]: [
            new Date(),
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          ]
        }
      },
      include: [
        {
          model: Pharmacy,
          as: 'pharmacy',
          include: [{ model: User, as: 'user', attributes: ['name', 'phone'] }]
        }
      ],
      order: [['expiryDate', 'ASC']]
    });

    res.json({ lowStock, expiringSoon });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;