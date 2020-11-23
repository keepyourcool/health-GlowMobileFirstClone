import React from 'react';
import './Toolbar.css'
const toolbar = (props) => {
    return  (
        <div className = "toolbar">
        <div className = "toolbar-top">
        <div className ="toggle-button">
        <div></div>
        <div></div>
        <div></div>
        </div>
        <div className ="logo"><img src="https://storage.googleapis.com/hng-static/social-icons/logo_hng_big.svg"/></div>
        </div>
        <div className="layout-title" >
               <span> L'Oreal Paris - </span>
               <span className = "totalCount">{props.totalCount} Products</span>
                </div>


                    <div className="layout-sort-filter">
                        <div 
                        className="layout-button"
                        onClick = {props.splitLayoutHandler}>
                            <div ></div>
                            <div></div>
                        </div>
                        <button onClick ={props.sortingModeHandler}>Sort</button>
                        <button onClick={props.filterClickHandler}>Filter</button>
                    </div>
        </div>
    )
}
export default toolbar;

