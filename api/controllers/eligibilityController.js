const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function checkEligibility(req, res) {
  try {
    const {
      stateRegion,
      sectorOption,
      Utility,
      selectionsThermostat,
      selectionsBattery,
      heatpumpPresent,
      waterheaterPresent,
      solarPresent,
      EVPresent,
      generatorPresent,
    } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByIndex[0]; // or use sheetsById or sheetsByTitle
    const rows = await sheet.getRows();

    let smartThermostat = '';
    let battery = '';
    let powerwall = '';
    let heatpump = '';
    let waterheater = '';
    let EV = '';
    let solar = '';
    let generator = '';

    selectionsThermostat.NoThermostat === true
      ? (smartThermostat = '')
      : (smartThermostat = 'Thermostats');
    selectionsBattery.NoBattery === true
      ? (battery = '')
      : (battery = 'Batteries');
    selectionsBattery.TeslaPowerwall === true
      ? (powerwall = 'Powerwall')
      : (powerwall = '');

    heatpumpPresent === true ? (heatpump = 'Heat Pumps') : (heatpump = '');
    waterheaterPresent === true
      ? (waterheater = 'Water Heaters')
      : (waterheater = '');
    EVPresent === true ? (EV = 'EVs') : (EV = '');
    solarPresent === true ? (solar = 'Solar') : (solar = '');
    generatorPresent === true ? (generator = 'Generators') : (generator = '');

    console.log(selectionsBattery.NoBattery, selectionsBattery.TeslaPowerwall);
    console.log(battery, powerwall, solar, smartThermostat);

    const derArray = [
      smartThermostat,
      battery,
      powerwall,
      heatpump,
      waterheater,
      EV,
      solar,
      generator,
    ];

    console.log(derArray);

    const filteredRows = rows.filter(
      (row) =>
        row.get('State/Region') === stateRegion &&
        (row.get('Sector').includes(sectorOption) ||
          row.get('Sector') === '') &&
        row.get('Status') != 'Ended' &&
        row.get('Utility/CCA') === Utility &&
        row
          .get('DERs')
          .split(', ')
          .some((der) => derArray.includes(der)) // split DERs and check if present in derArray
    );
    res.json(
      filteredRows.map((row) => {
        return {
          'Program Name': row.get('Program Name'),
          'Program URL': row.get('Program URL'),
          'State/Region': row.get('State/Region'),
          'DERs needed': row.get('DERs'),
          'Utility/CCA': row.get('Utility/CCA'),
          'Image URL': row.get('Image URL'),
          Enrollment: row.get('Enrolling?'),
          Status: row.get('Status'),
        };
      })
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { checkEligibility };
