import React, {useState, useEffect} from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {useNavigate, useLocation} from 'react-router-dom';
import {SDaata} from './SDaata';


const useInput = (initialValue) => {
    const [value, setValue] = useState('');

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return{value, onChange}

}

function Page() {

    const navigate = useNavigate();
    const {state} = useLocation();

    const [data, setData] = useState({
        id: 0,
        fName: '',
        lName: '',
        email: ''
    })

    const firstName = useInput('');
    const lastName = useInput('');
    const email = useInput('');


    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    },[] )
    
    const loadItems = async () => {
        try{
            await axios.get("http://localhost:8080/api/employees", {
                auth: {
                    username: SDaata[0].username,
                    password: SDaata[0].password,
                    enabled: SDaata[0].enabled
                }
            }).then((resp) => {
                console.log(resp.data);
                setItems(resp.data);
            })
        }catch(err){
            console.error(err);
        }
        
    }

    // const clickRemovefname = () => {
    //     document.getElementById('fNameupdate').setAttribute("disabled", false);
    //     console.log("clickk")
    // }

    const submitHandle = async(e) => {
        e.preventDefault();
        let fName = document.getElementById('fName');
        let lName = document.getElementById('lName');
        let eMail = document.getElementById('eMail');

        const userData = {
            fName: fName.value,
            lName: lName.value,
            email: eMail.value
        }
        try{
            await axios.post("http://localhost:8080/api/employees" ,userData,{
                auth:{
                    username: SDaata[0].username,
                    password: SDaata[0].password,
                    enabled: SDaata[0].enabled
                }
                
            }).then((response) => {
                console.log(response.status, response.token);
                console.log(response.data);
            })
        }catch(err){
            console.error("Error occured during response", err);
        }
        
        fName.value= '';
        lName.value= '';
        eMail.value= '';

        // let exampleModal = document.getElementById('exampleModal');
        // exampleModal.style.display = 'none';
        loadItems();
    }

    const updatePrepare = (itemId) => {

        // ref.current.click();
        const object = items.filter((item) => item.id === itemId);

        let idee = document.getElementById('idee');
        let fNameupdate = document.getElementById('fNameupdate');
        let lNameupdate = document.getElementById('lNameupdate');
        let eMailupdate = document.getElementById('eMailupdate');

        idee.value = object[0].id;
        fNameupdate.value = object[0].fName;
        lNameupdate.value = object[0].lName;
        eMailupdate.value = object[0].email


    }

    const updateHandle = async(e) => {
        e.preventDefault();

        let idee = document.getElementById('idee');
        let fNameupdate = document.getElementById('fNameupdate');
        let lNameupdate = document.getElementById('lNameupdate');
        let eMailupdate = document.getElementById('eMailupdate');

        const userupdateData = {
            id: idee.value,
            fName: fNameupdate.value,
            lName: lNameupdate.value,
            email: eMailupdate.value
        }

        try{
            await axios.put(`http://localhost:8080/api/employees`, userupdateData, {
                auth:{
                    username: SDaata[0].username,
                    password: SDaata[0].password,
                    enbaled: SDaata[0].enabled
                }
            }).then((response) => {
                console.log(response.status, response.token);
                console.log(response.data);
            })
        }catch(err){
            console.error("Error occured in updating", err);
        }

        idee.value = 0;
        fNameupdate.value= '';
        lNameupdate.value= '';
        eMailupdate.value= '';

        loadItems();
    }

    const deleteHandle = async(itemId) => {
        try{
            await axios.delete(`http://localhost:8080/api/employees/${itemId}`, {
                auth:{
                    username: SDaata[0].username,
                    password: SDaata[0].password,
                    enabled: SDaata[0].enabled
                }
            }).then((response) => {
                console.log(response.status, response.token)
            })
        }catch(err){
            console.error("Error occured deleting", err);
        }
        // navigate("/")

        loadItems();
    }

  return (
    <div className=''>
        <div className='bg-info nav text-white'>
            <p className='px-4'>HOME</p>
        </div>
        {/* <!-- Button trigger modal --> */}
            <button type="button" className="btn btn-primary my-3 mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
            ADD EMPLOYEE
            </button>
        <div className='mx-5'>
            <table className='table table-striped mx-3 px-3 py-3 border border-info rounded'>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Create Read Update Delete</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            items.map((item)=>(
                                <tr key={item.id}>
                                    <td>{item.fName}</td>
                                    <td>{item.lName}</td>
                                    <td>{item.email}</td>
                                    <td><button className='btn btn-success my-2 mx-2' data-bs-toggle="modal" data-bs-target="#exampleModalupdate" onClick={() => updatePrepare(item.id)}id='updatebtn'>UPDATE</button><button className='btn btn-danger my-2 mx-2' onClick={() => deleteHandle(item.id)}>DELETE</button></td>
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">ADD NEW EMPLOYEE</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form className='form form-control' onSubmit={submitHandle}>
            <input type='text' placeholder='Enter the first name' id='fName' onChange={firstName.onChange} value={firstName.value} className='my-2 mx-2 form-control'/>
            <input type='text' placeholder='Enter the last name' id='lName' onChange={lastName.onChange} value={lastName.value} className='my-2 mx-2 form-control' />
            <input type='text' placeholder='Enter the email' id='eMail' onChange={email.onChange} value={email.value} className='my-2 mx-2 form-control' />
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-primary" type='submit' value='submit' data-bs-dismiss="modal">Save changes</button>
      </form>
    </div>
  </div>
</div>

{/* <!-- Modal --> */}
<div className="modal fade" id="exampleModalupdate" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <form className='form form-control' onSubmit={updateHandle}>
            <div id='idee'></div>
            <input type='text' placeholder='Enter the first name' id='fNameupdate' onChange={e => setData({...data,[e.target.name]: e.target.value})} className='my-2 mx-2 form-control' />
            <input type='text' placeholder='Enter the last name' id='lNameupdate' onChange={e => setData({...data,[e.target.name]: e.target.value})} className='my-2 mx-2 form-control' />
            <input type='text' placeholder='Enter the email' id='eMailupdate' onChange={e => setData({...data,[e.target.name]: e.target.value})} className='my-2 mx-2 form-control' />
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-primary" type='submit' value='submit' data-bs-dismiss="modal">Save changes</button>
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default Page