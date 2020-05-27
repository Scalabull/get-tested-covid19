
import React from 'react';
import ResultCard from './ResultCard.js';

class ResultsListCards extends React.Component {
    render() {
        const { items, page } = this.props;
        return (
            <>
                {items.map((item, index) => {
                    return (
                      <ResultCard key={`result-${index}`} item={item} num={(index + 1) + (page * 10)} />
                    )
                })}
            </>
        );
    }
}

export default ResultsListCards;
