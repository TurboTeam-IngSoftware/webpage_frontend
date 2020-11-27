import React from 'react'
import InputField from '../InputfieldComp'
import ButtonComp from '../ButtonComp'
import './LoginSect.css'
import Icon from '../userimg.png'

function LoginSect() {

    //Space for API functions
    //Login function

    return (
        <div className='containerlogin'>
             <img src={Icon} alt='icon' className='icon'/>
            <h1 className='title'>
                Log In
            </h1>
            <InputField
                type='text'
                placeholder='Username'
                value={''}
                //onChange={(val) => do something}
            />
            <InputField
                type='password'
                placeholder='Password'
                value={''}
                //onChange={(val) => do something}
            />
            <ButtonComp 
                text={'Login'}
                disabled={false}
                //onClick={() => this.doLogout() }     //need a function here
             />
        </div>
    )
}

export default LoginSect
