import { Router } from 'express';
import { SymptomCheckerService } from '../services/SymptomChecker.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { symptoms, age, gender, severity } = req.body;

    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return res.status(400).json({ error: 'Symptoms array is required' });
    }

    const result = await SymptomCheckerService.analyzeSymptoms({
      symptoms,
      age: age || 25,
      gender: gender || 'unknown',
      severity: severity || 5
    });

    res.json(result);
  } catch (error) {
    console.error('Symptom checker error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;