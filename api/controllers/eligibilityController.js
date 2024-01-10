const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

async function checkEligibility(req, res) {
  try {
    const {
      stateRegion,
      sectorOption,
      Utility,
      // Rest of the properties are now dynamic DER selections
    } = req.body;

    const doc = await accessSpreadsheet();
    const sheet = doc.sheetsByTitle['VPPs'];
    const rows = await sheet.getRows();

    // Build an array containing all DER types present in the request
    const derArray = Object.keys(req.body)
      .filter(
        (key) =>
          key !== 'stateRegion' && key !== 'sectorOption' && key !== 'Utility'
      )
      .reduce((acc, key) => {
        if (req.body[key].length >= 0) {
          // Assuming each DER key contains an array of selections
          acc.push(key); // Use a more descriptive label if needed
        }
        return acc;
      }, []);

    const derSelectedOptions = Object.keys(req.body)
      .filter(
        (key) =>
          key !== 'stateRegion' && key !== 'sectorOption' && key !== 'Utility'
      )
      .reduce((acc, key) => {
        if (req.body[key].length > 0) {
          // Assuming each DER key contains an array of selections
          acc[key] = req.body[key]; // Store the selected options for each DER type
        }
        return acc;
      }, []);
    const derLabels = Object.keys(derSelectedOptions).reduce((acc, key) => {
      // Concatenate the labels from each selection array into the accumulator
      return acc.concat(derSelectedOptions[key].map((option) => option.label));
    }, []);

    const filteredRows = rows.filter(
      (row) =>
        row.get('State/Region') === stateRegion &&
        (row.get('Sector').includes(sectorOption) ||
          row.get('Sector') === '') &&
        row.get('Status') != 'Ended' &&
        row.get('Self-serve') != 'Housing development' &&
        row.get('Utility/CCA') === Utility &&
        row.get('Program URL') != ''
    );

    const taggedRows = filteredRows.map((row) => {
      // Check if 'DERs' exists and split it into an array, then check if any DER is in derArray
      const derExists =
        (row.get('DERs') &&
          row
            .get('Eligible Manufacturers')
            .toLowerCase() // Convert to lowercase
            .split(', ') // Split by comma and space
            .map((der) => der.replace(/\s/g, '')) // Remove all spaces from each element
            .some(
              (der) =>
                derLabels
                  .map((da) => da.toLowerCase().replace(/\s/g, ''))
                  .includes(der) // Compare with the processed derArray
            )) ||
        row.get('DERs').toLowerCase().replace(/\s/g, '') === 'all' ||
        (row.get('DERs') &&
          row
            .get('DERs')
            .toLowerCase() // Convert to lowercase
            .split(', ') // Split by comma and space
            .map((der) => der.replace(/\s/g, '')) // Remove all spaces from each element
            .some(
              (der) =>
                derArray
                  .map((da) => da.toLowerCase().replace(/\s/g, ''))
                  .includes(der) // Compare with the processed derArray
            ) &&
          row.get('Eligible Manufacturers') === '');

      // Assign 'Eligible' or 'Ineligible' based on the existence of DERs
      row.tag = derExists ? 'Eligible' : 'Ineligible';
      return row;
    });

    // Sort the taggedRows alphabetically by 'Program Name'
    taggedRows.sort((a, b) => {
      // Extracting Status and Program Name for both a and b
      const statusA = a.get('Status').toLowerCase();
      const statusB = b.get('Status').toLowerCase();
      const typeA = a.get('Program Type').toLowerCase();
      const typeB = b.get('Program Type').toLowerCase();
      const nameA = a.get('Program Name').toLowerCase();
      const nameB = b.get('Program Name').toLowerCase();

      // Comparing Status first
      if (statusA < statusB) return -1;
      if (statusA > statusB) return 1;

      if (typeA < typeB) return -1;
      if (typeA > typeB) return 1;

      // If Status are equal, compare by Program Name
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;

      return 0;
    });

    res.json(
      taggedRows.map((row) => {
        return {
          'Program Name': row.get('Program Name'),
          'Program Type': row.get('Program Type'),
          'Program URL': row.get('Program URL'),
          'State/Region': row.get('State/Region'),
          'DERs needed': row.get('DERs'),
          'Utility/CCA': row.get('Utility/CCA'),
          'Image URL': row.get('Image URL'),
          'Self-serve': row.get('Self-serve'),
          Enrolling: row.get('Enrolling?'),
          Status: row.get('Status'),
          tag: row.tag,
        };
      })
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing request');
  }
}

module.exports = { checkEligibility };
