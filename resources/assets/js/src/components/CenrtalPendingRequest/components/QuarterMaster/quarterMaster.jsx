import React from 'react'
import PropTypes from 'prop-types'
import Company from '../Company'
export const QuarterMaster = ({quarterMaster, approveRequest}) => (
    <div className="pending-request-box">
        <div className="pending-request-header">
            <h4 className="title"> Quarter Master: {quarterMaster.quarter_master.quarter_name} </h4>
        </div>
        <div className="pending-request-unit">
            {quarterMaster.kit_items.length > 0 && quarterMaster.kit_items.map((items, index)=> {
                if( typeof items.approve !== 'undefined' )
                    return null;
                return (
                    <div className="quarter-unit-list" key={index}>
                        <div className="row m-0">
                            <div className="unit-name flex-1"> {items.unit.unit_name} </div>
                            <div className="request-items"> <span> {items.request_items} </span> </div>
                            <div className="approve-btn">
                                <div className="btn btn-approve" onClick={(e)=>approveRequest(items.request_id, items.request_items)}> Approve </div>
                            </div>
                        </div>
                        <Company companies={items.kit_items} />
                    </div>
                )
            })}
        </div>
    </div>
)

QuarterMaster.propTypes = {
    quarterMaster: PropTypes.object,
    approveRequest: PropTypes.func
}
export default QuarterMaster