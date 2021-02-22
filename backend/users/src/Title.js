import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';


function Title(){
	
	const [First_Name, setFname] = useState();
	const [Last_Name, setLname] = useState();
	const [User_Name, setUname] = useState();
	const [Description, setDesc] = useState();
	const [Role_Name, setRole] = useState();
	
	let [details, setDetail] = useState({
		First_Name: '',
		Last_Name: '',
		User_Name:'',
		Description: '',
		Role_Name:'',
	  });
		
	const [roles, setRoles] = useState([]);

	  
	  
	let handleChange = (e) => {
		if (e.target.id === 'First_Name' || e.target.id === 'Last_Name' || e.target.id === 'User_Name' || e.target.id === 'Description'){
			let name = e.target.id;
			let value = e.target.value;
			details[name] = value;
			setDetail(details);
		}		
		else if(e.target.id){
			let name = 'Role_Name';
			let value = e.target.id;
			details[name] = value;
			setDetail(details);
		}
		
		
	  }
	  
	let handleSubmit = (e)=> {
		console.log(JSON.stringify(details))
		axios.post('http://127.0.0.1:8000/createform/api', JSON.stringify(details));
	}
	  
	fetch('http://127.0.0.1:8000/api/')
	.then(res => res.json())
	  .then(
		(result) => {
			setRoles(result);
		} ,
		(error) => {
		  console.log(error); 
		}
	  );
	
	
	return (
	<div>
    <div className="row header2">
		<div className = "col-md-9">
        <h5> <b>New page</b>  </h5>
		</div>
		<div className = "col-md-1">
        <button className="addnew"><Link to={'/'} className="newuser"> Cancel</Link> </button>
		</div>
		<div className = "col-md-1">
        <button className="addnew" onClick= {e => { handleSubmit(e) }} ><Link to={'/'} className="newuser"> Save </Link> </button>
		</div>
    </div>
	<div className="Name">
		<div className="GeneralInfo">
			<div className="section">
				<div className="col-md-10 heading">1- General Information</div>
			</div>
			<form method='post'>
				<label className="col-md-5 required">First Name</label>
				<input className="col-md-5" onChange={handleChange} value={First_Name}  type="text" id="First_Name" name="Fname" placeholder="first Name" defaultValue="" />
				<label className="col-md-5 required">Last Name</label>
				<input className="col-md-5"  onChange={handleChange} value={Last_Name} type="text" id="Last_Name" name="Lname" placeholder="Last Name" defaultValue="" />
				<label className="col-md-5 required">User Name</label>
				<input  className="col-md-5"  onChange={handleChange} value={User_Name} type="text" id="User_Name" name="Uname" placeholder="User Name" defaultValue="" />
				<label className="col-md-5 required">Description</label>
				<input  className="col-md-5"  onChange= {handleChange} value={Description} type="text" id="Description" name="Desc" placeholder="Description" defaultValue="" />
			</form>
			
		
		</div>
		<div className="GeneralInfo">
			
			<div className="section">
				<div className="col-md-10">Roles Information</div>
			</div>
			<p>Select Role(s) from the list below </p>
			<table className="table table-bordered" data-page-size="5">
			<thead><tr><th><input type="checkbox" /></th><th data-sortable="true">Role Name</th><th data-sortable="true">Description</th><th data-sortable="true">Roles</th></tr></thead>
			<tbody>
			
			{
			  roles.map((role, index) => {
				  
				return(
				  <tr key={index}>
				  <td><input type="checkbox" onChange= {handleChange} id = {role['fields'].Role_Name} /></td>
				  <td>{role['fields'].Role_Name}</td>
				  <td>{role['fields'].Description}</td>
				  <td>{role['fields'].Roles}</td>
				</tr>
			);
			  })
			  
			  
			}
			</tbody>
			
			</table>
		</div>
		</div>
		</div>
  );
	
}

export default Title;