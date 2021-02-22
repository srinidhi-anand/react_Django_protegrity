import React , {useState} from 'react';
import './Main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import { Link } from "react-router-dom";
import axios from 'axios'


let ReactBsTable  = require('react-bootstrap-table');
let BootstrapTable = ReactBsTable.BootstrapTable;
let TableHeaderColumn = ReactBsTable.TableHeaderColumn;

function Main() {
	
	
	//var onDeleteRow = (e) => {console.log('delete---'+e.value);}
	
	let data = {};
	
	function onDataclick(props){
		console.log('props' ,props);
	}
	
	
	function viewmail(cell, row,field){
		console.log(row);
    return <Link to={'/edit/'+row.Users } onClick={onDataclick(row.Users)} className='btn btn-outline-primary btn lg'>Edit</Link> ;
  }
	
	let products =[];
		
	const [users, setUsers] = useState([]);
	

	  
	fetch('http://127.0.0.1:8000/users/')
	.then(res => res.json())
	  .then(
		(result) => {
			setUsers(result);
		} ,
		(error) => {
		  console.log(error); 
		}
	  );
	  
	 users.map((user, index) => {
		let data = {}  
			console.log(user['fields'].User_Name);		
	  data['Users'] = user['fields'].User_Name
	  data['Roles'] = user['fields'].Role_Name
		products.push(data)		  
			  }) 
		
	
	
	return (
		<div className="row content">
		   <div className="col-md-2">
			  <div className="left_section"></div>
		   </div>
		   <div className="col-md-10">
			  <div className="row header2">
				 <div className="col-md-5">Manage Users</div>
			  </div>
			  <div className="row btn_add">
				 <div className="col-md-12 inline_class">
					<input className="search" type="text" placeholder="Search.." name="search" />
					<button className="search" type="submit"><i className="fa fa-search"></i></button>
					<button className="addnew"><Link to={'/new'} className="newuser">Add User</Link></button>
				 </div>
				 <div className="table_content">
					<BootstrapTable data={products} search ={true}  pagination= {true}  striped hover>
					<TableHeaderColumn isKey={true} dataSort={true} dataField='Users' dataAlign='left' width='500' >Users</TableHeaderColumn>
					<TableHeaderColumn dataField='Roles' dataSort={true} dataAlign='left' width='400' >Roles</TableHeaderColumn>
					<TableHeaderColumn dataField='edit' dataFormat={viewmail}>Edit</TableHeaderColumn>
					</BootstrapTable>
				 </div>
			  </div>
		   </div>
		</div>
	
  
  
	);
  
}

export default Main;
