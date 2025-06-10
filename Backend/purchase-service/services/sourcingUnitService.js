const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SourcingUnitService {
  static async getAllSourcingUnits() {
    return await prisma.sourcingUnit.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getSourcingUnitById(SourcingUnitId) {
    return await prisma.sourcingUnit.findUnique({
      where: { SourcingUnitId }
    });
  }

  static async createSourcingUnit(data) {
    // Simple existence check
    const exists = await prisma.sourcingUnit.findUnique({
      where: { SourcingUnitId: data.SourcingUnitId }
    });
    if (exists) throw new Error('Sourcing Unit ID already exists');

    return await prisma.sourcingUnit.create({
      data: {
        SourcingUnitId: data.SourcingUnitId,
        SourcingUnitDesc: data.SourcingUnitDesc
      }
    });
  }

  static async updateSourcingUnit(SourcingUnitId, data) {
    if (data.SourcingUnitId) {
      throw new Error('Cannot modify SourcingUnitId');
    }
    return await prisma.sourcingUnit.update({
      where: { SourcingUnitId },
      data: { SourcingUnitDesc: data.SourcingUnitDesc }
    });
  }

  static async deleteSourcingUnit(SourcingUnitId) {
    return await prisma.sourcingUnit.delete({
      where: { SourcingUnitId }
    });
  }
}

module.exports = SourcingUnitService;