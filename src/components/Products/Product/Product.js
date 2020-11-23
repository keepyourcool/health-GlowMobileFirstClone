import React from 'react';
import './Product.css';
const product = (props) => {
    return (
        <div className="product-container">
            <div className="product-discount-heart">
                {props.product.skuPromoText ? <div className="product-discount">{props.product.skuPromoText}</div> : <div className="product-discount dummy"></div>}

                <div className="product-heart"><i className="fa fa-heart-o" aria-hidden="true"></i></div>
            </div>
            <div className="product-img-name">
                <img src={props.product.skuImageUrl} />
                <div className="product-name">{props.product.skuName}</div>
            </div>
            <div className="product-price-rating">
                <div className="product-price">
                    <span className="product-price-list-price">
                        <i className="fa fa-inr" aria-hidden="true"></i>
                        {props.product.listPrice}</span>
                    <span className="product-price-default-price">
                        <i className="fa fa-inr" aria-hidden="true"></i>
                        {props.product.defaultPrice}</span>

                </div>
                <span className="product-rating">
                    {props.product.skuAverageRating ? <i className="fa fa-star" aria-hidden="true"></i> : null}
                    {props.product.skuAverageRating ? props.product.skuAverageRating : null}
                </span>
            </div>
        </div>
    )
}
export default product;

