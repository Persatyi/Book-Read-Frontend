import s from "./GoogleBtn.module.scss";
// import {useState } from "react";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";


const GoogleBtn = () => {

    const handleFailure = (result) => {
        console.log(result)
        toast.error("Something went wrong! Try again!");

    }

    const handleLogin = (data) => {
        console.log(data)
    }

    return (<div >
        {/* <button type="button" onClick="" className={s.googleBtn}>Google</button> */}
        {/* <div id="signInBtn" className={s.signInBtn}></div> */}
        <div>
            <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
            ></GoogleLogin>
        </div>
        
        </div>
    )
}

export default GoogleBtn;
