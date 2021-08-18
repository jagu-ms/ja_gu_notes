import React from 'react';

const Cards = (props) => {
    
    const {onane, content, cardClicked} = props;

    return (
                <div className="card bg-dark border border-white"  onClick={cardClicked}>
                        <div className="card-body text-center">
                            <h4 className="card-title"><b>{onane}</b></h4>
                            <p className="card-text">{content}</p>
                        </div>
                </div>
    );
}


export default Cards;