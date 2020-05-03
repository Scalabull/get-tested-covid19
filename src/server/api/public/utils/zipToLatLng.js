const zipLookup = require('../../../data/zipLookups.js');
const axios = require('axios');

async function zipToLatLng(zip) {
    const cacheLookup = zipLookup.zipLookups[zip + ""];
    if(cacheLookup){
        console.log('zip pulled from cache: ', cacheLookup);
        const latLng = {latitude: cacheLookup[0], longitude: cacheLookup[1]};
        return latLng;
    }

    const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address="+zip+'&key=AIzaSyCj5wGAsi1ppD8qf6Yi-e6fMChdck7BMVg')

    const latitude = response.data.results[0].geometry.location.lat;
    const longitude = response.data.results[0].geometry.location.lng;

    console.log('google API results: ', {latitude, longitude});
    return {latitude, longitude};
}

module.exports = {
    zipToLatLng
}