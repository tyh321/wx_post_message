(async () => {
	const axios = require('axios');
	const dayjs = require('dayjs');
	const utils = require('./utils');

	const { APP_ID, APP_SECRET, TEMPLATE_ID, USER_ID, START_DATE, BIRTHDAY, CITY } = process.env;

	const TEMPLATE_DATA = {
		touser: USER_ID,
		template_id: TEMPLATE_ID,
		data: {
			date: {
				value: '',
			},
			city: {
				value: CITY,
			},
			weather: {
				value: '',
			},
			min_temp: {
				value: '',
			},
			max_temp: {
				value: '',
			},
			love_day: {
				value: '',
			},
			birthday: {
				value: '',
			},
			words: {
				value: '',
				color: utils.randomColor()
			},
		},
	};

	try {
		const { date, weather, min_temp, max_temp, love_day, birthday, words } = TEMPLATE_DATA.data;

		// date
		date.value = dayjs().format('YYYY-MM-DD') + ' 星期' + '日一二三四五六'.charAt(new Date().getDay());

		// 天气
		const { data: weathersRes } = await axios.get(`http://autodev.openspeech.cn/csp/api/v2.1/weather`, {
			params: {
				openId: 'aiuicus',
				clientType: 'android',
				sign: 'android',
				city: CITY,
			},
		});
		const { weather: _weather, high, low } = weathersRes?.data?.list?.[0];
		weather.value = _weather;
		min_temp.value = low + '°C';
		max_temp.value = high + '°C';

		// 恋爱天数
		love_day.value = dayjs(new Date()).diff(dayjs(START_DATE), 'days');

		// 生日
		const birTime = utils.getBirTime(BIRTHDAY);
		birthday.value = Math.abs(dayjs(birTime).diff(dayjs(new Date()), 'days'));

		// 彩虹屁
		const { data: wordRes } = await axios.get('https://api.shadiao.pro/chp');
		words.value = wordRes.data.text;

		// 获取access_token;
		const { data: accessTokenRes } = await axios.get(
			`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${APP_SECRET}`
		);

		// 消息推送
		await axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${accessTokenRes.access_token}`, TEMPLATE_DATA);
	} catch (error) {
		console.log(error);
	}
})();
