class Utils {
	randomColor() {
		// return '#' + Math.random().toString(16).substring(2, 8);
		let arr = [];
		for (var i = 0; i < 3; i++) {
			// 暖色
			arr.push(Math.floor(Math.random() * 128 + 64));
			// 亮色
			arr.push(Math.floor(Math.random() * 128 + 128));
		}
		let [r, g, b] = arr;
		const color = `#${r.toString(16).length > 1 ? r.toString(16) : '0' + r.toString(16)}${g.toString(16).length > 1 ? g.toString(16) : '0' + g.toString(16)}${
			b.toString(16).length > 1 ? b.toString(16) : '0' + b.toString(16)
		}`;
		return color;
	}
	getBirTime(day) {
		const fullYear = new Date().getFullYear();
		const isAfter = +new Date(`${fullYear}-${day}`) < Date.now();
		return `${fullYear + (isAfter ? 1 : 0)}-${day}`;
	}
}

module.exports = new Utils();
