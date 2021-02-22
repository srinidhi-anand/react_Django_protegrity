import React from 'react';
import './App.css';
import Title from './Title'
import 'bootstrap/dist/css/bootstrap.min.css';



function Nav() {
	

	
  return (
		<div className="row content">
			<div className="col-md-2 leftsection">
				<div className="left_section"></div>
			</div>
			<div className="col-md-10 rightsection">
				<Title /> 
				
			</div>
		</div>
	);
}

export default Nav;