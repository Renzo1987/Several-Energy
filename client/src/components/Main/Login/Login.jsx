import { useRef, useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoSeveral from '../../../assets/logo_several.png'
import heroImage from '../../../assets/hero-image.png'
import AuthContext from '../../../context/AuthProvider'
import axios from '../../../api/axios'
const LOGIN_URL = "api/user/login"

const Login = () => {

    const navigate = useNavigate()

    const { setAuth } = useContext(AuthContext)
    const emailRef = useRef()
    const errRef = useRef()

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [success, setSuccess] = useState(false)

    useEffect(() => {
        emailRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' }
                })
            console.log(response?.data)
            const asesor = response?.data?.asesor
            const contacto = response?.data?.contacto
            const delegacion = response?.data?.delegacion
            const accessToken = response?.data?.accessToken
            setAuth({ email, asesor, contacto, delegacion, accessToken })
            setEmail("")
            setPwd("")
            setSuccess(true)
            setTimeout(() => {
                navigate("/home")
            }, 3000);
        } catch (err) {
            if (!err?.response) {
                setErrMsg("No Server Response")
            } else if (err.response?.status === 400) {
                setErrMsg("Missing email or password")
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg("Login failed")
            }
            errRef.current.focus()
        }
        
        
    }

    return (
        <section id="login-section">
            <article className="color-picture-article">
                <img src={heroImage} className="hero-img" alt="" />
            </article>  
            <article id="login-form">
                <img src={logoSeveral} className='auth-logo' alt="" />
                {success ? (
                    <section>
                        <h2>Usuario auténticado</h2>
                        <p>Redirigiendo...</p>
                    </section>
                ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className='login-title'>Iniciar sesión</h2>

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            id="email"
                            ref={emailRef}
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email}
                            placeholder='Email'
                            className='login-input'
                            required
                        />
                        <input 
                            type="password" 
                            id="password"
                            onChange={(e) => setPwd(e.target.value)} 
                            value={pwd}
                            placeholder='Contraseña'
                            className='login-input'
                            required
                        />
                        <a href="#" className='align-start login-a'>¿Has olvidado tu contraseña?</a>
                        <button disabled={ !email || !pwd ? true : false }>Iniciar sesión</button>
                    </form>
                    <p className="align-start">
                        ¿Eres un nuevo colaborador? 
                        <span className='line'>
                            <Link to="/register">
                                <a href="#">Crear cuenta</a>
                            </Link>
                        </span>
                    </p>
                </section>
                )}
            </article>
        </section>
    )
}

export default Login