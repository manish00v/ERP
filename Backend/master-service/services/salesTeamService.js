const prisma = require('../prisma/client');
const { 
  validateSalesTeam,
  validateSalesTeamUpdate 
} = require('../validations/salesTeamValidation');

class SalesTeamService {
  static async createSalesTeam(data) {
    const { error } = validateSalesTeam(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    const existingTeam = await prisma.salesTeam.findUnique({
      where: { salesTeamCode: data.salesTeamCode }
    });

    if (existingTeam) {
      throw new Error('Sales Team Code already exists');
    }

    return prisma.salesTeam.create({
      data
    });
  }

  static async getAllSalesTeams() {
    return prisma.salesTeam.findMany();
  }

  static async getSalesTeamById(salesTeamCode) {
    return prisma.salesTeam.findUnique({
      where: { salesTeamCode: (salesTeamCode) }
    });
  }

  static async updateSalesTeam(salesTeamCode, data) {
    const existingTeam = await prisma.salesTeam.findUnique({
      where: { salesTeamCode: (salesTeamCode) }
    });

    if (!existingTeam) {
      throw new Error('Sales Team not found');
    }

    const { error } = validateSalesTeamUpdate(data);
    if (error) {
      throw new Error(error.details.map(detail => detail.message).join(', '));
    }

    if (data.salesTeamCode) {
      delete data.salesTeamCode;
    }

    return prisma.salesTeam.update({
      where: { salesTeamCode: (salesTeamCode) },
      data
    });
  }

  static async deleteSalesTeam(salesTeamCode) {
    return prisma.salesTeam.delete({
      where: { salesTeamCode: (salesTeamCode) }
    });
  }
}

module.exports = SalesTeamService;