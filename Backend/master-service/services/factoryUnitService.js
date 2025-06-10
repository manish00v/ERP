const prisma = require('../prisma/client');
const axios = require('axios');
const { 
  validateFactoryUnit,
  validateFactoryUnitUpdate 
} = require('../validations/factoryUnitValidation');

class FactoryUnitService {
  static async createFactoryUnit(data) {
    const { error } = validateFactoryUnit(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    // Check if businessEntityCode exists
    let businessEntityCode = null;
    if (data.businessEntityCode) {
      const businessEntity = await prisma.businessEntity.findUnique({
        where: { businessEntityCode: data.businessEntityCode }
      });
      if (!businessEntity) {
        throw new Error('Business Entity Code does not exist');
      }
      businessEntityCode = businessEntity.businessEntityCode;
    }

    // Check if deliveryLocationCode exists
    let deliveryLocationCode = null;
    if (data.deliveryLocationCode) {
      const deliveryLocation = await prisma.deliveryLocation.findUnique({
        where: { deliveryLocationCode: data.deliveryLocationCode }
      });
      if (!deliveryLocation) {
        throw new Error('Delivery Location Code does not exist');
      }
      deliveryLocationCode = deliveryLocation.deliveryLocationCode;
    }

    // Validate external references if provided
    if (data.InventoryUnitId) {
      await this.validateExternalReference('Inventory-units', data.InventoryUnitId);
    }
    if (data.InventoryBayId) {
      await this.validateExternalReference('Inventory-bays', data.InventoryBayId);
    }
    if (data.sourcingUnitId) {
      await this.validateExternalReference('sourcing-units', data.sourcingUnitId);
    }
    if (data.sourcingTeamId) {
      await this.validateExternalReference('sourcing-teams', data.sourcingTeamId);
    }

    const existingUnit = await prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: data.factoryUnitCode }
    });

    if (existingUnit) {
      throw new Error('Factory Unit Code already exists');
    }

    return prisma.factoryUnit.create({
      data: {
        factoryUnitCode: data.factoryUnitCode,
        factoryUnitName: data.factoryUnitName,
        street1: data.street1,
        street2: data.street2 || null,
        city: data.city,
        state: data.state,
        region: data.region || null,
        country: data.country,
        pinCode: data.pinCode,
        language: data.language,
        businessEntityCode: data.businessEntityCode,
        deliveryLocationCode: data.deliveryLocationCode,
        InventoryUnitId: data.InventoryUnitId || null,
        InventoryBayId: data.InventoryBayId || null,
        sourcingUnitId: data.sourcingUnitId || null,
        sourcingTeamId: data.sourcingTeamId || null
      }
    });
  }

  static async validateExternalReference(resource, id) {
    try {
      const response = await axios.get(`http://localhost:5003/api/${resource}/${id}`);
      if (!response.data) {
        throw new Error(`${resource.replace('-', ' ')} with ID ${id} not found`);
      }
      return true;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        throw new Error(`${resource.replace('-', ' ')} with ID ${id} not found`);
      }
      throw new Error(`Error validating ${resource.replace('-', ' ')}: ${err.message}`);
    }
  }

  static async updateFactoryUnitByCode(code, data) {
    const existingUnit = await prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: code }
    });

    if (!existingUnit) {
      throw new Error('Factory Unit not found');
    }

    const { error } = validateFactoryUnitUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.factoryUnitCode && data.factoryUnitCode !== code) {
      throw new Error('Factory Unit Code cannot be changed');
    }

    const updateData = { ...data };

    // Handle business entity code if provided
    if (data.businessEntityCode !== undefined) {
      if (data.businessEntityCode) {
        const businessEntity = await prisma.businessEntity.findUnique({
          where: { businessEntityCode: data.businessEntityCode }
        });
        if (!businessEntity) {
          throw new Error('Business Entity Code does not exist');
        }
        updateData.businessEntityCode = businessEntity.businessEntityCode;
      } else {
        updateData.businessEntityCode = null;
      }
    }

    // Handle delivery location code if provided
    if (data.deliveryLocationCode !== undefined) {
      if (data.deliveryLocationCode) {
        const deliveryLocation = await prisma.deliveryLocation.findUnique({
          where: { deliveryLocationCode: data.deliveryLocationCode }
        });
        if (!deliveryLocation) {
          throw new Error('Delivery Location Code does not exist');
        }
        updateData.deliveryLocationCode = deliveryLocation.deliveryLocationCode;
      } else {
        updateData.deliveryLocationCode = null;
      }
    }

    // Validate external references if provided
    if (data.InventoryUnitId !== undefined) {
      if (data.InventoryUnitId) {
        await this.validateExternalReference('Inventory-units', data.InventoryUnitId);
      } else {
        updateData.InventoryUnitId = null;
      }
    }
    if (data.InventoryBayId !== undefined) {
      if (data.InventoryBayId) {
        await this.validateExternalReference('Inventory-bays', data.InventoryBayId);
      } else {
        updateData.InventoryBayId = null;
      }
    }
    if (data.sourcingUnitId !== undefined) {
      if (data.sourcingUnitId) {
        await this.validateExternalReference('sourcing-units', data.sourcingUnitId);
      } else {
        updateData.sourcingUnitId = null;
      }
    }
    if (data.sourcingTeamId !== undefined) {
      if (data.sourcingTeamId) {
        await this.validateExternalReference('sourcing-teams', data.sourcingTeamId);
      } else {
        updateData.sourcingTeamId = null;
      }
    }

    return prisma.factoryUnit.update({
      where: { factoryUnitCode: code },
      data: updateData
    });
  }

  static async getAllFactoryUnits() {
    return prisma.factoryUnit.findMany();
  }

  static async getFactoryUnitByCode(code) {
    return prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: code }
    });
  }

  static async deleteFactoryUnitByCode(code) {
    const existingUnit = await prisma.factoryUnit.findUnique({
      where: { factoryUnitCode: code }
    });

    if (!existingUnit) {
      throw new Error('Factory Unit not found');
    }

    return prisma.factoryUnit.delete({
      where: { factoryUnitCode: code }
    });
  }
}

module.exports = FactoryUnitService;