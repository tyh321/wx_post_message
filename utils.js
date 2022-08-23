class Utils {
	randomColor() {
		return '#' + Math.random().toString(16).substring(2, 8);
	}
	getBirTime(day) {
		const fullYear = new Date().getFullYear();
		const isAfter = +new Date(`${fullYear}-${day}`) < Date.now();
		return `${fullYear + (isAfter ? 1 : 0)}-${day}`;
	}
}

module.exports = new Utils();
