const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const notifier = require('node-notifier');

const url = 'https://github.com/shinoshu';

async function get() {
  try {
    const response = await axios.get(url);
	const dom = new JSDOM(response.data);
	const $ = jquery(dom.window);
	const name = $('.user-status-message-wrapper')[1].textContent.trim();
	notifier.notify(name);
  } catch (error) {
    console.error(error);
  }
};

get() && setInterval(get, 10 * 1000);
