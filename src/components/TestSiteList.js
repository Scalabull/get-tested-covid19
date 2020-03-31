/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import CardList from "components/CardList";
import zipLookups from "assets/data/zipLookups"
import haversine from "haversine";
import qs from "query-string";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

// DISTANCE THRESHOLD FOR SEARCH RESULTS (in Miles, Haversine distance)
const DISTANCE_THRESH = 40;

const setQueryStringWithoutPageReload = qsValue => { 
    const newurl = window.location.protocol + 
        window.location.host + 
        window.location.pathname + 
        qsValue;
 
    window.history.pushState({ path: newurl }, "", newurl);
};

const setQueryStringValue = ( 
    key, 
    value, 
    queryString = window.location.search
 ) => { 
     const values = qs.parse(queryString); 
     const newQsValue = qs.stringify({ ...values, [key]: value }); 
     setQueryStringWithoutPageReload(`?${newQsValue}`);
};

const getQueryStringValue = ( 
    key, 
    queryString = window.location.search
) => { 
    const values = qs.parse(queryString); 
    return values[key];
};


function isNumeric(s) {
    return !isNaN(s - parseFloat(s));
}

class TestSiteList extends React.Component {
    constructor(props){
        super(props);

        let zip = getQueryStringValue('zip') || "";

        this.state = {
            initialItems: [],
            items: [],
            zip: zip
        }

        this.filterList = this.filterList.bind(this);
    }

    filterList(event){
        const searchZipStr = event.target.value;
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);
        
        // Only allow numeric inputs.
        if(isNumeric(searchZipStr) || searchZipStr === ""){
            if(zipMatchFlag){

                // Zip should be present in lookup table in 99% of cases.
                let zipLatLng = zipLookups.zipLookups[searchZipStr];
                let updatedList = this.state.initialItems;
    
                if(zipLatLng === undefined){
                    // If no zip in lookup table, search by exact zip match (not lat, lng distance)   
                    updatedList = updatedList.filter(function(item){
                        return item.zip === searchZipStr;
                    });
                    this.setState({items: updatedList, zip: searchZipStr});
                } 
                else{
                    // else zip code is present in lookup table. Use haversine distance w/ lat, lng
                    const start = {
                        latitude: zipLatLng[0],
                        longitude: zipLatLng[1]
                    };
    
                    updatedList = updatedList.map(function(item){
                        // return any sites within 40 miles.
                        const end = {
                            latitude: item.lat,
                            longitude: item.lng
                        };
    
                        const dist = haversine(start, end, {unit: 'mile'});
                        // console.log('calculated distance: ', JSON.stringify(start), JSON.stringify(end), dist);
                        
                        let newItem = {...item};
                        newItem.dist = dist;
                        return newItem;
                    });

                    updatedList = updatedList.filter((item) => {
                        return item.dist < DISTANCE_THRESH;
                    });

                    updatedList.sort((item1, item2) => {
                        return item1.dist - item2.dist;
                    });
    
                    this.setState({items: updatedList, zip: searchZipStr});
                }
            } 
            else if (searchZipStr === ''){
                this.setState({items: this.state.initialItems, zip: searchZipStr});
            } else {
                this.setState({zip: searchZipStr});
            }
        }
    };

    componentDidMount() {
        fetch("https://storage.googleapis.com/covid19-resources/testSites.json")
        .then(res => res.json())
        .then(
            (res) => {
                console.log('external test site directory loaded successfully, CORS success.');
                this.setState({initialItems: res.testSites, items: res.testSites})
            },
            (error) => {
                console.log(error);
            }
        )
        .then(() => {
            this.filterList({target: {value: this.state.zip}});
        })
    }
    render() {
    
    return (
        <Container>
            <Row className="row-grid align-items-center">
            
            <Col className="order-lg-1" lg="10">
                <div className="d-flex px-3">
                <div>
                    <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-primary">
                    <i className="ni ni-building text-primary" />
                    </div>
                </div>
                <div className="pl-6">
                    <h4 className="display-3 text-white">COVID-19 Testing Centers</h4>
                    <p className="lead text-white">
                        We are working around-the-clock to provide accurate information.
                    </p>
                </div>
                </div>

                <form>
                    <fieldset className="form-group">
                    <input type="text" maxLength="5" title="Five digit zip code" placeholder="5 digit zip code" className="form-control form-control-lg" onChange={this.filterList} value={this.state.zip}/>
                    </fieldset>
                </form>

                <CardList items={this.state.items}/>
            </Col>
            </Row>
        </Container>
    );
  }
}

export default TestSiteList;
