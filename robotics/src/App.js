import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import LeftMenu from './components/LeftMenu';
import Robots from './components/Robots';
import Dashboard from './components/Dashboard';

function App() {
	return (
		<div className='App'>
			<LeftMenu />
			<div>
				<Route path='/robots' component={Robots} />
				<Route path='/dashboard' component={Dashboard} />
			</div>
		</div>
	);
}

export default App;
