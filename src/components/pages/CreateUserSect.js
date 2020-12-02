import React from 'react'
import InputField from '../InputfieldComp'
import ButtonComp from '../ButtonComp'
import './CreateUserSect.css'
import Icon from '../userimg.png'

function CreateUserSect() {

    //Space for API functions
    const [emailReg, setEmailReg] = useState("");
    const [namesReg, setNamesReg] = useState("");
    const [lastNamesReg, setLastNamesReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [roleReg, setRoleReg] = useState("");

    const createUser = () => {
        Axios.post("http://skynet.lp.upb.edu/~pbruckner18/webpage_frontend/createUser", {
            email: emailReg,
            names: namesReg,
            lastnames: lastNamesReg,
            password: passwordReg,
            role: roleReg,
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
                    setEmailReg(e.target.value);
                }}
            />
            <InputField
                type='text'
                placeholder='Names'
                value={''}
                onChange={(e) => {
                    setNamesReg(e.target.value);
                }}
            />
            <InputField
                type='text'
                placeholder='Last Names'
                value={''}
                onChange={(e) => {
                    setLastNamesReg(e.target.value);
                }}
            />
            <InputField
                type='password'
                placeholder='Password'
                value={''}
                onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}
            />
            <InputField
                type='int'
                placeholder='Role'
                value={''}
                onChange={(e) => {
                    setRoleReg(e.target.value);
                }}
            />
            <ButtonComp 
                text={'Create User'}
                disabled={false}
                onClick={createUser}
             />
        </div>
    )
}

export default CreateUserSect
