import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from 'axios';
import $ from 'jquery';


function Upd(props) {

	const user = props.match.params.id
	//console.log(user);
	
	let deletedata = {'Users':user};
	
	let [First_Name, setFname] = useState();
	let [Last_Name, setLname] = useState();
	let [User_Name, setUname] = useState();
	let [Description, setDesc] = useState();
	let [Role_Name, setRole] = useState();
	
	let [details, setDetail] = useState({
		First_Name: '',
		Last_Name: '',
		User_Name:user,
		Description: '',
		Role_Name:'',
	  });
		
	let [roles, setRoles] = useState([]);
	let [users, setUsers] = useState([]);

	  
	  
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
	
	
	
	let deleteClick = (e)=> {
		console.log(JSON.stringify(details))
		axios.post('http://127.0.0.1:8000/delete/api', JSON.stringify(deletedata));
	}
	  
	 if (props){
		fetch('http://127.0.0.1:8000/users/'+user)
		.then(res => res.json())
		  .then(
			(data) => {
				
				//console.log(data);
				setUsers(data);
			} ,
			(error) => {
			  console.log(error); 
			}
		  );
		  
		  {
			users.map((usrs, index) => {
				First_Name = usrs['fields'].First_Name
				Last_Name = usrs['fields'].Last_Name
				User_Name = usrs['fields'].User_Name
				Description = usrs['fields'].Description			
				
			})
			
		  }
	}
	
	var [Role, setRole_2] = useState();

	
	let checked ='';
	

	if (props){
	fetch('http://127.0.0.1:8000/roles/'+user)
	
	.then(res => res.json())
	  .then(
		(data) => {
			
			//console.log(data);
			setRole_2(data[0].fields.Role_Name);
			
		} ,
		(error) => {
		  console.log(error); 
		}
	  )
	  .catch(err => console.log(err))
	  
	  fetch('http://127.0.0.1:8000/api/')
	  .then(res => res.json())
	  .then(
		(data) => {
			
			//console.log(data);
			setRoles(data);
		} ,
		(error) => {
		  console.log(error); 
		})
	  .catch(err => console.log(err))
	  
	  console.log(Role);
	} 
	 


  return (
		<div className="row content">
			<div className="col-md-2 leftsection">
				<div className="left_section"></div>
			</div>
			<div className="col-md-10 rightsection">
				 <div className="row header2">
					<div className = "col-md-9">
						<h5> <b>Edit page</b>  </h5>
					</div>
					<div className = "col-md-1">
						<button className="addnew"><Link to={'/'} className="newuser"> Cancel</Link> </button>
					</div>
					<div className = "col-md-1">
						<button className="addnew" onClick= {e => { handleSubmit(e) }} ><Link to={'/'} className="newuser"> Save </Link> </button>
					</div>
					<div className = "col-md-1">
						<button className="addnew" onClick= {e => { deleteClick(e) }} ><Link to={'/'} className="newuser"> Delete </Link> </button>
					</div>
				</div>
				<div className="Name">
				
					<div className="GeneralInfo">
						<div className="section">
							<div className="col-md-10 heading">1- General Information</div>
						</div>
						<form method='post'>
							<label className="col-md-5 required">First Name</label>
							<input className="col-md-5" onChange={handleChange} value={First_Name} id="First_Name"   type="text" name="Fname" placeholder="first Name" readOnly />
							<label className="col-md-5 required">Last Name</label>
							<input className="col-md-5" onChange={handleChange} value={Last_Name} id="Last_Name" type="text" name="Lname" placeholder="Last Name" readOnly />
							<label className="col-md-5 required">User Name</label>
							<input  className="col-md-5"  onChange={handleChange} value={User_Name} id="User_Name" type="text" name="Uname" placeholder="User Name" readOnly />
							<label className="col-md-5 required">Description</label>
							<input  className="col-md-5"onChange= {handleChange} defaultValue={Description}  id="Description" type="text" name="Desc" placeholder="Description" />
							
						</form>
						
					
					</div>
					<div className="GeneralInfo">
						
			<div className="section">
				<div className="col-md-10">Roles Information</div>
			</div>
			<p>Select Role(s) from the list below </p>
			<table className="table table-bordered" data-page-size="5">
			<thead><tr><th><input type="checkbox" disabled/></th><th data-sortable="true">Role Name</th><th data-sortable="true">Description</th><th data-sortable="true">Roles</th></tr></thead>
			<tbody>
			
			{
			
			  roles.map((role, index) => {
				  
				return(
				  <tr key={index}>
				  {
					(role['fields'].Role_Name === Role)
					  ? <td><input type="checkbox" id={role['fields'].Role_Name} checked disabled/></td>
					  : <td><input type="checkbox" id={role['fields'].Role_Name} disabled/></td>
				  }
				  
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
		</div>
	);
}

export default Upd;