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
import testSiteData from "assets/data/testSites"
import zipLookups from "assets/data/zipLookups"
import haversine from "haversine";

// reactstrap components
import {
  Container,
  Row,
  Col
} from "reactstrap";

class TestSiteList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            initialItems: testSiteData.testSites,
            items: testSiteData.testSites
        }

        this.filterList = this.filterList.bind(this);
    }

    filterList(event){
        const searchZipStr = event.target.value;
        const zipRE = /^[0-9]{5}$/;
        const zipMatchFlag = zipRE.test(searchZipStr);
        
        if(zipMatchFlag){
            // Zip should be present in lookup table in 99% of cases.
            let zipLatLng = zipLookups.zipLookups[searchZipStr];
            let updatedList = this.state.initialItems;

            if(zipLatLng === undefined){
                // If no zip in lookup table, search by exact zip match (not lat, lng distance)
                console.log('Zip lookup fail for code: ', searchZipStr);

                updatedList = updatedList.filter(function(item){
                    return item.zip === searchZipStr;
                });
                this.setState({items: updatedList});
            } 
            else{
                // else zip code is present in lookup table. Use haversine distance w/ lat, lng
                const start = {
                    latitude: zipLatLng[0],
                    longitude: zipLatLng[1]
                };

                updatedList = updatedList.filter(function(item){
                    // return any sites within 40 miles.
                    const end = {
                        latitude: item.lat,
                        longitude: item.lng
                    };

                    const dist = haversine(start, end, {unit: 'mile'});
                    console.log('calculated distance: ', JSON.stringify(start), JSON.stringify(end), dist);

                    return dist < 40;
                });

                this.setState({items: updatedList});
            }
        } 
        else if (searchZipStr === ''){
            this.setState({items: this.state.initialItems});
        }
    };

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
                    <input type="text" pattern="[0-9]{5}" maxLength="5" title="Five digit zip code" placeholder="5 digit zip code" className="form-control form-control-lg" onChange={this.filterList}/>
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
