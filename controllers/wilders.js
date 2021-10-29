const WilderModel = require('../models/Wilder');

module.exports = {
    create: async (req, res, next) => {
        try {
            await WilderModel.init();
            const wilder = new WilderModel(req.body);
            const result = await wilder.save();
            res.json({ success: true, result });
        } catch (err) {
            next(err);
        }
    },
    read: async (req, res, next) => {
        try {
            const result = await WilderModel.find();
            res.json({ success: true, result });
        } catch (err) {
            next(err);
        }
    },
    update: async (req, res, next) => {
        try {
            const wilder = req.body;
            const result = await WilderModel.findOneAndUpdate({ _id: wilder._id} , { name: wilder.name, city: wilder.city, skills: wilder.skills }, { new:true });
            res.json({ success: true, result });
        } catch (err) {
            next(err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const result= await WilderModel.deleteOne({ _id: req.body._id })
            res.json({ success: true, result });
        } catch (err) {
            next(err);
        }
    }
}