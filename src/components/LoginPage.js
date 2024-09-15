import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {SDaata} from './SDaata';

const useInput = () => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return {value, onChange}
}

function LoginPage() {

    const navigate = useNavigate();

    const usern = useInput('');
    const pswd = useInput('');

    const handleSubmit = async(e) => {

        e.preventDefault();
        let usern = document.getElementById('usern');
        let pswd = document.getElementById('pswd');

        // const userData = {
        //     username: usern.value,
        //     password: pswd.value,
        //     enabled: 1
        // }
        navigate('/employeepage', {
            state:{
                username: usern.value,
                password: pswd.value
            }
        });

        SDaata.push({
            username: usern.value,
            password: pswd.value,
            enabled: 1
        })
    }

  return (
    <div style={{width: '40vw', marginLeft: '30%', marginTop: '5%'}}>
        <form style={{ padding: '10px 20px',display: 'flex', flexDirection: 'column'}} onSubmit={handleSubmit} className='form form-control bg-secondary'>
            <input required type='text' placeholder='Enter the name' value={usern.value} onChange={usern.onChange} className='my-2 form-control' id='usern' />
            <input required type='text' placeholder='Enter the password' value={pswd.value} onChange={pswd.onChange} className='my-2 form-control' id='pswd' />
            <button type='submit' value='submit' className='btn btn-primary my-2'>SUBMIT</button>
        </form>
    </div>
  )
}

export default LoginPage