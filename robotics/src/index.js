import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const AppWithRouter = withRouter(props => <App {...props} />);

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppWithRouter />
		</Router>
	</Provider>,
	document.getElementById('root')
);
serviceWorker.unregister();
