import express from 'express';
import carsRouter from './cars/cars-router';

const router = express.Router();

router.use('/cars', carsRouter);

export default router;
