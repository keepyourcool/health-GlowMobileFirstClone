
import React from 'react';
import './Aggregations.css'
const aggregations = (props) => {
    const aggregations = props.aggregations.map((aggregation, index) => {
        return (
            <li key={index} className={props.selectedIndex === index ? "selected-aggregation" : null}
                onClick={() => { props.showBucketHandler(index) }}>
                {aggregation.text}</li>
        )
    })
    return (
        <div className="aggregations">
            <ul>
                {aggregations}
            </ul>
        </div>

    )
}
export default aggregations;
