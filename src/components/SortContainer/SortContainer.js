import React from 'react';
import './SortContainer.css'
const sortContainer = (props) => {
    return  (
        <div className ="sort-container">
        <p >Popularity</p>
        <p onClick = {()=>{props.sortHandler("discount")}}>Discount</p>
        <p>High-Low</p>
        <p>Low-High</p>
        <p className = "sort-container-close" onClick ={props.sortCancelHandler}>Close</p>
        </div>
    )
}
export default sortContainer;

