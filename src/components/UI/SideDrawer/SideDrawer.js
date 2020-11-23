import React from 'react'; 
import './SideDrawer.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
const sideDrawer = (props)=> {
        let attachedClasses = "SideDrawer Close";
    if(props.open){
        attachedClasses = "SideDrawer Open";
    }
    return (
        <Aux>
        <Backdrop show = {props.open} clicked = {props.clickBackdrop}/>
        <div className = {attachedClasses}>
        <header><div className = "side-drawer-top">Sign in / Sign up</div></header>
        <nav>
        <ul>
        <li><div>Home</div><hr/></li>
        <li><div>Shop</div><hr/></li>
        <li><div>Find our Stores</div><hr/></li>
        <li><div>About H&G</div><hr/></li>
        <li><div>Contact Us</div><hr/></li>
        </ul>
        </nav>
        </div></Aux>
        
    );
};

export default sideDrawer;