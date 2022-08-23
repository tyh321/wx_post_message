class Utils {
	randomColor() {
		// return '#' + Math.random().toString(16).substring(2, 8);
		let a = 20,
			b = 230,
			c = Math.floor(Math.random() * 255);
		function randomSort() {
			return Math.random() < 0.5 ? -1 : 1;
		}
		let randomArray = [a, b, c].sort(randomSort);
		return `rgb(${randomArray[0]},${randomArray[1]},${randomArray[2]})`;
	}
	getBirTime(day) {
		const fullYear = new Date().getFullYear();
		const isAfter = +new Date(`${fullYear}-${day}`) < Date.now();
		return `${fullYear + (isAfter ? 1 : 0)}-${day}`;
	}
}

module.exports = new Utils();
