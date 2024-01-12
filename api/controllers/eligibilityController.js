const { json } = require('express');
const { accessSpreadsheet } = require('../services/googleSheetsService');

function getDeviceData(eligibleDevices) {
  const deviceData = {};

  eligibleDevices.forEach((row) => {
    const manufacturer = row._rawData[0];
    const type = row._rawData[1];

    if (!deviceData[type]) {
      deviceData[type] = new Set();
    }

    deviceData[type].add(manufacturer);
  });

  return deviceData;
}

function organizeDevicesByType(deviceData) {
  // Convert sets to arrays for a more standard object structure
  for (const type in deviceData) {
    deviceData[type] = Array.from(deviceData[type]).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );
  }

  // Sort the types and create a sorted final object
  const sortedOrganizedData = {};
  Object.keys(deviceData)
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    .forEach((sortedType) => {
      sortedOrganizedData[sortedType] = deviceData[sortedType];
    });

  return sortedOrganizedData;
}

async function checkEligibility(req, res) {
  try {
    const {
      stateRegion,
      sectorOption,
      Utility,
      // Rest of the properties are now dynamic DER selections
    } = req.body;

    const doc = await accessSpreadsheet();
    const sheetPrograms = doc.sheetsByTitle['Programs'];
    const rowsPrograms = await sheetPrograms.getRows();

    const sheetManufacturers = doc.sheetsByTitle['Manufacturers'];
    const rowsManufacturers = await sheetManufacturers.getRows();

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

    const filteredPrograms = rowsPrograms.filter(
      (row) =>
        row.get('State/Region') === stateRegion &&
        (row.get('Sector').includes(sectorOption) ||
          row.get('Sector') === '') &&
        row.get('Status') != 'Ended' &&
        row.get('Self-serve') != 'Housing development' &&
        row.get('Utility/CCA') === Utility &&
        row.get('Program URL') != ''
    );

    const taggedPrograms = filteredPrograms.map((row) => {
      const eligibleDERTypes = row.get('DERs').toLowerCase().split(', ');
      const eligibleManufacturers = row
        .get('Eligible Manufacturers')
        .toLowerCase() // Convert to lowercase
        .split(', ');

      let eligibleDevices;
      let eligibleDeviceData = {};

      if (
        eligibleManufacturers.length === 1 &&
        eligibleManufacturers[0] === ''
      ) {
        //If no manufacturer data available
        row
          .get('DERs')
          .split(', ')
          .forEach((derType) => {
            if (!eligibleDeviceData[derType]) {
              eligibleDeviceData[derType] = new Set();
            }
            eligibleDeviceData[derType].add('Information not available');
          });
      } else {
        eligibleDevices = rowsManufacturers.filter(
          (row) =>
            eligibleManufacturers.some(
              (eligibleManufacturer) =>
                row.get('Manufacturer').toLowerCase() ===
                eligibleManufacturer.toLowerCase()
            ) &&
            eligibleDERTypes.some(
              (type) => row.get('Type').toLowerCase() === type.toLowerCase()
            )
        );
      }
      let organizedDevices;
      if (eligibleDevices) {
        eligibleDeviceData = getDeviceData(eligibleDevices);
      }

      organizedDevices = organizeDevicesByType(eligibleDeviceData);

      let deviceTypes = Object.keys(organizedDevices);

      // Find missing DER types with no manufacturer data

      // First, create a normalized (lowercase) version of deviceTypes for comparison
      const normalizedDeviceTypes = new Set(
        deviceTypes.map((type) => type.toLowerCase())
      );

      const missingTypes = row
        .get('DERs')
        .split(', ')
        .filter(
          (originalType) =>
            !normalizedDeviceTypes.has(originalType.toLowerCase())
        );
      const missingDeviceData = {};

      missingTypes.forEach((derType) => {
        if (!missingDeviceData[derType]) {
          missingDeviceData[derType] = new Set();
        }
        missingDeviceData[derType].add('Information not available');
      });

      const mergedDeviceData = {};

      // Merge object1 into mergedObject
      for (const key in eligibleDeviceData) {
        if (eligibleDeviceData.hasOwnProperty(key)) {
          mergedDeviceData[key] = new Set([
            ...(mergedDeviceData[key] || []),
            ...eligibleDeviceData[key],
          ]);
        }
      }

      // Merge object2 into mergedObject
      for (const key in missingDeviceData) {
        if (missingDeviceData.hasOwnProperty(key)) {
          mergedDeviceData[key] = new Set([
            ...(mergedDeviceData[key] || []),
            ...missingDeviceData[key],
          ]);
        }
      }

      organizedDevices = organizeDevicesByType(mergedDeviceData);

      // Check if device is included in selected options and split it into an array, then check if any DER is in derArray
      const derExists =
        (row.get('DERs') &&
          eligibleManufacturers
            .map((der) => der.replace(/\s/g, '')) // Remove all spaces from each element
            .some(
              (der) =>
                derLabels
                  .map((da) => da.toLowerCase().replace(/\s/g, ''))
                  .includes(der) // Compare with the processed derArray
            )) ||
        row.get('DERs').toLowerCase().replace(/\s/g, '') === 'all' ||
        (row.get('DERs') &&
          eligibleDERTypes
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
      row.eligibleDERs = organizedDevices;

      return row;
    });

    // Sort the taggedRows alphabetically by 'Program Name'
    taggedPrograms.sort((a, b) => {
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
      taggedPrograms.map((row) => {
        return {
          'Program Name': row.get('Program Name'),
          'Program Type': row.get('Program Type'),
          'Program URL': row.get('Program URL'),
          'State/Region': row.get('State/Region'),
          'DERs needed': row.get('DERs'),
          'Utility/CCA': row.get('Utility/CCA'),
          'Image URL': row.get('Image URL'),
          'Self-serve': row.get('Self-serve'),
          'Eligible Manufacturers': row.eligibleDERs,
          // 'All Eligible DERs': row.het('All Eligible DERs'),
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
