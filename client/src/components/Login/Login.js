import React, { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import * as api from '../../api'
import { useGlobalContext } from '../../context/App';
import Options from './Options/Options';

export default function Signup() {
    const { viewModal, isLogined,setLoader } = useGlobalContext();
    const [selectedImg, setSelectedImg] = useState([])
    const [options, setOptions] = useState([]);
    const [username, setUsername] = useState('')
    const optionsState = useRef([])
    const usernameRef = useRef(null);
    const submitHandler = async (e) => {
        setLoader(true);
        e.preventDefault();

        if (usernameRef.current.value.length > 25 || usernameRef.current.value.length < 3)
            viewModal("Length of username should be more than 3 and less than 25");
        else {
            try {
                const { data } = await api.verifyUser(usernameRef.current.value)
                setOptions(data.options);
                setUsername(usernameRef.current.value)

                optionsState.current = Array.from({
                    length: data.options.length
                }, () => false);
                setSelectedImg([]);

                document.querySelectorAll('.signup-options').forEach((x) => x.style.border = "3px solid black;")
                viewModal("User Found");

            } catch (e) {
                viewModal('No User Exist')
                // console.log(e);
            };
        }
        setLoader(false);
    }

    return (
        isLogined ? <Navigate to={'/'} /> :
            <div className='signup-container'>
                <form style={{ paddingTop: '280px' }} onSubmit={submitHandler}>
                    <div className="signup-input">
                        <input type="text" placeholder='username' name='username' ref={usernameRef} />
                        <input type="submit" value='Login' />
                        <p >Dont have an Account</p><Link to="/signup">Create one</Link>
                    </div>
                </form>
                {options.length>0 && <Options selectedImg={selectedImg} options={options} setSelectedImg={setSelectedImg} optionsState={optionsState} username={username} />}
            </div>
    )
}
