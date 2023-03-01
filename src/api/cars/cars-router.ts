import express from 'express';

const carsRouter = express.Router();

carsRouter.route('/');
carsRouter.route('/:id');

export default carsRouter;
