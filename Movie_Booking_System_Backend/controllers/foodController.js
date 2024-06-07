const FoodItem = require('../models/FoodItem');

exports.getFoodItems = async (req, res, next) => {
    try {
        const foodItems = await FoodItem.find();
        res.handleSuccess(foodItems);
    } catch (err) {
        next(err);
    }
};

exports.addFoodItem = async (req, res, next) => {
    const { name, price, description } = req.body;

    try {
        const newFoodItem = new FoodItem({
            name,
            price,
            description,
        });

        await newFoodItem.save();
        res.handleSuccess(newFoodItem);
    } catch (err) {
        next(err);
    }
};
