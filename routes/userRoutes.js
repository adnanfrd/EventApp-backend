import express from 'express';
import Patient from '../models/userModel.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;

        const newPatient = new Patient({ patientName, doctorName, date });

        await newPatient.save();

        res.status(201).json({ message: "Patient record created successfully", patient: newPatient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;

        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            { patientName, doctorName, date },
            { new: true } 
        );

        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }

        res.status(200).json({ message: "Patient record updated successfully", patient: updatedPatient });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
        if (!deletedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.status(200).json({ message: "Patient record deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
