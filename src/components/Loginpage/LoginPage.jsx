import "./LoginPage.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../api/useApi";
import { CommonApi } from "../../api/apiService";



const Loginpage = () => {
  const navigate = useNavigate()
  const [password, setPassword] = useState(null)
  const [email, setemail] = useState(null)
  const [value, setvalue] = useState(false);
  const [Eyelogo, setEyelogo] = useState(false);


  const { request: login, loading: isProcessing, error: error } = useApi(CommonApi.login)
  const handlelogin = async () => {
    try {

      console.log("Call");


      if (validation()) {
        console.log("Call 1");
        const res = await login({ email, password });
        console.log("res", res);

        localStorage.setItem("token", res?.token);   // single token key
        localStorage.setItem("role", res?.role);   // single token key
        localStorage.setItem("profile", JSON.stringify(res?.profile));
        // role saved
        toast.success("Login success")

        // if (res.data?.role === "superadmin") {
        //   navigate("/super-admin/dashboard", { replace: true });
        // }
        // else if (res.data?.role === "doctor") {
        //   navigate("/doctor", { replace: true });
        // }
        // else if (res.data?.role === "medicalDirector") {
        //   navigate("/md/dashboard", { replace: true });
        // }
        if (res?.role === "personalAssitant") {
          navigate("/pa")
        }
        if (res?.role === "doctor") {
          navigate("/")
        }

      }
    } catch (error) {
      console.log("ererfv", error);
      toast.error({ error: error.response?.data?.message || "Internal Server Error" });
    }
  };


  const validation = () => {
    if (!email) {
      toast.info({ email: "Please Enter Email" });
      return false;
    }
    if (!password) {
      toast.info({ password: "Please Enter Password" });
      return false;
    }
    if (email.trim() === "") {
      toast.info({ email: "Email Can't be Empty" });
      return false;
    }
    if (password.trim() === "") {
      toast.info({ password: "Password Can't be Empty" });
      return false;
    }
    return true;
  };


  return (
    <div className="Login_page">
      <div className="login-page-detail">
        <div className="login">
          <span>Log in</span>
        </div>

        <div className="all-detai">
          <div className="detail">
            <label htmlFor="">Email</label>
            <input onChange={(e) => setemail(e.target.value)} style={{ width: "100%", color: "black", cursor: "auto" }} type="email" placeholder="Enter your email" />
            {error?.email && (<p>{error?.email}</p>)}
            <label htmlFor="">Password</label>
            <div style={{ display: "flex", width: '100%', padding: '0 5px', border: "0.3px solid lightgray ", borderRadius: "7px" }} >
              <input onChange={(e) => setPassword(e.target.value)} style={{ color: "black", cursor: "auto", border: "none" }} type={value ? 'text' : 'password'} placeholder="Enter your password" />
              {/* <span onClick={() => { setvalue(!value); setEyelogo(!Eyelogo) }}>{Eyelogo ? <BsEyeSlash /> : <BsEye />}</span> */}
            </div>
            {error?.password && (<p>{error?.password}</p>)}
          </div>
          <a style={{
            fontSize: '12px'
          }} href="">forgot Password?</a>
          <button style={{
            marginTop: '10px',
            alignItems: 'center',
            textAlign: 'center',
            width: '90%',
            cursor: 'pointer',
            justifyContent: "center"

          }} className="view-btn" disabled={isProcessing} onClick={handlelogin}> {`${isProcessing ? "login...." : "Log In"}`} </button>
          {error?.error && (<p style={{
            fontSize: '10px',
            color: 'red'
          }}>{error?.error}</p>)}
        </div>

        <div className="other-detail">
          <span> Or continue with </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <span>Don't have account? </span>
            {/* <span>Sign up</span> */}
            <a href="">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage;