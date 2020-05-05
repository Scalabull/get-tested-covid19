const zipLookup = require('../../../data/zipLookups.js');
const axios = require('axios');
const GOOGLE_GEOCODING_KEY = process.env.GOOGLE_GEOCODING_KEY;

console.log('key is: ', GOOGLE_GEOCODING_KEY);

async function zipToLatLng(zip) {
    const cacheLookup = zipLookup.zipLookups[zip + ""];
    if(cacheLookup){
        console.log('zip pulled from cache: ', cacheLookup);
        const latLng = {latitude: cacheLookup[0], longitude: cacheLookup[1]};
        return latLng;
    }

    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+zip+'&key=' + GOOGLE_GEOCODING_KEY)

    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;

    console.log('google API results: ', {latitude, longitude});
    return {latitude, longitude};
}

module.exports = {
    zipToLatLng
}