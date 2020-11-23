import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Aggregations from '../../components/Aggregations/Aggregations';
import Buckets from '../../components/Buckets/Buckets';
import './FilterBy.css'
import Spinner from '../../components/UI/Spinner/Spinner'
class FilterBy extends Component {
    state = {
        buckets:[],
        aggregations:[],
        selectedIndex:0
    }
    // componentDidMount() {
    //     this.setState({
    //         buckets:this.props.aggregations[0].buckets,
    //         aggregations:this.props.aggregations})
        
    // }
    
    showBucketHandler =(index)=> {
        this.props.getFilteredData();
        this.setState({selectedIndex:index})
    }
    itemClickHandler = (key)=>{
        // debugger
        this.props.isSelectedHandler(this.state.selectedIndex,key )
        }
    render(){
        return(
            <Aux>
            {this.props.showSpinner?<Spinner />:null}
             <div className ="filter-by">
            <div>
            <header className = "filter-by-header">
            <span className = "filter-by-header-cross" onClick = {this.props.closeFilterHandler}><i className="fa fa-times" aria-hidden="true"></i></span>
            <span>Filter By</span>
            <span className = "filter-by-header-clear" onClick ={this.props.clearFilterHandler}>ClearAll</span>
            </header>
            </div>
            <div className = "filter-by--aggregations-buckets">
            <div className = "filter-by-aggregations">
            <Aggregations
             aggregations = {this.props.aggregations}
             showBucketHandler = {this.showBucketHandler}
             selectedIndex = {this.state.selectedIndex}
             />
            </div>
            <div className = "filter-by-buckets">
            <Buckets
             buckets = {this.props.aggregations[this.state.selectedIndex].buckets} 
             itemClickHandler = {this.itemClickHandler}
            />
            </div>
            </div>
            <div className = "filter-by-footer">
            <button onClick = {this.props.applyFilterHandler}>Apply</button>
            </div>
            </div>
            </Aux>
            
        )
    }
}

export default FilterBy;