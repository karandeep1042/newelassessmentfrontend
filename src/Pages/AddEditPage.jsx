import React, { useEffect } from 'react'
import '../CSS//AddEditPage.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Bounce } from 'react-toastify';

function AddEditPage() {
    const isUpdate = useSelector((state) => state.ID.isUpdate);
    const isOnlyRead = useSelector((state) => state.ID.isOnlyRead);
    const eid = useSelector((state) => state.ID.staffId);
    const navigate = useNavigate();

    const validateCredentials = () => {
        const input = document.getElementsByClassName('addeditforminput');
        const cb = document.querySelectorAll('input[type="checkbox"]:checked');
        const rb = document.querySelectorAll('input[type="radio"]:checked');
        let hobbyarr = [];
        for (let i = 0; i < input.length; i++) {
            if (input[i].value === "") {
                toast.error("Please fill all the fields");
                input[i].style.borderColor = "red";
                return;
            } else {
                input[i].style.borderColor = "black";
            }
        }

        if (cb.length === 0) {
            toast.error("Please select atleast 1 Hobby");
            return;
        }

        if (rb.length === 0) {
            toast.error("Please select Gender");
            return;
        }

        for (let i = 0; i < cb.length; i++) {
            hobbyarr.push(cb[i].value);
        }

        let data = {
            name: input[0].value,
            department: input[1].value,
            date: input[2].value,
            address: input[3].value,
            hobbies: hobbyarr,
            rb: rb[0].value
        }
        if (isUpdate) {
            updatestaff(data);
        } else {
            addnewstaff(data);
        }
    }

    const addnewstaff = async (data) => {
        let res = await fetch("https://newelassessmentbackend.onrender.com/addstaff", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })

        res = await res.json();

        if (res.msg === "usercreated") {
            toast.success("Employee created Successfully");
            toast.info("You will be redirected to List page in few seconds");
            setTimeout(() => (
                navigate('/listpage')
            ), 5000);
        } else {
            toast.error("Employee creation failed");
        }
    }

    const updatestaff = async (data) => {
        data.id = eid;
        let res = await fetch("https://newelassessmentbackend.onrender.com/updatestaff", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })

        res = await res.json();

        if (res.msg === "userupdated") {
            toast.success("Employee updated Successfully");
        } else {
            toast.error("Employee updation failed");
        }
    }

    const fetchemployeedetail = async () => {
        const input = document.getElementsByClassName('addeditforminput');
        const cb = document.querySelectorAll('input[type="checkbox"]');
        const rb = document.querySelectorAll('input[type="radio"]');
        let res = await fetch(`https://newelassessmentbackend.onrender.com/getemployee/${eid}`);
        res = await res.json();

        if (res.msg === "datafetched") {
            input[0].value = res.data.ename;
            input[1].value = res.data.edpartment;
            input[2].value = res.data.edoj.slice(0, 10);
            input[3].value = res.data.eaddress;
            rb[0].value.toLowerCase() === res.data.egender ? rb[0].checked = true : rb[1].checked = true;
            for (let i = 0; i < cb.length; i++) {
                for (let j = 0; j < res.hobbies.length; j++) {
                    if (cb[i].value.toLowerCase() === res.hobbies[j].hobbyname) {
                        cb[i].checked = true;
                    }
                }
            }
        }
    }

    useEffect(() => {
        if (isUpdate || isOnlyRead) {
            fetchemployeedetail();
        }
    }, []);

    return (
        <div className='addeditpagemaincontainer'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className="listpageheadersection">
                <div className="listpageheader">
                    <h3>Add-Edit Page</h3>
                </div>
            </div>
            <div className="addeditpagebodysection">
                <div className="addeditpageleftsection">
                    <div className="addeditformitem">
                        <label htmlFor="addeditformname">Name: </label>
                        <input type="text" id='name' style={{borderColor:isOnlyRead?"rgb(187 187 187)":null}} disabled={isOnlyRead ? true : false} className='addeditforminput' />
                    </div>
                    <div className="addeditformitem">
                        <label htmlFor="addeditformdepartment">Department: </label>
                        <select name="addeditformdepartment" disabled={isOnlyRead ? true : false} id="" style={{borderColor:isOnlyRead?"rgb(187 187 187)":null}} className='addeditforminput' >
                            <option value="">Select...</option>
                            <option value="IT">IT</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                        </select>
                    </div>
                    <div className="addeditformitem">
                        <label htmlFor="addeditformdate">Date of Joining: </label>
                        <input type="date" name="addeditformdate" style={{borderColor:isOnlyRead?"rgb(187 187 187)":null}} disabled={isOnlyRead ? true : false} id="" className='addeditforminput' />
                    </div>
                    <div className="addeditformitem">
                        <label htmlFor="addeditformdate">Hobbies: </label>
                        <div className="addeditformcheckboxlistcontainer">
                            <div className="addeditformcheckboxitem">
                                <input type="checkbox" name="reading" id="" value="reading" className='addeditformcbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="reading">Reading</label>
                            </div>
                            <div className="addeditformcheckboxitem">
                                <input type="checkbox" name="swimming" id="" value="swimming" className='addeditformcbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="swimming">Swimming</label>
                            </div>
                            <div className="addeditformcheckboxitem">
                                <input type="checkbox" name="playing" id="" value="playing" className='addeditformcbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="playing">Playing</label>
                            </div>
                            <div className="addeditformcheckboxitem">
                                <input type="checkbox" name="singing" id="" value="singing" className='addeditformcbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="singing">Singing</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="addeditpagerightsection">
                    <div className="addeditformitem">
                        <label htmlFor="addeditformaddress">Address: </label>
                        <textarea name="addeditformaddress" style={{borderColor:isOnlyRead?"rgb(187 187 187)":null}} id="" rows={6} cols={25} className='addeditforminput' disabled={isOnlyRead ? true : false} ></textarea>
                    </div>
                    <div className="addeditformitem">
                        <label htmlFor="addeditformgender">Gender: </label>
                        <div className="addeditformradioitemcontainer">
                            <div className="addeditformradioitem">
                                <input type="radio" name="addeditformgender" value="male" className='addeditformrbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="">Male</label>
                            </div>
                            <div className="addeditformradioitem">
                                <input type="radio" name="addeditformgender" value="female" className='addeditformrbinput' disabled={isOnlyRead ? true : false} />
                                <label htmlFor="">Female</label>
                            </div>
                        </div>
                    </div>
                    <div className="addeditformbuttonsection">
                        {isOnlyRead ? <button onClick={() => { navigate('/listpage') }} id='backbtn'>Back</button> : <>{isUpdate ? <button id='updatebtn' onClick={() => { validateCredentials() }} >Update</button> : <button id='savebtn' onClick={() => { validateCredentials() }} >Save</button>}
                            <button onClick={() => { navigate('/listpage') }} id='backbtn'>Back</button></>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddEditPage