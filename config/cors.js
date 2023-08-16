import { allowedOrigins } from "./allowed_origins.js";

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Origine ${origin} non consentita dalla politica CORS del browser`));
        }
    }    
}

export { corsOptions };