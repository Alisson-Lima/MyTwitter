// Hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// Styles
import "./style.css"
import { useAuthentication } from "../../hooks/useAuthentication"

const LoginRegister = () => {

    // States
    const [checkboxPass, setCheckboxPass] = useState("password")
    const [sideForm, setSideForm] = useState("login")

    // Hooks
    const navigate = useNavigate()
    const {login, createUser, error, loading} = useAuthentication() 

    // Register variables
    const [userName, setUserName] = useState("")
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPass, setRegisterPass] = useState("")
    const [registerAvatar, setRegisterAvatar] = useState("")

    // Login variables
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPass, setLoginPass] = useState("")

    // Login
    const handleSubmitLogin = async (e)=>{
        e.preventDefault()

        const user = {
            email: loginEmail,
            pass: loginPass
        }

        const res = await login(user)

        setLoginEmail("")
        setLoginPass("")
        navigate("/home")
    }

    // Register
    const handleSubmitRegister = async (e) =>{
        e.preventDefault()

        setRegisterAvatar("./img/avatar1.png")

        const user = {
            name: userName,
            email: registerEmail,
            pass: registerPass,
            avatar: registerAvatar,
        }

        const res = await createUser(user)

        setRegisterEmail("")
        setRegisterPass("")
        setUserName("")

        navigate("/home")
    }

    // Show password
    const handleShowPass =() =>{
        checkboxPass === "password" ? setCheckboxPass("text") : setCheckboxPass("password")
    }

  return (
    <>
        <div className="loginRegister">
            <div className="navLoginRegister">
                {sideForm === "login" ? (
                    <>
                        <h3 onClick={() => setSideForm("login")} className="sideActived">Login</h3>
                        <h3 onClick={() => setSideForm("register")}>Register</h3>
                    </>
                ) : (
                    <>
                        <h3 onClick={() => setSideForm("login")}>Login</h3>
                        <h3 onClick={() => setSideForm("register")} className="sideActived">Register</h3>
                    </>
                )}
            </div>
            {
            sideForm === "login" ? (
                <>
                    {/* Login Form */}
                    <div className="login_container form_side">
                        <form onSubmit={handleSubmitLogin}>
                            <label>
                                <span>Email:</span> 
                                <input type="email" name="email" placeholder='Digite seu email' onChange={(e) => setLoginEmail(e.target.value)} value={loginEmail} required/>
                            </label>
                            <label>
                                <span>Senha:</span>
                                <input type={checkboxPass} name="pass" placeholder='Digite sua senha' onChange={(e) => setLoginPass(e.target.value)} value={loginPass} required/>
                            </label>
                            <label className="check">
                                <input type="checkbox" name="check" onClick={handleShowPass}/>
                                <span>Mostrar senha</span>
                            </label>
                            { loading && <button className="btn-loading"><span className="loadCircle"></span></button>}
                            { !loading && <input type="submit" value="Entrar" />}
                        </form>
                    </div>
                </>
            ):(
                <>
                    {/* Register Form */}
                    <div className="register_container form_side">
                        <form onSubmit={handleSubmitRegister}>
                            <label>
                                <span>Nome de usuário:</span> 
                                <input type="text" name="name" placeholder='Digite seu nome de usuário' onChange={(e) => setUserName(e.target.value)} value={userName} required/>
                            </label>
                            <label>
                                <span>Email:</span> 
                                <input type="email" name="email" placeholder='Digite seu email' onChange={(e) => setRegisterEmail(e.target.value)} value={registerEmail} required/>
                            </label>
                            <label>
                                <span>Senha min 6 dígitos:</span>
                                <input type={checkboxPass} name="pass" placeholder='Digite uma senha' onChange={(e) => setRegisterPass(e.target.value)} value={registerPass} required/>
                            </label>
                            <label className="check">
                                <input type="checkbox" name="check" onClick={handleShowPass}/>
                                <span>Mostrar senha</span>
                            </label>
                            <div className="avatar display-none">
                                <label>
                                    <input type="radio" name="avatar1"/>
                                    <img src="" alt="Avatar 1" />
                                </label>
                                <label>
                                    <input type="radio" name="avatar2"/>
                                    <img src="" alt="Avatar 2" />
                                </label>
                                <label>
                                    <input type="radio" name="avatar3"/>
                                    <img src="" alt="Avatar 3" />
                                </label>
                            </div>
                            { loading && <button className="btn-loading"><span className="loadCircle"></span></button>}
                            { !loading && <input type="submit" value="Registrar" />}
                        </form>
                    </div>
                </>
            )}

            {error && <div className="errorMessage">{error}</div>}
            <svg viewBox="0 0 119 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M57.0939 6.20677C56.924 5.91855 56.9228 5.56109 57.0908 5.27177L59.3504 1.3802C59.7075 0.765325 60.5956 0.765691 60.9521 1.38086L73.5115 23.0519C73.8692 23.6691 73.4238 24.442 72.7104 24.442H68.2744C67.9457 24.442 67.6416 24.2676 67.4755 23.9839L63.9192 17.91C63.7531 17.6263 63.449 17.4519 63.1202 17.4519H59.8127C59.0996 17.4519 58.6542 16.6798 59.0113 16.0625L60.6681 13.1981C60.8354 12.909 60.8339 12.5522 60.6643 12.2645L57.0939 6.20677Z" fill="#1C1924"/>
                <path d="M55.2414 8.49333C55.5957 7.88191 56.4768 7.87679 56.8381 8.48407L59.0862 12.2621C59.2582 12.5511 59.2599 12.9107 59.0907 13.2014L56.6173 17.4492C56.2579 18.0665 56.7031 18.8409 57.4174 18.8409H62.3245C62.6534 18.8409 62.9576 19.0154 63.1236 19.2992L65.3176 23.0488C65.6787 23.666 65.2336 24.4422 64.5185 24.4422H47.6065C46.8931 24.4422 46.4478 23.6694 46.8054 23.0522L55.2414 8.49333Z" fill="#393640"/>
                <path d="M8.536 42H9.796L5.98 33.6H4.792L0.988 42H2.224L3.148 39.9H7.612L8.536 42ZM3.568 38.94L5.38 34.824L7.192 38.94H3.568ZM11.0491 42H16.7971V40.956H12.2491V33.6H11.0491V42ZM18.1741 42H19.3741V33.6H18.1741V42ZM24.3369 42.096C26.5569 42.096 27.5889 40.992 27.5889 39.708C27.5889 36.624 22.5009 37.908 22.5009 35.856C22.5009 35.124 23.1129 34.524 24.5409 34.524C25.2849 34.524 26.1129 34.74 26.8449 35.208L27.2409 34.248C26.5449 33.768 25.5249 33.504 24.5409 33.504C22.3329 33.504 21.3249 34.608 21.3249 35.904C21.3249 39.024 26.4129 37.728 26.4129 39.78C26.4129 40.512 25.7889 41.076 24.3369 41.076C23.2569 41.076 22.1889 40.668 21.5649 40.104L21.1209 41.04C21.7929 41.664 23.0529 42.096 24.3369 42.096ZM31.79 42.096C34.01 42.096 35.042 40.992 35.042 39.708C35.042 36.624 29.954 37.908 29.954 35.856C29.954 35.124 30.566 34.524 31.994 34.524C32.738 34.524 33.566 34.74 34.298 35.208L34.694 34.248C33.998 33.768 32.978 33.504 31.994 33.504C29.786 33.504 28.778 34.608 28.778 35.904C28.778 39.024 33.866 37.728 33.866 39.78C33.866 40.512 33.242 41.076 31.79 41.076C30.71 41.076 29.642 40.668 29.018 40.104L28.574 41.04C29.246 41.664 30.506 42.096 31.79 42.096ZM40.5872 42.096C43.1432 42.096 45.0392 40.272 45.0392 37.8C45.0392 35.328 43.1432 33.504 40.5872 33.504C38.0072 33.504 36.1112 35.34 36.1112 37.8C36.1112 40.26 38.0072 42.096 40.5872 42.096ZM40.5872 41.028C38.7032 41.028 37.3112 39.66 37.3112 37.8C37.3112 35.94 38.7032 34.572 40.5872 34.572C42.4472 34.572 43.8392 35.94 43.8392 37.8C43.8392 39.66 42.4472 41.028 40.5872 41.028ZM52.8973 33.6V39.864L47.8573 33.6H46.8733V42H48.0733V35.736L53.1133 42H54.0973V33.6H52.8973ZM56.6116 42H60.1516C62.8516 42 64.6876 40.296 64.6876 37.8C64.6876 35.304 62.8516 33.6 60.1516 33.6H56.6116V42ZM57.8116 40.956V34.644H60.0796C62.1556 34.644 63.4876 35.916 63.4876 37.8C63.4876 39.684 62.1556 40.956 60.0796 40.956H57.8116ZM70.3176 42.096C72.8736 42.096 74.7696 40.272 74.7696 37.8C74.7696 35.328 72.8736 33.504 70.3176 33.504C67.7376 33.504 65.8416 35.34 65.8416 37.8C65.8416 40.26 67.7376 42.096 70.3176 42.096ZM70.3176 41.028C68.4336 41.028 67.0416 39.66 67.0416 37.8C67.0416 35.94 68.4336 34.572 70.3176 34.572C72.1776 34.572 73.5696 35.94 73.5696 37.8C73.5696 39.66 72.1776 41.028 70.3176 41.028ZM82.5318 34.644V33.6H76.6038V42H77.8038V38.604H82.0158V37.572H77.8038V34.644H82.5318ZM91.1449 42L89.1529 39.18C90.3289 38.76 91.0009 37.824 91.0009 36.528C91.0009 34.704 89.6809 33.6 87.4969 33.6H84.2209V42H85.4209V39.444H87.4969C87.6769 39.444 87.8569 39.432 88.0249 39.42L89.8369 42H91.1449ZM87.4609 38.424H85.4209V34.644H87.4609C88.9969 34.644 89.8009 35.328 89.8009 36.528C89.8009 37.728 88.9969 38.424 87.4609 38.424ZM96.7317 42.096C99.2877 42.096 101.184 40.272 101.184 37.8C101.184 35.328 99.2877 33.504 96.7317 33.504C94.1517 33.504 92.2557 35.34 92.2557 37.8C92.2557 40.26 94.1517 42.096 96.7317 42.096ZM96.7317 41.028C94.8477 41.028 93.4557 39.66 93.4557 37.8C93.4557 35.94 94.8477 34.572 96.7317 34.572C98.5917 34.572 99.9837 35.94 99.9837 37.8C99.9837 39.66 98.5917 41.028 96.7317 41.028ZM109.042 33.6V39.864L104.002 33.6H103.018V42H104.218V35.736L109.258 42H110.242V33.6H109.042ZM114.424 42H115.612V34.644H118.492V33.6H111.544V34.644H114.424V42Z" fill="#393640"/>
            </svg>

        </div>
    </>
  )
}

export default LoginRegister