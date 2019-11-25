export default class HistoryItemModel {
	constructor(companyId, robotName, action) {
		this.companyId = companyId;
		this.robotName = robotName;
		this.date = new Date();
		this.action = action;
	}

	getFormattedDate() {
		let time = this.date.toDateString();
		return time;
	}
}
