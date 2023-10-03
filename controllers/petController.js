const Pet = require('../models/Pets');

const NewPet = async (req, res) => {
    console.log("12");
    const { name, type } = req.body;
    console.log(req.body);
    const owner = global.current_user.username;
    if (!name || !type ||!owner) return res.status(400).json({ 'message': 'Name, type and owner are required.' });

    try {
        //create and store the new user
        const result = await Pet.create({
            "name": name,
            "type": type,
            "owner": owner
        });

        console.log(result);

        res.status(201).json({ 'success': `New pet ${name} created!` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

const getAllPets = async (req, res) => {
}

const deletePet = async (req, res) => {
    if (!req?.body?.name || !req?.body?.owner) return res.status(400).json({ "message": 'pet name and owner required' });
    const pet = await Pet.findOne({ $and: [
        {'name': req.body.name},
        {'owner': req.body.owner}
    ]}).exec();
    if (!pet) {
        return res.status(204).json({ 'message': `Pet ${req.body.name} not found` });
    }
    const result = await pet.deleteOne({ $and: [
        {'name': req.body.name},
        {'owner': req.body.owner}
    ]});
    res.json(result);
}

const getOnePet = async (req, res) => {
}

module.exports = { NewPet, getAllPets,deletePet, getOnePet};