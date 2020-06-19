let puppeteer = require('puppeteer');
let fs = require('fs');
const { createPDF } = require('./createPDF.js');
let credentialsFile = process.argv[2];
let output = [];
(async function () {
  let data = await fs.promises.readFile(credentialsFile, 'utf-8');
  let credentials = JSON.parse(data);
  cano = credentials.cano;
  kno = credentials.kno;
  igl = credentials.igl;
  let browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--start-maximized'],
  });
  let numberofPages = await browser.pages();
  let tab = numberofPages[0];
  await tab.goto('https://www.mobikwik.com/electricity-bill-payment', {
    waitUntil: 'networkidle2',
  });
  await tab.waitForSelector("input[role='combobox']");
  await tab.click('.ng-select-container.ng-has-value');
  await tab.type('input[type="text"]', 'bses yamuna');
  await tab.keyboard.press('Enter');
  await tab.type("input[placeholder='CA Number']", cano, { delay: 200 });
  await tab.click('.bt48');
  await tab.waitFor(5000);
  let nobills = await tab.$$('img[src="/assets/images/no-bills.svg"]');
  // console.log(nobills.length);
  if (nobills.length == 1) {
    output.elecdd = '-';
    output.elecamt = '₹ 0';
  } else {
    let details = await tab.$$('.col-md-6.ft13.tright');
    // console.log(details.length);
    output.elecdd = await tab.evaluate(
      (element) => element.innerText,
      details[0]
    );
    output.elecamt = await tab.evaluate(
      (element) => element.innerText,
      details[1]
    );
  }
  // console.log(output);
  await tab.goto('https://www.mobikwik.com/water-bill-payment', {
    waitUntil: 'networkidle2',
  });
  await tab.waitForSelector("input[role='combobox']");
  await tab.click('.ng-select-container.ng-has-value');
  await tab.type('input[type="text"]', 'delhi jal');
  await tab.keyboard.press('Enter');
  await tab.type("input[placeholder='K No']", kno, { delay: 200 });
  await tab.click('.bt48');
  await tab.waitFor(5000);
  nobills = await tab.$$('img[src="/assets/images/no-bills.svg"]');
  // console.log(nobills.length);
  if (nobills.length == 1) {
    output.waterdd = '-';
    output.wateramt = '₹ 0';
  } else {
    let details = await tab.$$('.col-md-6.ft13.tright');
    // console.log(details.length);
    output.waterdd = await tab.evaluate(
      (element) => element.innerText,
      details[0]
    );
    output.wateramt = await tab.evaluate(
      (element) => element.innerText,
      details[1]
    );
  }
  await tab.goto('https://www.mobikwik.com/gas-bill-payment', {
    waitUntil: 'networkidle2',
  });
  await tab.waitForSelector("input[role='combobox']");
  await tab.click('.ng-select-container.ng-has-value');
  await tab.type('input[type="text"]', 'igl');
  await tab.keyboard.press('Enter');
  await tab.type("input[placeholder='BP Number']", igl, { delay: 200 });
  await tab.click('.bt48');
  await tab.waitFor(5000);
  nobills = await tab.$$('img[src="/assets/images/no-bills.svg"]');
  // console.log(nobills.length);
  if (nobills.length == 1) {
    output.gasdd = '-';
    output.gasamt = '₹ 0';
  } else {
    let details = await tab.$$('.col-md-6.ft13.tright');
    // console.log(details.length);
    output.gasdd = await tab.evaluate(
      (element) => element.innerText,
      details[0]
    );
    output.gasamt = await tab.evaluate(
      (element) => element.innerText,
      details[1]
    );
  }
  console.log(output);
  await browser.close();
  await createPDF(output, 'bills.pdf');
})();
