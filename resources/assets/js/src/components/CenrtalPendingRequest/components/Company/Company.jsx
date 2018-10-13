import React from 'react'
import PropTypes from 'prop-types'

let size =24;

export const Company = ({companies}) => (
    <div className="row m-0 flex-column company-list-container">
        {companies.map((Company, index) => {
            return (
                <div key={index} className="company-list row m-0 flex-column">
                    <div className="company-head"> {Company.company.company_name} <span className="items">{Company.items.length}</span> </div>
                    <div className="company-product-list-container">
                        {Company.items.length > 0 && Company.items.map((item,i)=> {

                            return (
                                <div key={i} className="company-product-list row m-0 flex-row justify-content-between">
                                    <div className="product-name"> {item.type_name} </div>
                                    <div className="product-problems"> {item.type_slug === 'বুট_ডিএমএস_সাইজ' ? "Size: 24" : null }  </div>
                                    <div className="product-problems"> Problems: {item.problem_list === null ? '---' : item.problem_list} </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })}
    </div>
)

Company.propTypes = {
    companies: PropTypes.array,
}
export default Company