// src/routes/mercado.routes.js
import express from 'express';
import { createPreferenceController } from '../controllers/mercado.controller.js';

const router = express.Router();

router.post('/create-preference', createPreferenceController);

export default router;
