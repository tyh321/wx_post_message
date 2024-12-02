(async () => {
	const axios = require('axios');
	const dayjs = require('dayjs');
	const utils = require('./utils');
	const calendar = require('js-calendar-converter');

	const { APP_ID, APP_SECRET, TEMPLATE_ID, USER_ID, START_DATE, BIRTHDAY, CITY, CITY_CODE, HF_KEY } = process.env;
	
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
			other: {
				value: '',
			},
			words: {
				value: '',
				// color: utils.randomColor(),
			},
		},
	};

	try {
		const { date, weather, min_temp, max_temp, love_day, birthday, other, words } = TEMPLATE_DATA.data;

		// date
		date.value = dayjs().format('YYYY-MM-DD') + ' 星期' + '日一二三四五六'.charAt(new Date().getDay());

		// 天气
		const { data: weathersRes } = await axios.get(`https://devapi.qweather.com/v7/weather/3d?location=${CITY_CODE}&key=${HF_KEY}`);
		const { textDay, tempMax, tempMin } = weathersRes?.daily?.[0];
		weather.value = textDay;
		min_temp.value = tempMin.split(' ')[1];
		max_temp.value = tempMax.split(' ')[1];

		// 恋爱天数
		love_day.value = dayjs(new Date()).diff(dayjs(START_DATE), 'days');

		// 生日
		const birTime = utils.getBirTime(BIRTHDAY);
		// 阳历转农历
		const lunarDate = calendar.lunar2solar(birTime.split('-')[0], birTime.split('-')[1], birTime.split('-')[2]);
		birthday.value = Math.abs(dayjs(lunarDate.date).diff(dayjs(new Date()), 'days'));

		// 彩虹屁
		const { data: wordRes } = await axios.get('https://api.shadiao.pro/chp');
		words.value = wordRes.data.text;

		// 备注
		const meetTime = dayjs(dayjs('2025-01-26')).diff(new Date(), 'days');
		if (meetTime > 0) {
			other.value = `距离见到老公还有${meetTime}天！！！`;
		}

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
