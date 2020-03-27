import haversine from 'haversine';
import testSiteData from "assets/data/testSites"
import zipLookups from "assets/data/zipLookups"

const DISTANCE_THRESH = 40;

function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

function getFilteredZipArray(searchZipStr) {
    if(searchZipStr === "") return testSiteData.testSites;

    if(!isNumeric(searchZipStr)) return [];
    else {
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);

        if(!zipMatchFlag) return [];
        else {
            // Zip should be present in lookup table in 99% of cases.
            let zipLatLng = zipLookups.zipLookups[searchZipStr];
            let updatedList = this.state.initialItems;

            if(zipLatLng === undefined){
                // If no zip in lookup table, search by exact zip match (not lat, lng distance)   
                updatedList = updatedList.filter(function(item){
                    return item.zip === searchZipStr;
                });
            } 
            else{
                // else zip code is present in lookup table. Use haversine distance w/ lat, lng
                const start = {
                    latitude: zipLatLng[0],
                    longitude: zipLatLng[1]
                };

                updatedList = updatedList.filter(function(item){
                    // return any sites within DISTANCE_THRESH miles.
                    const end = {
                        latitude: item.lat,
                        longitude: item.lng
                    };

                    const dist = haversine(start, end, {unit: 'mile'});
                    // console.log('calculated distance: ', JSON.stringify(start), JSON.stringify(end), dist);

                    return dist < DISTANCE_THRESH;
                });
            }
            return updatedList;
        }
    }
}

module.exports = {getFilteredZipArray};