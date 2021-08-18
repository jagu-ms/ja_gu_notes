import React from 'react';

const CardsContainer = (props) => {
    return (
            <div className="card-columns pt-3 ">
                        {props.children}
            </div>
    );
}

export default CardsContainer;