
import React, {Component} from 'react';
import './Buckets.css'
class Buckets extends Component{
    render(){
        const bucket = this.props.buckets.map((item, index)=>{
            return(
                
            <li key={item.key}
            onClick= {()=>{this.props.itemClickHandler(item.key)}} >
            <div >
            {item.text}
            <span className = "buckets-item-count">({item.docCount})</span>
            <i className={item.isSelected?"fa fa-check-circle selected":"fa fa-check-circle unselected"} aria-hidden="true"></i>
            </div>
            </li>
            )
        })
        return (
            <div className = "buckets">
            <ul>
            {bucket}
            </ul>
            </div>
            
        )
    }
    
}
export default Buckets;
