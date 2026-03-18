import React, { createContext, useState } from 'react'

export const authDataContext = createContext()

const AuthContext = ({children}) => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000"
    const [loading, setLoading] = useState(false)

    let value = {
        serverUrl,
        loading,
        setLoading
    }
    
    return (
        <div>
            <authDataContext.Provider value={value}>
                {children}
            </authDataContext.Provider>
        </div>
    )
}

export default AuthContext
