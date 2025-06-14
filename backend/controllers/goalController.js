import asyncHandler from "express-async-handler";
import goalModel from "../models/goalModel.js";

export const getGoals = asyncHandler(async(req, res) => {
    // show only goals of current logged in user
    const goals = await goalModel.find({user: req.user._id});
    res.status(200).json(goals);
});



export const setGoal = asyncHandler(async(req, res) => {
    
    // console.log(req.body);
    if(!req.body || !req.body.text) {
        res.status(400);
        throw new Error('Please enter a text field');
    }


    const goal = await goalModel.create({
        text: req.body.text,
        // current logged in user will be attached to the created goal
        user: req.user._id
    });
    res.status(201).json(goal);
});



export const updateGoal = asyncHandler(async(req, res) => {
    const goal = await goalModel.findById(req.params.id);

    if(!goal) {
        res.status(400);
        throw new Error('Provide a goal id')
    };

    if(goal.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to update this goal')
    }


    const updatedGoal = await goalModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
});



export const deleteGoal = asyncHandler(async(req, res) => {
    const goal = await goalModel.findById(req.params.id);
    if(!goal) {
        res.status(400);
        throw new Error('Provide goal id')
    };

    if(goal.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You are not authorized to delete this goal')
    }

    const deletedGoal = await goalModel.findByIdAndDelete(req.params.id);
    res.status(204).json(deletedGoal);
});