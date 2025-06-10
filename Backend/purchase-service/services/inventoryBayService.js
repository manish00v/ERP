const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class InventoryBayService {
  static async getAllInventoryBays() {
    return await prisma.InventoryBay.findMany({
      include: {
        InventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async getInventoryBayById(InventoryBayId) {
    return await prisma.InventoryBay.findUnique({
      where: { InventoryBayId },
      include: {
        InventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async createInventoryBay(data) {
    // Check if InventoryUnit exists if provided
    if (data.InventoryUnitId) {
      const unitExists = await prisma.inventoryUnit.findUnique({
        where: { InventoryUnitId: data.InventoryUnitId }
      });
      if (!unitExists) {
        throw new Error('Inventory Unit ID does not exist');
      }
    }

    // Check for existing bay+unit combination
    if (data.InventoryUnitId) {
      const existing = await prisma.inventoryBay.findFirst({
        where: {
          InventoryBayId: data.InventoryBayId,
          InventoryUnitId: data.InventoryUnitId
        }
      });
      if (existing) {
        throw new Error('This Inventory Bay + Unit combination already exists');
      }
    }

    return await prisma.inventoryBay.create({
      data: {
        InventoryBayId: data.InventoryBayId,
        InventoryBayName: data.InventoryBayName,
        StockingType: data.StockingType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        InventoryUnitId: data.InventoryUnitId || null
      },
      include: {
        InventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  static async updateInventoryBay(InventoryBayId, data) {
    if (data.InventoryBayId) {
      throw new Error('Inventory Bay ID cannot be changed');
    }

    if (data.InventoryUnitId) {
      const unitExists = await prisma.InventoryUnit.findUnique({
        where: { InventoryUnitId: data.InventoryUnitId }
      });
      if (!unitExists) {
        throw new Error('Inventory Unit ID does not exist');
      }
    }

    return await prisma.inventoryBay.update({
      where: { InventoryBayId },
      data: {
        InventoryBayName: data.InventoryUnitName,
        StockingType: data.StockingType,
        StreetAddress: data.StreetAddress,
        City: data.City,
        Region: data.Region,
        Country: data.Country,
        PinCode: data.PinCode,
        InventoryUnitId: data.InventoryUnitId
      }
    });
  }

  static async deleteInventoryBay(InventoryBayId) {
    return await prisma.inventoryBay.delete({
      where: { InventoryBayId }
    });
  }

  // Get all bays with a specific InventoryBayId
  static async getBaysByBayId(InventoryBayId) {
    return await prisma.inventoryBay.findMany({
      where: { InventoryBayId: InventoryBayId },
      include: {
        InventoryUnit: {
          select: {
            InventoryUnitId: true,
            InventoryUnitName: true
          }
        }
      }
    });
  }

  // Get all bays containing a specific Inventory unit
  static async getBaysByUnitId(unitId) {
    return await prisma.inventoryBay.findMany({
      where: { InventoryUnitId: unitId }
    });
  }
}

module.exports = InventoryBayService;