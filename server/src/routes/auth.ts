import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Patient from '../models/Patient.js';
import Doctor from '../models/Doctor.js';
import Pharmacy from '../models/Pharmacy.js';
import { OTPService } from '../services/OTPService.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// ----------------- OTP REQUEST -----------------
router.post('/otp/request', async (req, res) => {
  try {
    const { phone, role } = req.body;

    if (!phone || !['PATIENT', 'PHARMACY'].includes(role)) {
      return res.status(400).json({ error: 'Phone number and valid role required' });
    }

    const success = await OTPService.sendOTP(phone);
    if (success) {
      return res.json({ message: 'OTP sent successfully' });
    }

    return res.status(500).json({ error: 'Failed to send OTP' });
  } catch (error) {
    console.error('OTP request error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ----------------- OTP VERIFY -----------------
router.post('/otp/verify', async (req, res) => {
  try {
    const { phone, otp, role, name, additionalData } = req.body;

    if (!OTPService.verifyOTP(phone, otp)) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    // Find or create user
    let user = await User.findOne({ where: { phone } });
    if (!user) {
      user = await User.create({
        phone,
        role,
        name: name || 'Unknown User'
      });

      if (role === 'PATIENT') {
        await Patient.create({ userId: user.id, ...additionalData });
      } else if (role === 'PHARMACY') {
        await Pharmacy.create({
          userId: user.id,
          name: additionalData?.pharmacyName || name || 'Unknown Pharmacy',
          ...additionalData
        });
      }
    }

    // Issue tokens
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    // Send both as cookie + response body
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      token, // ✅ also return in body for SPA/frontend
      refreshToken,
      user: { id: user.id, name: user.name, phone: user.phone, role: user.role }
    });
  } catch (error) {
    console.error('OTP verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ----------------- EMAIL/PASSWORD LOGIN -----------------
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !['DOCTOR', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Email, password, and valid role required' });
    }

    const user = await User.findOne({ where: { email, role } });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      token,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ----------------- REFRESH TOKEN -----------------
router.post('/refresh', async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken || req.headers['x-refresh-token'];

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token required' });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as any;
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const newToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '15m' }
    );

    res.cookie('token', newToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60 * 1000
    });

    res.json({ token: newToken });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(403).json({ error: 'Invalid refresh token' });
  }
});

// ----------------- PROFILE -----------------
router.get('/profile', authenticateToken, async (req: any, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    let profile = null;
    switch (user.role) {
      case 'PATIENT':
        profile = await Patient.findOne({ where: { userId: user.id } });
        break;
      case 'DOCTOR':
        profile = await Doctor.findOne({ where: { userId: user.id } });
        break;
      case 'PHARMACY':
        profile = await Pharmacy.findOne({ where: { userId: user.id } });
        break;
    }

    res.json({
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role },
      profile
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
