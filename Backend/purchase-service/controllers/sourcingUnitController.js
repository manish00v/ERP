const sourcingUnitService = require('../services/sourcingUnitService');

const getAllSourcingUnits = async (req, res) => {
  try {
    const sourcingUnits = await sourcingUnitService.getAllSourcingUnits();
    res.json(sourcingUnits);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch sourcing units',
      details: error.message 
    });
  }
};

const getSourcingUnitById = async (req, res) => {
  try {
    const sourcingUnit = await sourcingUnitService.getSourcingUnitById(req.params.id);
    if (!sourcingUnit) {
      return res.status(404).json({ error: 'Sourcing Unit not found' });
    }
    res.json(sourcingUnit);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch sourcing unit',
      details: error.message 
    });
  }
};

const createSourcingUnit = async (req, res) => {
  try {
    const newSourcingUnit = await sourcingUnitService.createSourcingUnit(req.body);
    res.status(201).json({
      message: 'Sourcing Unit created successfully',
      data: newSourcingUnit
    });
  } catch (error) {
    if (error.message.includes('already exists') || error.message.includes('must be unique')) {
      res.status(409).json({
        error: 'Duplicate entry',
        details: error.message 
      });
    } else {
      res.status(400).json({ 
        error: 'Validation failed',
        details: error.message 
      });
    }
  }
};

const updateSourcingUnit = async (req, res) => {
  try {
    if (req.body.SourcingUnitId) {
      return res.status(400).json({ 
        error: 'Invalid update',
        details: 'Sourcing Unit ID cannot be changed' 
      });
    }

    const updatedSourcingUnit = await sourcingUnitService.updateSourcingUnit(
      req.params.id,
      req.body
    );
    
    if (!updatedSourcingUnit) {
      return res.status(404).json({ error: 'Sourcing Unit not found' });
    }
    
    res.json({
      message: 'Sourcing Unit updated successfully',
      data: updatedSourcingUnit
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to update sourcing unit',
      details: error.message 
    });
  }
};

const deleteSourcingUnit = async (req, res) => {
  try {
    const deletedSourcingUnit = await sourcingUnitService.deleteSourcingUnit(req.params.id);
    
    if (!deletedSourcingUnit) {
      return res.status(404).json({ error: 'Sourcing Unit not found' });
    }
    
    res.json({ 
      message: 'Sourcing Unit deleted successfully',
      deletedId: req.params.id 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to delete sourcing unit',
      details: error.message 
    });
  }
};

module.exports = {
  getAllSourcingUnits,
  getSourcingUnitById,
  createSourcingUnit,
  updateSourcingUnit,
  deleteSourcingUnit
};