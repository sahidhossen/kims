import React from 'react'
import PropTypes from 'prop-types'

export const QuarterMaster = ({quarterMaster, approveRequest}) => (
    <div className="pending-request-box">
        <div className="pending-request-header">
            <h3 className="title"> Quarter Master: {quarterMaster.quarter_master.quarter_name} </h3>
        </div>
        <div className="pending-request-unit">
            {quarterMaster.kit_items.length > 0 && quarterMaster.kit_items.map((items, index)=> {
                if( typeof items.approve !== 'undefined' )
                    return null;
                return (
                    <div className="quarter-unit-list row m-0" key={index}>
                        <div className="unit-name flex-1"> {items.unit.unit_name} </div>
                        <div className="request-items"> <span> {items.request_items} </span> </div>
                        <div className="approve-btn">
                            <div className="btn btn-approve" onClick={(e)=>approveRequest(items.request_id, items.request_items)}> Approve </div>
                        </div>
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