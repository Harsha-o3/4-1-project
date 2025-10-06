import { Router } from 'express';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = Router();

// Get all appointments (with role-based filtering)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = req.user;
    let whereClause: any = {};

    if (user?.role === 'PATIENT') {
      const patient = await Patient.findOne({ where: { userId: user.id } });
      whereClause.patientId = patient?.id;
    } else if (user?.role === 'DOCTOR') {
      const doctor = await Doctor.findOne({ where: { userId: user.id } });
      whereClause.doctorId = doctor?.id;
    }

    const appointments = await Appointment.findAll({
      where: whereClause,
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, as: 'user' }]
        },
        {
          model: Doctor,
          as: 'doctor',
          include: [{ model: User, as: 'user' }]
        }
      ],
      order: [['scheduledTime', 'ASC']]
    });

    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new appointment
router.post('/', authenticateToken, requireRole(['PATIENT']), async (req, res) => {
  try {
    const { doctorId, scheduledTime, mode = 'VIDEO' } = req.body;
    const user = req.user;

    const patient = await Patient.findOne({ where: { userId: user?.id } });
    if (!patient) {
      return res.status(400).json({ error: 'Patient profile not found' });
    }

    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(400).json({ error: 'Doctor not found' });
    }

    const appointment = await Appointment.create({
      patientId: patient.id,
      doctorId,
      scheduledTime: new Date(scheduledTime),
      mode,
      status: 'PENDING'
    });

    const fullAppointment = await Appointment.findByPk(appointment.id, {
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, as: 'user' }]
        },
        {
          model: Doctor,
          as: 'doctor',
          include: [{ model: User, as: 'user' }]
        }
      ]
    });

    res.status(201).json(fullAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update appointment status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = req.user;

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Check permissions
    if (user?.role === 'DOCTOR') {
      const doctor = await Doctor.findOne({ where: { userId: user.id } });
      if (appointment.doctorId !== doctor?.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
    } else if (user?.role === 'PATIENT') {
      const patient = await Patient.findOne({ where: { userId: user.id } });
      if (appointment.patientId !== patient?.id) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }

    await appointment.update({ status });
    res.json(appointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get appointment details
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByPk(id, {
      include: [
        {
          model: Patient,
          as: 'patient',
          include: [{ model: User, as: 'user' }]
        },
        {
          model: Doctor,
          as: 'doctor',
          include: [{ model: User, as: 'user' }]
        }
      ]
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;