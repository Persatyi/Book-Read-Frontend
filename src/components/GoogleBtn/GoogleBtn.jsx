import s from "./GoogleBtn.module.scss";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
// import {GoogleLogin} from "react-google-login";
import { toast } from "react-toastify";
import { useGoogleLoginMutation } from "redux/api/bookAPI";
import { useDispatch } from "react-redux";
import { loggedIn } from "redux/auth";


const GoogleBtn = () => {

    // const handleFailure = (result) => {
    //     console.log(result)
    //     toast.error("Something went wrong! Try again!");
    // }

    // const handleLogin = (data) => {
    //     console.log(data)
    // }

    const dispatch = useDispatch();
    const [googleLoginUser] = useGoogleLoginMutation();

    const toSendToken = async (token) => {
        try {
            const response = await googleLoginUser(token).unwrap();

            dispatch(loggedIn(response.token));
        } catch (error) {
            console.log(error)
        }
    }

    function handleCallback(resp) {
        console.log("JWT: ", typeof resp.credential);
        const userObject = jwt_decode(resp.credential);
        console.log(userObject);
        
        const googleToken = resp.credential;
        const googleObj = {
            googleToken
        }
        toSendToken(googleObj);
    }

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleCallback
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInBtn"),
            { theme: "outline", size: "large" }
        );
    }, [])

    return (<div >
        <div id="signInBtn" className={s.signInBtn}></div>
        
        </div>
    )
}

export default GoogleBtn;
