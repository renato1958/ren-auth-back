const signup = async (req, res) => {
    await res.send("<h1>Registra nuovo utente</h1>")
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