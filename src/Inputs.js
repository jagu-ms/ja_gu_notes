import React from "react";

const Inputs = (props) => {
    const {contentValue, onaneValue, changeTitle, changeContent} = props;
    return (
        <>
            <input
                type="text"
                name="title"
                className="form-control"
                placeholder="title"
                value={onaneValue}
                onChange={changeTitle}
            /><br/>
            <textarea
                rows="5"
                name="content"
                className="form-control"
                placeholder="content"
                value={contentValue}
                onChange={changeContent}
            /><br/>
        </>
    );
}

export default Inputs;