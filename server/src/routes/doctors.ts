import { Router } from 'express';
import Doctor from '../models/Doctor.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = Router();

// Search doctors
router.get('/search', async (req, res) => {
  try {
    const { specialty, language, village, available = 'true' } = req.query;
    
    let whereClause: any = {};
    
    if (specialty) {
      whereClause.specializations = {
        [Op.contains]: [specialty]
      };
    }
    
    if (language) {
      whereClause.languages = {
        [Op.contains]: [language]
      };
    }

    if (available === 'true') {
      whereClause.telemedicineEnabled = true;
    }

    const doctors = await Doctor.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'phone']
        }
      ],
      attributes: ['id', 'regNo', 'specializations', 'qualifications', 'languages', 'available', 'telemedicineEnabled']
    });

    res.json(doctors);
  } catch (error) {
    console.error('Search doctors error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get doctor profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update doctor availability
router.put('/availability', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    const { available, telemedicineEnabled } = req.body;

    if (user?.role !== 'DOCTOR') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const doctor = await Doctor.findOne({ where: { userId: user.id } });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor profile not found' });
    }

    await doctor.update({
      available: available || doctor.available,
      telemedicineEnabled: telemedicineEnabled !== undefined ? telemedicineEnabled : doctor.telemedicineEnabled
    });

    res.json(doctor);
  } catch (error) {
    console.error('Update availability error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;