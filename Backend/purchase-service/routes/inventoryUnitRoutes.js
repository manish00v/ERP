const express = require('express');
const router = express.Router();
const inventoryUnitController = require('../controllers/inventoryUnitController');
const {
  createInventoryUnitSchema,
  updateInventoryUnitSchema
} = require('../validations/inventoryUnitValidation');
const validate = require('../middlewares/validate');

router.get('/', inventoryUnitController.getAllInventoryUnits);
router.get('/:InventoryUnitId', inventoryUnitController.getInventoryUnitByCode);
router.post('/', validate(createInventoryUnitSchema), inventoryUnitController.createInventoryUnit);
router.put('/:InventoryUnitId', validate(updateInventoryUnitSchema), inventoryUnitController.updateInventoryUnitByCode);
router.delete('/:InventoryUnitId', inventoryUnitController.deleteInventoryUnitByCode);
router.get('/factory/:factoryUnitCode', inventoryUnitController.getInventoryUnitsByFactoryCode);

module.exports = router;