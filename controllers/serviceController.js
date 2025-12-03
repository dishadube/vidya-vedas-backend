import  service from '../models/Service.js';

export const createService = async (req, res) => {
    try {
        const { title, description, duration, price, level, mode } = req.body;
        const newService = await service.create({ title, description, duration, price, level, mode });
        res.json({ msg: "Service created successfully", newService });
    } catch (error) {
        res.status(400).json({ msg: "Error creating service", error: error.message });
    }
};

export const getService = async (req, res) => {
    const services = await service.find();
    res.json(services);
};




//serviceController.js
