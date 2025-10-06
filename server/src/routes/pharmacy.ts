import { Router } from 'express';
import Pharmacy from '../models/Pharmacy.js';
import InventoryItem from '../models/InventoryItem.js';
import User from '../models/User.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { Op } from 'sequelize';

const router = Router();

// Get nearby pharmacies
router.get('/nearby', async (req, res) => {
  try {
    const { village, district } = req.query;
    
    let whereClause: any = { inventoryShared: true };
    
    if (village) {
      whereClause.address = {
        [Op.like]: `%${village}%`
      };
    }

    const pharmacies = await Pharmacy.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'phone']
        },
        {
          model: InventoryItem,
          as: 'inventory',
          where: { quantity: { [Op.gt]: 0 } },
          required: false
        }
      ]
    });

    res.json(pharmacies);
  } catch (error) {
    console.error('Get nearby pharmacies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search medicine availability
router.get('/medicine/search', async (req, res) => {
  try {
    const { medicine, village } = req.query;
    
    if (!medicine) {
      return res.status(400).json({ error: 'Medicine name required' });
    }

    const items = await InventoryItem.findAll({
      where: {
        medicineName: {
          [Op.like]: `%${medicine}%`
        },
        quantity: { [Op.gt]: 0 }
      },
      include: [
        {
          model: Pharmacy,
          as: 'pharmacy',
          where: { inventoryShared: true },
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['name', 'phone']
            }
          ]
        }
      ]
    });

    res.json(items);
  } catch (error) {
    console.error('Medicine search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get pharmacy inventory (pharmacy owner only)
router.get('/inventory', authenticateToken, requireRole(['PHARMACY']), async (req, res) => {
  try {
    const user = req.user;
    const pharmacy = await Pharmacy.findOne({ where: { userId: user?.id } });
    
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const inventory = await InventoryItem.findAll({
      where: { pharmacyId: pharmacy.id },
      order: [['medicineName', 'ASC']]
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add/Update inventory item
router.post('/inventory', authenticateToken, requireRole(['PHARMACY']), async (req, res) => {
  try {
    const user = req.user;
    const { medicineName, brand, batchNo, expiryDate, quantity, price } = req.body;

    const pharmacy = await Pharmacy.findOne({ where: { userId: user?.id } });
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const item = await InventoryItem.create({
      pharmacyId: pharmacy.id,
      medicineName,
      brand,
      batchNo,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      quantity,
      price
    });

    res.status(201).json(item);
  } catch (error) {
    console.error('Add inventory error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update inventory item
router.put('/inventory/:id', authenticateToken, requireRole(['PHARMACY']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const updateData = req.body;

    const pharmacy = await Pharmacy.findOne({ where: { userId: user?.id } });
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const item = await InventoryItem.findOne({
      where: { id, pharmacyId: pharmacy.id }
    });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.update(updateData);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete inventory item
router.delete('/inventory/:id', authenticateToken, requireRole(['PHARMACY']), async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const pharmacy = await Pharmacy.findOne({ where: { userId: user?.id } });
    if (!pharmacy) {
      return res.status(404).json({ error: 'Pharmacy not found' });
    }

    const item = await InventoryItem.findOne({
      where: { id, pharmacyId: pharmacy.id }
    });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.destroy();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;