import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import './Main.css';
import Main from './Main'
import Nav from './Nav'
import Upd from './Update'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
	<Router>
    <div className="container-fluid">
		<div className="row header">
				<div className="col-md-2 leftsection">
					<div className="left_section">Users</div>
				</div>
				<div className="col-md-10 rightsection">
					<div className="right_section"><ul className="list-inline"><li><a href="#">User Management</a></li></ul></div>
				</div>
			</div>
		<Switch>
              <Route exact path='/' component={Main} />
              <Route path='/new' component={Nav} />
              <Route exact path='/edit/:id' component={Upd} />
        </Switch>
          
    </div>
	</Router>
  );
}

export default App;
