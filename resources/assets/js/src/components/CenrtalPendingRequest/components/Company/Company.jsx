import React from 'react'
import PropTypes from 'prop-types'

let size =24;

export const Company = ({companies}) => (
    <div className="company-list-container">
        {companies.map((Company, index) => {
            return (
                <div key={index} className="company-list">
                    <div className="company-head"> {Company.company.company_name} <span className="items">{Company.items.length}</span> </div>
                    <div className="company-product-list-container">
                        {Company.items.length > 0 && Company.items.map((item,i)=> {
                            return (
                                <div key={i} className="company-product-list row m-0 flex-row justify-content-between">
                                    <div className="user-name flex-1"> {item.name} </div>
                                    <div className="product-name flex-1"> {item.type_name} </div>
                                    <div className="product-problems flex-1"> {item.type_slug === 'বুট_ডিএমএস_সাইজ' ? "Size: 10" : null }  </div>
                                    <div className="product-problems flex-1"> Problems: {item.problem_list === null ? '---' : item.problem_list} </div>
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