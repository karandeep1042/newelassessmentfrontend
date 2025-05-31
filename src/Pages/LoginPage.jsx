import React, { useState, CSSProperties } from 'react'
import '../CSS/LoginPage.css'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RiseLoader } from "react-spinners";

const override: CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "block",
    margin: "0 auto",
    zIndex: "10",
    borderColor: "red",
};

function LoginPage() {
    const navigate = useNavigate();
    let [loading, setLoading] = useState(false);
    let color = "#13b375";
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginusernameinput');

        const password = document.getElementById('loginpasswordinput');
        if (username.value === "" || password.value === "") {
            toast.error("Please fill all the fields");
            username.style.borderColor = "red";
            password.style.borderColor = "red";
            return;
        } else {
            username.style.borderColor = "black";
            password.style.borderColor = "black";
        }

        const data = {
            username: username.value,
            password: password.value
        }
        setLoading(true);
        let res = await fetch('https://newelassessmentbackend.onrender.com/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
        })

        res = await res.json();
        if (res.msg === "validuser") {
            setLoading(false);
            navigate('/listpage');
        }
        else {
            setLoading(false);
            username.style.borderColor = "red";
            password.style.borderColor = "red";
            toast.error("Invalid Credentials");
        }
    }

    return (
        <>
            {loading && <div className="overlay"></div>}
            <RiseLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
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
            <div className="infosection">
                <p>
                    Username: admin <br />
                    Password: admin
                </p>
            </div>
            <div className="loginpagemaincontainer">
                <div className="loginformcontainer">
                    <div className="loginformheader">
                        <p>Login</p>
                    </div>
                    <div className="loginformitem" id='loginusername'>
                        <label htmlFor="loginusername">Username: </label>
                        <input id='loginusernameinput' value={username} onChange={(e) => { setUsername(e.target.value) }} type="text" placeholder='Registered Email ID/Mobile No' />
                    </div>
                    <div className="loginformitem" id='loginpassword'>
                        <label htmlFor="loginpassword">Password: </label>
                        <input id='loginpasswordinput' value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" placeholder='Password' />
                    </div>
                    <div className="loginformitem" id='loginbutton'>
                        <button onClick={loginHandler}>Login</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LoginPage