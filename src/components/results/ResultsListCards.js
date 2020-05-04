
import React from 'react';
import { Card, CardBody} from 'reactstrap';
import ResultCard from './ResultCard.js';

class ResultsListCards extends React.Component {

    render() {
        let topResults = this.props.items;
        if (topResults === null || topResults.length === 0) {
            return (
                <>
                    <Card className='shadow shadow-lg--hover pt-4 pb-4 mb-3 mt-3'>
                        <CardBody>
                            <div className='d-flex px-3'>
                                <div>
                                    <div className='icon icon-shape bg-gradient-warning rounded-circle text-white'>
                                        <i className='ni ni-fat-remove' />
                                    </div>
                                </div>
                                <div className='pl-4'>
                                    <h5 className='title text-primary'>
                                        No test centers were located within 40 miles of your zip code.
                                    </h5>
                                    <p className='text-muted'>
                                        Our data may be incomplete. Please check with your doctor and/or local
                                        government, and inform us if we are missing test centers in your area.
                                    </p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </>
            );
        } else {
            return (
                <>
                    {topResults.map((item, index) => {
                        return (
                          <ResultCard key={`result-${index}`} item={item} index={index} />
                        )
                    })}
                </>
            );
        }
    }
}

export default ResultsListCards;
