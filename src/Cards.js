import React from 'react';

const Cards = (props) => {
    
    const {onane, content, cardClicked} = props;

    return (
        <button className="card bg-dark border border-white"  onClick={cardClicked}>
                <div className="card-body text-center">
                    <h4 className="card-title text-light"><b>{onane}</b></h4>
                    <p className="card-text text-light">{content}</p>
                </div>
        </button>
    );
}


export default Cards;