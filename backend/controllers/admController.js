import bcrypt from 'bcryptjs';
import AdmModel from "../models/admModel.js";


/*Creating a admin*/
async function CreateAdmin(req, res){
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "E-mail inválido." });
    }
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,20}$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ message: "Nome inválido. Use apenas letras e espaços." });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const newAdmin = await AdmModel.CreateAdmin(name, email, hashedPassword );
        res.status(201).json(newAdmin);
    }catch(err){
        res.status(500).json({ error: 'Failed to create admin' });
    }
}
/*number of pets per species?*/
async function MetricPetBySpecies(req, res){
    try {
        const metrics = await AdmModel.MetricPetBySpecies();
        res.status(200).json(metrics);
    }catch(err){
        res.status(500).json({ error: 'Failed to retrieve metrics' });
    }
}
/*how many is sterelized?*/
async function MetricSterelized(req, res){
    try {
        const metrics = await AdmModel.MetricSterelized();
        for( let i = 0; i < metrics.length; i++){
            if(metrics[i].sterelized === 1){
                metrics[i].sterelized = true
            }
            if(metrics[i].sterelized === 0){
                metrics[i].sterelized = false
            }
    }
        
        res.status(200).json(metrics);
    }catch(err){
        res.status(500).json({ error: 'Failed to retrieve metrics' });
    }
}

/*number of pets per species and breed*/


export default { CreateAdmin, MetricPetBySpecies, MetricSterelized };