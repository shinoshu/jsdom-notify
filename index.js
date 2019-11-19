const axios = require('axios');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const jquery = require("jquery");
const notifier = require('node-notifier');
const tabletojson = require('tabletojson');
const { Parser } = require('json2csv');
const fs = require('fs');

const url = 'https://game8.jp/pokemon-sword-shield/260149';

async function get() {
  try {
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const $ = jquery(dom.window);

    const converted = tabletojson.convert(response.data);
    // 取り出したいデータを選択
    const data = converted[3];

    const parser = new Parser();
    const csv = parser.parse(data);

    fs.writeFileSync('a.csv', csv);
  } catch (error) {
    console.error(error);
  }
};

get();
