import React, { useContext, useEffect, useState } from "react"
import * as api from '../api'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState(true);
    const [loader, setLoader] = useState(true)
    const [isModal, setIsModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [isLogined, setIsLogined] = useState(false);
    const [username, setUsername] = useState('')
    const serverUrl = "https://guas.herokuapp.com"
    // const serverUrl = 'http://localhost:5000'

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await api.checkLogin();
                setUsername(data.username)
                setIsLogined(true);
                setState(false);
                setLoader(false);
            } catch (error) {
                setState(false);
                setLoader(false);
                console.log(error.message);
            }
        }
        fetch();
    }, [])

    const viewModal = (content) => {
        setModalContent(content)
        setIsModal(true);
        setTimeout(() => setIsModal(false), 2500)
    }

    return <AppContext.Provider value={{
        viewModal,
        modalContent,
        isModal,
        isLogined,
        setIsLogined,
        serverUrl,
        username,
        setUsername,
        loader,
        setLoader
    }}>
        {state ? null : children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
//state used don't know why