import s from "./GoogleBtn.module.scss";
import {useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// require("dotenv").config();
// const { GOOGLE_CLIENT_ID } = process.env;


const GoogleBtn = () => {
    const [user, setUser] = useState({});

    function handleCallbackResponse(resp) {
        console.log("JWT ID token:", resp.credential);
        const userObject = jwt_decode(resp.credential);
        console.log(userObject);
        setUser(userObject);
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: "403475396262-b256v86f1r499qbgohf79fu1num116oi.apps.googleusercontent.com",
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInBtn"),
            { theme: "outline", size: "large" }
        );
    }, []);

    

    return (<div >
        <button type="button" onClick="" className={s.googleBtn}>Google</button>
        <div id="signInBtn" className={s.signInBtn}></div>
        {user && 
        <div></div>}
        </div>
    )
}

export default GoogleBtn;