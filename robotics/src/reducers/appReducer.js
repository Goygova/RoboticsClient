import CompanyModel from '../models/CompanyModel';

const companies = [new CompanyModel(1, 'Company One'), new CompanyModel(2, 'Company Two')];
const menuItems = [
	{ name: 'Dashboard', path: '/dashboard' },
	{ name: 'Robots', path: '/robots' }
];

const initialAppState = {
	companies: companies,
	currentCompany: companies[0],
	menuItems: menuItems,
	robots: [],
	history: []
};

export default (state = initialAppState, action) => {
	switch (action.type) {
		case 'SET_COMPANY':
			return {
				...state,
				currentCompany: action.payload
			};
		case 'ADD_ROBOT':
			return {
				...state,
				robots: [...state.robots, action.payload]
			};
		case 'UPDATE_HISTORY':
			return {
				...state,
				history: [...state.history, action.payload]
			};
		case 'DELETE_ROBOT':
			return {
				...state,
				robots: state.robots.filter(robot => robot.robotId !== action.payload)
			};
		default:
			return state;
	}
};
