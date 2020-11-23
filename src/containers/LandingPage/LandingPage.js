import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Products from '../../components/Products/Products';
import Spinner from '../../components/UI/Spinner/Spinner';
import FilterBy from '../FilterBy/FilterBy';
import Modal from '../../components/UI/Modal/Modal'
import SortContainer from '../../components/SortContainer/SortContainer';
import Toolbar from '../../components/UI/Toolbar/Toolbar'
import SideDrawer from '../../components/UI/SideDrawer/SideDrawer'
import './LandingPage.css'
import sideDrawer from '../../components/UI/SideDrawer/SideDrawer';

class LandingPage extends Component {
    state = {
        products: [],
        aggregations: [],
        batchSize: 20,
        startingIndex: 0,
        totalCount: 0,
        showSpinner: false,
        showFilter: false,
        sortingMode: false,
        splitLayout: false,
        filterSet: false,
        sortSet: false,
        prevSelection: [],
        sideDrawerOpen:false,
        url: ""

    }
    componentDidMount() {

        this.loadProducts();
        window.addEventListener('scroll', this.scrollHandler)
    }


    loadProducts = () => {
        this.setState({ showSpinner: true })
        const { startingIndex, batchSize } = this.state;
        const url = `https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=${startingIndex}:${batchSize}`
        this.loadDataFromUrl(url);

    }
    loadDataFromUrl = (url) => {

        fetch(url)
            .then(response => response.json())
            .then(data => {
                let prevProducts = [];
                if (this.state.showFilter || this.state.filterSet || this.state.sortSet)
                    prevProducts = [...data.data.products]

                else prevProducts = [...this.state.products, ...data.data.products]

                const products = prevProducts.map((product) => {

                    const { defaultPrice, listPrice, skuImageUrl, skuName, skuId, skuDiscPercentage, skuAverageRating, skuPromoText } = product
                    const newProduct = {
                        skuId: skuId, defaultPrice: defaultPrice,
                        listPrice: listPrice, skuImageUrl: skuImageUrl, skuName: skuName,
                        skuDiscPercentage, skuAverageRating, skuPromoText
                    }
                    return newProduct
                });
                const aggregations = this.state.startingIndex === 0 ?
                    [...data.data.aggregations] : this.state.aggregations
                const totalCount = data.data.totalCount;
                this.setState({ products: products, aggregations: aggregations, totalCount, showSpinner: false, url: url, sortSet: false }, () => {
                })
            })

    }
    loadMore = () => {

        this.setState({ startingIndex: this.state.startingIndex + this.state.batchSize, batchSize: 7 }, this.loadProducts);

    }
    scrollHandler = (ev) => {
        ev.preventDefault()
        const { scrollTop, scrollHeight, clientHeight } = ev.target.scrollingElement;
        if (scrollHeight - (clientHeight + scrollTop) < 20) {
            if (this.state.startingIndex + this.state.batchSize < this.state.totalCount)

                this.loadMore();
        }

    }
    filterClickHandler = () => {
        this.setState({ showFilter: true })
    }
    isSelectedHandler = (index, key) => {
        // 
        const newBucket = this.state.aggregations[index].buckets.map(item => {
            if (item.key === key)
                return {
                    ...item,
                    isSelected: !item.isSelected
                }
            else return item
        })
        const newAggregation = [...this.state.aggregations];
        newAggregation[index] = {
            ...this.state.aggregations[index],
            buckets: newBucket
        }
        this.setState({ aggregations: newAggregation });
    }
    getFilteredData = () => {
        this.setState({ showSpinner: true })
        const url = this.prepareUrl()
        if (url !== 0) {
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const aggregations = [...data.data.aggregations];
                    this.setState({ aggregations: aggregations, showSpinner: false, url: url })

                })
        }
        else this.setState({ showSpinner: false })

    }
    prepareUrl = (startingIndex, batchSize) => {
        let isSelectedArr = [];
        this.state.aggregations.forEach((aggregation) => {
            aggregation.buckets.forEach((item) => {
                if (item.isSelected) {
                    const isSelectedObj = {}
                    switch (aggregation.name) {
                        case "price": isSelectedObj["key"] = `${item.from}:${item.to}`;
                            break;
                        case "offer": isSelectedObj["key"] = `${item.from}:${item.to}`;
                            break;
                        case "exclude_oos": isSelectedObj["key"] = 'true';
                            break;
                        default: isSelectedObj["key"] = item.key;
                    }
                    isSelectedObj["aggregation"] = aggregation.name;
                    isSelectedArr.push(isSelectedObj)
                }
            })
        })
        const temp = isSelectedArr.map((obj) => obj.key)
        if (!temp.map(el => this.state.prevSelection.includes(el)).includes(false) && !this.state.filterSet && this.state.showFilter)
            return 0;
        let url = `https://staging.healthandglow.com/api/catalog/product/v6/search/999?app=web&version=3.0.2&tag=loreal-paris&page=${this.state.startingIndex}:${this.state.batchSize}`
        isSelectedArr.forEach(el => {
            url = url + `&${el.aggregation}=${el.key}`
        })
        const newSelectedArr = [...temp];
        this.setState({ prevSelection: newSelectedArr })
        return url
    }
    clearFilterHandler = () => {
        this.setState({ startingIndex: 0, filterSet: false })
        this.loadProducts();
    }
    closeFilterHandler = () => {
        this.setState({ showFilter: false })
    }
    applyFilterHandler = () => {
        this.setState({ showSpinner: true, showFilter: false, filterSet: true, startingIndex: 0, batchSize: 20 })

        const url = this.prepareUrl()
        this.setState({ url: url })
        this.loadDataFromUrl(url);


    }
    sortHandler = (attribute) => {
        const url = this.state.url + `&sort=${attribute}:desc`;
        this.setState({ startingIndex: 0, showSpinner: true, sortingMode: false, sortSet: true, url: url }, () => {
        })

        this.loadDataFromUrl(url);


    }
    sortCancelHandler = () => {
        this.setState({ sortingMode: false })
    }
    sortingModeHandler = () => {
        this.setState({ sortingMode: true })
    }
    splitLayoutHandler = () => {
        this.setState({ splitLayout: !this.state.splitLayout })
    }
    closeSideDrawerHandler = ()=>{
        this.setState({sideDrawerOpen:false})
    }
    toggleClickHandler = ()=>{
        this.setState({sideDrawerOpen:!this.state.sideDrawerOpen})
    }
    render() {
        return (
            <Aux>
                {this.state.showFilter ?
                    <FilterBy
                        aggregations={this.state.aggregations}
                        isSelectedHandler={this.isSelectedHandler}
                        getFilteredData={this.getFilteredData}
                        showSpinner={this.state.showSpinner}
                        clearFilterHandler={this.clearFilterHandler}
                        closeFilterHandler={this.closeFilterHandler}
                        applyFilterHandler={this.applyFilterHandler}
                    /> : null}
                <Modal show={this.state.sortingMode}
                    modalClosed={this.sortCancelHandler}>
                    <SortContainer sortHandler={this.sortHandler}
                        sortCancelHandler={this.sortCancelHandler} />
                </Modal>
                <Toolbar
                    totalCount={this.state.totalCount}
                    splitLayout={this.state.splitLayout}
                    sortingMode ={this.state.sortingMode}
                    filterClickHandler={this.filterClickHandler}
                    sortingModeHandler={this.sortingModeHandler}
                    splitLayoutHandler={this.splitLayoutHandler}
                    toggleClicked = {this.toggleClickHandler}
                    
                />
                <SideDrawer 
                open = {this.state.sideDrawerOpen}
                clickBackdrop = {this.closeSideDrawerHandler}/>
                <div className="landing-page-container">
                    {this.state.showSpinner ? <Spinner /> : null}
                    <Products
                        splitLayout={this.state.splitLayout}
                        products={this.state.products} />

                </div>
            </Aux>
        )
    }

}
export default LandingPage;