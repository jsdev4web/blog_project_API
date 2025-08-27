// lib/prisma.js
//const { PrismaClient } = require('@prisma/client');
const { PrismaClient } = require('../generated/prisma')


// Initialize Prisma Client
const prisma = new PrismaClient();


// Export the Prisma Client instance
module.exports = {
    prisma
} 

