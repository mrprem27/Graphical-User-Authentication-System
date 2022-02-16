import React from 'react'
import { useGlobalContext } from '../../../context/App';
import './style.css'
import * as api from '../../../api'

export default function Options({ selectedImg, options, setSelectedImg, optionsState, username, signup, cancelCI, setDone }) {
    const { viewModal, setIsLogined, setUsername, setLoader, serverUrl } = useGlobalContext();
    const finalCkr = async (e) => {
        setLoader(true);
        if (selectedImg.length != 5) {
            viewModal('Select 5 Images')
            setLoader(false);
            return;
        }
        try {
            console.log(username);
            const { data } = await api.finalVerifyUser({ username, selectedImg })
            viewModal("Login Succesfully");
            setUsername(data.username);
            setIsLogined(true)
        } catch (e) {
            viewModal('Authentication Failed')
            // console.log(e);
        };
        setLoader(false)
    }
    const toggleImage = ({ e, f, i }) => {
        if (!optionsState.current[i] && selectedImg.length < 5) {
            setSelectedImg((selectedImg) => [...selectedImg, f])
            optionsState.current[i] = true;
            e.target.style.border = "4px solid white";
        } else if (optionsState.current[i] && selectedImg.length > -1) {
            setSelectedImg(selectedImg.filter((x) => f !== x))
            optionsState.current[i] = false;
            e.target.style.border = "3px solid black";
        }
    }
    return (
        <div className='options-container'>
            <div className="options-top">
                <h2>Select Images that you have uploaded/choosed during Registration</h2>
                {signup == true && <button onClick={cancelCI}>Cancel</button>}
                <div>
                    {options.map((f, i) =>
                        <img width={100} className="signup-options" key={i} src={`${serverUrl}/ck/${f}`} onClick={(e) => toggleImage({ e, f, i })} alt="this is an image" />
                    )}
                </div>
            </div>
            <div className="options-bottom">
                <h3>Selected Images (Don't Worry About Order!!😄)</h3>
                <div>
                    <div>
                        {selectedImg.map((x, i) =>
                            <img width={100} key={i} src={`${serverUrl}/ck/${x}`} alt="this is an image" />
                        )}
                    </div>
                    <button onClick={(e) => signup === true ? (selectedImg.length != 5 ? viewModal("Select 5 Images") : setDone(true))
                        : finalCkr(e)} >{signup === true ? 'Images Selected' : 'Login'}</button>
                </div>
            </div>
        </div>
    )
}
