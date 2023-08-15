import bcrypt from "bcrypt";
import { userModel } from "../models/user.js"

const signup = async (req, res) => {
    const { first_name, last_name, sex, date_of_birth, email, password, password_confirm } = req.body;
    if(!first_name || !last_name || !sex || !date_of_birth || !email || !password || !password_confirm ) return res.status(400).json({ Errore: "Tutti i campi sono obbligatori" });

    const isRegistered = await userModel.exists({ email });
    if(isRegistered) return res.status(409).json({ errore: "Email già registrata" });

    if(password.length > 12 || password.length < 6) return res.status(400).json({ Errore: "La password deve comprendere tra 6 e 12 caratteri" });

    if(password !== password_confirm) return res.status(400).json({ Errore: "Le password non coincidono" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser= await userModel.create({first_name, last_name, sex, date_of_birth, email, password: hashedPassword});
        return res.status(201).json({ utente: newUser});
    } catch(err) {
        res.status(500).json({ Errore: err.stack });
    }
}

const login = async (req, res) => {
    await res.send("<h1>Autentica utente</h1>")
}

const logout = async (req, res) => {
    await res.send("<h1>Logout di un utente</h1>")
}

const refresh = async (req, res) => {
    await res.send("<h1>Crea nuovo access token</h1>")
}

export {
    signup,
    login,
    logout,
    refresh,
}