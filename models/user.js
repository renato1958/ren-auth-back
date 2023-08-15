import { Schema, model } from "mongoose";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    sex: {
        type: String,
        enum: {
            values: ["M", "F"],
            message: "Valore {VALUE} non consentito"
        },
        required: true,
    },
    date_of_birth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    password_confirm: {
        type: String,
    },
    refresh_token: {
        type: String,
        default: null,
    }
});

export const userModel = model("User", userSchema);