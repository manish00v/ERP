require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const businessEntityRoutes = require('./routes/businessEntityRoutes');
const businessUnitRoutes = require('./routes/businessUnitRoutes');
const salesOfficeRoutes = require('./routes/salesOfficeRoutes');
const deliveryLocationRoutes = require('./routes/deliveryLocationRoutes');
const factoryUnitRoutes = require('./routes/factoryUnitRoutes');
const salesChannelRoutes = require('./routes/salesChannelRoutes');
const salesTeamRoutes = require('./routes/salesTeamRoutes');
const salesPersonRoutes = require('./routes/salesPersonRoutes');
const sourcingPersonRoutes = require('./routes/sourcingPersonRoutes');


const prisma = new PrismaClient();
const app = express();

// Enable CORS for all routes
app.use(cors());

// OR configure specific origins
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/business-entities', businessEntityRoutes);
app.use('/api/business-units', businessUnitRoutes);
app.use('/api/sales-offices', salesOfficeRoutes);
app.use('/api/delivery-locations', deliveryLocationRoutes);
app.use('/api/factory-units', factoryUnitRoutes);
app.use('/api/sales-channels', salesChannelRoutes);
app.use('/api/sales-teams', salesTeamRoutes);
app.use('/api/sales-persons', salesPersonRoutes);
app.use('/api/sourcing-persons', sourcingPersonRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = app;