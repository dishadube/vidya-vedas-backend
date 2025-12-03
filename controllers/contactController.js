import Contact from "../models/Contact.js"; 

export const newContact = async (req, res) => {
    try {
        const {name, email, phone_no, message} = req.body;
        const newContact = await Contact.create({name, email, phone_no, message});
        res.json({msg: "Contact form submitted successfully", newContact});
    }
    catch (error) {
        res.status(400).json({msg: "Error submitting contact form", error: error.message});
    }
}

export const getContact = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
}

