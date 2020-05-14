
import React from 'react';
import ResultCard from './ResultCard.js';

class ResultsListCards extends React.Component {
    render() {
        const { items } = this.props;
        return (
            <>
                {items.map((item, index) => {
                    return (
                      <ResultCard key={`result-${index}`} item={item} index={index} />
                    )
                })}
            </>
        );
    }
}

export default ResultsListCards;
