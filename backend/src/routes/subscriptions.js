const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

// POST /api/create-subscription
router.post('/create-subscription', subscriptionController.createSubscription);

// GET /api/subscription/:id
router.get('/subscription/:subscriptionId', subscriptionController.getSubscription);

// POST /api/cancel-subscription/:id
router.post('/cancel-subscription/:subscriptionId', subscriptionController.cancelSubscription);

module.exports = router;
