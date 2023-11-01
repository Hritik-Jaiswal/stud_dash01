// const express = require("express");
const router = require('express').Router();
const { Students } = require('../models'); // Assuming you have a Students model defined in your models directory

// router.use(express.json());

// Get method
router.get('/', async (req, res) => {
    try {
        const students = await Students.findAll();
        return res.json(students);
    } catch (err) {
        return res.json(err);
    }
});

// Post method
router.post('/', async (req, res) => {
    try {
        const student = await Students.create(req.body);
        return res.status(201).json({message: "Created successfully", data: student});
    } catch (err) {
        return res.json(err);
    }
});

// Delete method
router.delete('/:id', async (req, res) => {
    try {
        const result = await Students.destroy({ where: { id: req.params.id }});
        return res.status(200).json({message: "Deleted successfully", data: result});
    } catch (err) {
        return res.json(err);
    }
});

// Update method
router.put('/:id', (req, res) => {
    console.log(req.body); // Log the request body

    const studID = req.params.id;
    let updates = req.body;

    // Filter out fields that are not provided in the request body
    updates = Object.fromEntries(Object.entries(updates).filter(([key, value]) => value !== ''));

    const fields = Object.keys(updates);
    const values = Object.values(updates);

    if (fields.length === 0) {
        return res.status(400).json({ message: "No fields to update" });
    }

    const updateData = {};
    fields.forEach((field, index) => {
        updateData[field] = values[index];
    });

    Students.update(updateData, {
        where: { id: studID },
    })
        .then((data) => {
            console.log(data); // Log the database response
            return res.status(200).json({ message: "Updated successfully", data: data });
        })
        .catch((err) => {
            console.log(err); // Log any database errors
            return res.json(err);
        });
});


module.exports = router;
