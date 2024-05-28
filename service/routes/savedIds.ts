import { Request, Response } from 'express';
const Launch = require('../model/launchDetails');

module.exports = async function (req: Request, res: Response) {

    try {
        const launches = await Launch.find({}, { id: 1, _id: 0 });
        res.json(launches);
    } catch (error: unknown) {
        res.status(500).json({ message: 'Oops, Something went wrong' });
    }

}