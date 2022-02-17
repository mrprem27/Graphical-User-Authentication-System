import React, { useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import * as api from '../../api'
import { useGlobalContext } from '../../context/App';
import './style.css'
import select from '../../images/select.jpg'
import Options from '../Login/Options/Options'

export default function Signup() {
    const { viewModal, setLoader, isLogined, serverUrl } = useGlobalContext();
    const [images, setImages] = useState({ img0: null, img1: null, img2: null, img3: null, img4: null })
    const temp = [0, 0, 0, 0, 0];
    const [tog, setTog] = useState(true);
    const [options, setOptions] = useState([]);
    const [images2, setImages2] = useState([])
    const optionsState = useRef([]);
    const username = useRef(null);
    const [done, setDone] = useState(false);
    const [isAccCreated, setIsAccCreated] = useState(false);

    const submitHandler = async (e) => {
        setLoader(true);
        e.preventDefault();
        var formData = new FormData(e.target);
        const date = new Date();

        if (username.current.value.length > 25 || username.current.value.length < 3)
            viewModal("Length of username should be more than 3 and less than 25");
        else {
            if (!tog) {
                try {
                    const { data } = await api.createUser2({username:username.current.value, images2})
                    setIsAccCreated(true)
                    viewModal("sucess")
                } catch (e) {
                    console.log(e.message);
                    viewModal('Username Already Taken !!')
                    // console.log(e);
                };
                setLoader(false)
                return;
            }
            let sizeExceed = temp.map((f, i) => {
                if (images["img" + i].size > (2.5 * 1020 * 1020))
                    return true;
                return false;
            });
            if (sizeExceed.includes(true))
                viewModal("Size of One Of the Selected File is greater than 2.5MB")
            else {
                try {
                    const { data } = await api.createUser(formData, date.getTime())
                    setIsAccCreated(true)
                    viewModal("sucess")
                } catch (e) {
                    viewModal('Username Already Taken !!')
                    // console.log(e);
                };
            }
        }
        setLoader(false);
    }
    const cancelCI = async () => {
        setTog(true);
        setImages2([]);
        setOptions([]);
    }
    const fetch = async () => {
        setLoader(true);
        setImages2([]);
        setOptions([]);
        setTog(!tog);
        setDone(false)
        setImages({ img0: null, img1: null, img2: null, img3: null, img4: null })
        if (!tog) {
            setLoader(false);
            return;
        }
        try {
            const { data } = await api.fetchOptions();
            setOptions(data.options);
            optionsState.current = Array.from({
                length: data.options.length
            }, () => false);
        } catch (e) {
            console.log(e);
        };
        setLoader(false);
    }
    return (
        (isAccCreated || isLogined) ? <Navigate to={'/login'} /> :
            <div className='signup-container'>
                <button onClick={fetch}>{tog ? "Suggest Images" : "Want To Upload Custom Images"}</button>
                <form onSubmit={submitHandler}>
                    <div className="signup-input">
                        <input type="text" placeholder='username' name='username' ref={username} />
                        {tog && temp.map((x, i) =>
                            <input key={i} type="file" id={"file" + i} accept="image/jpeg,image/jpg,image/jfif,image/png" placeholder="img" multiple={false} name={"file" + i} onChange={(e) => setImages({ ...images, ["img" + i]: e.target.files[0] })} required />
                        )}
                        <input type="submit" value='SingUp' />
                        <p>Already an User</p><Link to="/login">Click here to login</Link>
                    </div>
                    <div className='signup-selection'>
                        <h3>Selected Images</h3>
                        {tog ? <div>
                            {temp.map((x, i) =>
                                <img width={200} key={i} src={images["img" + i] ? URL.createObjectURL(images["img" + i]) : select} alt="this is an image" />
                            )}
                        </div> : <div>
                            {images2.map((x, i) =>
                                <img width={200} key={i} src={`${serverUrl}/ck/${x}`} alt="this is an image" />
                            )}
                        </div>}
                    </div>
                </form>
                {(!tog && !done && options.length > 0) && <Options selectedImg={images2} setSelectedImg={setImages2} optionsState={optionsState} username={username} signup={true} options={options} cancelCI={cancelCI} setDone={setDone} />}
            </div>
    )
}
