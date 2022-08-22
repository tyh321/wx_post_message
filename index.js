(async () => {
	const axios = require('axios');
	const dayjs = require('dayjs');

	const { APP_ID, APP_SECRET, TEMPLATE_ID, USER_ID, START_DATE, BIRTHDAY, CITY } = process.env;

	const data = {
		touser: USER_ID,
		template_id: TEMPLATE_ID,
		data: {
			weather: {
				value: '',
			},
			temperature: {
				value: '',
			},
			love_days: {
				value: '',
			},
			birthday_left: {
				value: '',
			},
			words: {
				value: '12',
				color: '#' + Math.random().toString(16).substr(2, 6).toUpperCase(),
			},
		},
	};
	try {
		const { weather, temperature, love_days, birthday_left, words } = data.data;
		// 天气
		const weathersRes = await axios.get(`http://autodev.openspeech.cn/csp/api/v2.1/weather`, {
			params: {
				openId: 'aiuicus',
				clientType: 'android',
				sign: 'android',
				city: CITY,
			},
		});
		const { weather: _weather, temp } = weathersRes.data.data.list[0];
		weather.value = _weather;
		temperature.value = temp;
		// 恋爱天数
		love_days.value = dayjs(new Date()).diff(dayjs(START_DATE), 'days');
		// 生日
		const endTime = `${new Date().getFullYear()}-${BIRTHDAY}`;
		const isAfter = +new Date(endTime) < Date.now();
		const FullYear = new Date().getFullYear() + (isAfter ? 1 : 0);
		const startTime = `${FullYear}-${BIRTHDAY}`;
		const birthday = dayjs(endTime).diff(dayjs(startTime), 'days');
		birthday_left.value = +birthday;
		// 彩虹屁
		const wordRes = await axios.get('https://api.shadiao.pro/chp');
		words.value = wordRes.data.data.text;
		// 获取access_token;
		const accessTokenRes = await axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`);
		// 消息推送
		await axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessTokenRes.data.access_token}`, data);
	} catch (error) {
		console.log(error);
	}
})();