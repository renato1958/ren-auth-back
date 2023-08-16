import bcrypt from "bcrypt";
import { userModel } from "../models/user.js";
import jwt from "jsonwebtoken";

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
    const { email, password } = req.body;
    if(!email || !password ) return res.status(400).json({ Errore: "Inserisci email e password" });

    const user = await userModel.findOne({ email }).exec();
    if(!user) return res.status(401).json({ Errore: "Utente inesistente!" });

    const match = await bcrypt.compare(password, user.password);
    if(!match) return res.status(401).json({ Errore: "Password errata!" });

    const accessToken = jwt.sign(
        {
            userid: user._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "180s"
        }
    );

    const refreshToken = jwt.sign(
        {
            userid: user._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "1d"
        }
    );

    user.refresh_token = refreshToken;
    user.save();

    res.cookie("refresh_token", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});

    res.json({ "Access Token": accessToken });
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