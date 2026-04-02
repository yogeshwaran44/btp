const cds = require('@sap/cds');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const locations = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'data/cities.json'))
);
module.exports = cds.service.impl(function () {

  const username = 'yogeshwaran99';

  async function getStatesByCountryName(countryName) {

    const countryRes = await axios.get(
      `http://api.geonames.org/searchJSON?q=${encodeURIComponent(countryName)}&maxRows=1&featureCode=PCLI&username=${username}`
    );

    if (!countryRes.data.geonames || countryRes.data.geonames.length === 0) {
      throw new Error('Country not found');
    }

    const countryId = countryRes.data.geonames[0].geonameId;

    const statesRes = await axios.get(
      `http://api.geonames.org/childrenJSON?geonameId=${countryId}&username=${username}`
    );

    return (statesRes.data.geonames || [])
      .filter(g => g.fcode === 'ADM1')
      .map(g => ({
        name: g.name
      }));
  }

  async function getDistrictsByStateName(stateName) {

    const stateRes = await axios.get(
      `http://api.geonames.org/searchJSON?q=${encodeURIComponent(stateName)}&maxRows=1&featureCode=ADM1&username=${username}`
    );

    if (!stateRes.data.geonames || stateRes.data.geonames.length === 0) {
      throw new Error('State not found');
    }
console.log(stateRes.data.geonames);
    const stateId = stateRes.data.geonames[0].geonameId;

    const districtRes = await axios.get(
      `http://api.geonames.org/childrenJSON?geonameId=${stateId}&username=${username}`
    );
console.log(districtRes.data.geonames);
    return (districtRes.data.geonames || [])
      .filter(g => g.fcode === 'ADM2')
      .map(g => ({
        name: g.name
      }));
  }


  async function getCoordinates(city) {

  const result = locations.find(
    loc => loc.city.toLowerCase() === city.toLowerCase()
  );

  if (!result) {
    return [];
  }

  return {
    name : result.city,
    latitude : result.lat,
    longitude : result.lon
  };
}
  async function getCityByDistrictName(district) {

     const result = locations.filter(
    item => item.district.toLowerCase() === district.toLowerCase()
  );

    return result.map(g=>(
      {
        name:g.city
      }
    ))
  }

  this.on('getLocation', async (req) => {

    const { country, state, district, city } = req.data;

    try {

      if (country) {
        return await getStatesByCountryName(country);
      }

      if (state) {
        return await getDistrictsByStateName(state);
      }

      if (district) {
        return await getCityByDistrictName(district);
      }

      if(city){
        return await getCoordinates(city);
      }

      return {
        message: "Provide country OR state OR input"
      };

    } catch (err) {
      console.error('Error:', err);
      req.error(500, err.message || 'Internal server error');
    }

  });

});