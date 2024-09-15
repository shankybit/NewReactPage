import React, {useState} from 'react'

const useInput = (initialValue) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);

    }

    return {value, handleChange}
}



function NewRegister() {

    const handleSubmit = (e) => {
        e.preventDefault();
        try{

        }catch{

        }
    }
    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');
    const password = useInput('');
   
  return (
    <form className='form flex flex-column justify-content-around px-3 py-3 bg-secondary w-40' onSubmit={handleSubmit}>
        <input type='text' placeholder='Enter your First Name' value={firstName.value} onChange={firstName.handleChange} className='form-control my-2 w-30'/>
       
        <input type='text' placeholder='Enter your Last Name' value={lastName.value} onChange={lastName.handleChange} className='form-control my-2 w-30' />
       
        <input type='text' placeholder='Enter your Email' value={email.value} onChange={email.handleChange} className='form-control my-2 w-30'/>
       
        <input type='text' placeholder='Enter your password' value={password.value} onChange={password.handleChange} className='form-control my-2 w-30'/>
      
        <button type='submit' value='submit' className='btn btn-primary'>SUBMIT</button>
    </form>
  )
}

export default NewRegister