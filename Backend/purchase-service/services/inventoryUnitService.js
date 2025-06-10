const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const prisma = new PrismaClient();

class InventoryUnitService {
  static async validateFactoryUnitCode(factoryUnitCode) {
    if (!factoryUnitCode) return true;
    
    try {
      const response = await axios.get(
        `http://localhost:3003/api/factory-units/${factoryUnitCode.toUpperCase()}`,
        { timeout: 5000 }
      );
      return response.status === 200;
    } catch (error) {
      if (error.response?.status === 404) return false;
      throw new Error(`Factory Unit service error: ${error.message}`);
    }
  }

  static async getAllInventoryUnits() {
    return await prisma.inventoryUnit.findMany({
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true,
        InventoryControl: true,
        StreetAddress: true,
        City: true,
        Region: true,
        Country: true,
        PinCode: true,
        factoryUnitCode: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async getInventoryUnitByCode(InventoryUnitId) {
    const unit = await prisma.inventoryUnit.findUnique({
      where: { InventoryUnitId: InventoryUnitId },
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true,
        InventoryControl: true,
        StreetAddress: true,
        City: true,
        Region: true,
        Country: true,
        PinCode: true,
        factoryUnitCode: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!unit) throw new Error('Inventory Unit not found');
    return unit;
  }

  static async createInventoryUnit(data) {
    data.InventoryUnitId = data.InventoryUnitId;
    if (data.factoryUnitCode) {
      data.factoryUnitCode = data.factoryUnitCode;
      const isValid = await this.validateFactoryUnitCode(data.factoryUnitCode);
      if (!isValid) throw new Error('Factory Unit Code does not exist');
    }

    const existingUnit = await prisma.inventoryUnit.findUnique({
      where: { InventoryUnitId: data.InventoryUnitId }
    });
    if (existingUnit) throw new Error('Inventory Unit ID already exists');

    return await prisma.inventoryUnit.create({
      data,
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true,
        InventoryControl: true,
        StreetAddress: true,
        City: true,
        Region: true,
        Country: true,
        PinCode: true,
        factoryUnitCode: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async updateInventoryUnitByCode(InventoryUnitId, data) {
    InventoryUnitId = InventoryUnitId;
    await this.getInventoryUnitByCode(InventoryUnitId); // Verify exists
    
    if (data.factoryUnitCode) {
      data.factoryUnitCode = data.factoryUnitCode;
      const isValid = await this.validateFactoryUnitCode(data.factoryUnitCode);
      if (!isValid) throw new Error('Factory Unit Code does not exist');
    }

    return await prisma.inventoryUnit.update({
      where: { InventoryUnitId },
      data,
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true,
        InventoryControl: true,
        StreetAddress: true,
        City: true,
        Region: true,
        Country: true,
        PinCode: true,
        factoryUnitCode: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  static async deleteInventoryUnitByCode(InventoryUnitId) {
    InventoryUnitId = InventoryUnitId.toUpperCase();
    await this.getInventoryUnitByCode(InventoryUnitId); // Verify exists
    return await prisma.inventoryUnit.delete({
      where: { InventoryUnitId },
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true
      }
    });
  }

  static async getInventoryUnitsByFactoryCode(factoryUnitCode) {
    factoryUnitCode = factoryUnitCode.toUpperCase();
    const isValid = await this.validateFactoryUnitCode(factoryUnitCode);
    if (!isValid) throw new Error('Factory Unit Code does not exist');
    return await prisma.InventoryUnit.findMany({
      where: { factoryUnitCode },
      select: {
        InventoryUnitId: true,
        InventoryUnitName: true,
        InventoryControl: true,
        StreetAddress: true,
        City: true,
        Region: true,
        Country: true,
        PinCode: true,
        factoryUnitCode: true
      }
    });
  }
}

module.exports = InventoryUnitService;