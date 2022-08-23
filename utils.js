class Utils {
	randomColor() {
		return '#' + Math.random().toString(16).substring(2, 8);
	}
	getBirTime(day) {
		const endTime = `${new Date().getFullYear()}-${day}`;
		const isAfter = +new Date(endTime) < Date.now();
		const fullYear = new Date().getFullYear() + (isAfter ? 1 : 0);
		const startTime = `${fullYear}-${day}`;
		return { endTime, startTime };
	}
}

module.exports = new Utils();
