import React from 'react'
import InputField from '../InputfieldComp'
import ButtonComp from '../ButtonComp'
import './LoginSect.css'
import Icon from '../userimg.png'

function LoginSect() {

    //Space for API functions
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
        Axios.post("http://skynet.lp.upb.edu/~pbruckner18/webpage_frontend/login", {
            email: email,
            password: password,
    }).then((response) => {
        console.log(response);
    });
    };

    return (
        <div className='containerlogin'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Log In
            </h1>
            <InputField
                type='text'
                placeholder='Email'
                value={''}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <InputField
                type='password'
                placeholder='Password'
                value={''}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <ButtonComp 
                text={'Login'}
                disabled={false}
                onClick={login}
             />
        </div>
    )
}

export default LoginSect
