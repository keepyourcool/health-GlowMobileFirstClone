import React from 'react';
import Product from './Product/Product';
import './Products.css'
const products = (props) => {
    const products = props.products.map((product, index) => {
        return (
            <div key={index} className={props.splitLayout ? "product" : null}>
                <Product product={product} />
            </div>
        )
    })
    return (
        <div className={props.splitLayout ? "layout-two" : null}>
            {products}
        </div>
    )
}
export default products;

