import { Request, Response } from 'express';
const Launch = require('../model/launchDetails');

module.exports = async function (req: Request, res: Response) {
    try {
        await Launch.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Record deleted!" });
    } catch (error: unknown) {
        res.status(500).json({ message: 'Failed to delete launch detail' });
    }
}