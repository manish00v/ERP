const inventoryUnitService = require('../services/inventoryUnitService');
const { 
  createInventoryUnitSchema, 
  updateInventoryUnitSchema 
} = require('../validations/inventoryUnitValidation');

const getAllInventoryUnits = async (req, res) => {
  try {
    const InventoryUnits = await inventoryUnitService.getAllInventoryUnits();
    res.json(InventoryUnits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getInventoryUnitByCode = async (req, res) => {
  try {
    const InventoryUnit = await inventoryUnitService.getInventoryUnitByCode(req.params.InventoryUnitId);
    res.json(InventoryUnit);
  } catch (error) {
    res.status(error.message === 'Inventory Unit not found' ? 404 : 500).json({ error: error.message });
  }
};

const getInventoryUnitsByFactoryCode = async (req, res) => {
  try {
    const InventoryUnits = await inventoryUnitService.getInventoryUnitsByFactoryCode(req.params.factoryUnitCode);
    res.json(InventoryUnits);
  } catch (error) {
    const status = error.message.includes('Factory Unit Code does not exist') ? 404 : 500;
    res.status(status).json({ error: error.message });
  }
};

const createInventoryUnit = async (req, res) => {
  try {
    const { error } = createInventoryUnitSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const newInventoryUnit = await InventoryUnitService.createInventoryUnit(req.body);
    res.status(201).json(newInventoryUnit);
  } catch (error) {
    const status = error.message.includes('already exists') ? 409 : 
                 error.message.includes('Factory Unit') ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
};

const updateInventoryUnitByCode = async (req, res) => {
  try {
    const { error } = updateInventoryUnitSchema.validate(req.body);
    if (error) throw new Error(error.details[0].message);

    const updatedInventoryUnit = await inventoryUnitService.updateInventoryUnitByCode(
      req.params.InventoryUnitId,
      req.body
    );
    res.json(updatedInventoryUnit);
  } catch (error) {
    const status = error.message === 'Inventory Unit not found' ? 404 : 
                 error.message.includes('Factory Unit') ? 400 : 500;
    res.status(status).json({ error: error.message });
  }
};

const deleteInventoryUnitByCode = async (req, res) => {
  try {
    await inventoryUnitService.deleteInventoryUnitByCode(req.params.InventoryUnitId);
    res.json({ message: 'Inventory Unit deleted successfully' });
  } catch (error) {
    res.status(error.message === 'Inventory Unit not found' ? 404 : 500).json({ error: error.message });
  }
};

module.exports = {
  getAllInventoryUnits,
  getInventoryUnitByCode,
  getInventoryUnitsByFactoryCode,
  createInventoryUnit,
  updateInventoryUnitByCode,
  deleteInventoryUnitByCode
};