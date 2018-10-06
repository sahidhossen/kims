import React from 'react'
import PropTypes from 'prop-types'
import QuarterMaster from './components/QuarterMaster'

export const CentralPendingRequest = ({pendingRequest, approveUnitRequest, taskComplete}) => (
    <div className="Homepage">
        <div className="page-header page-header-light">
            <div className="page-header-content header-elements-md-inline">
                <div className="page-title d-flex">
                    <h4><i className="icon-arrow-left52 mr-2"></i> <span className="font-weight-semibold">Pending Request</span> - Dashboard</h4>
                    <a href="#" className="header-elements-toggle text-default d-md-none"><i className="icon-more"></i></a>
                </div>
            </div>
        </div>
        {pendingRequest.pendingRequest.length === 0 && pendingRequest.fetched === true &&
        <div className="row empty-pending-request m-0">
            <h3 className="empty-title text-center"> Pending request is empty now! </h3>
        </div>
        }
        { pendingRequest.pendingRequest.length > 0 && pendingRequest.pendingRequest.map( (formationRequest, index) => {
            return (
                <div className="row" key={index}>
                    <div className="content">
                        <div className="card">
                            <div className="card-body">
                                <div className="row">
                                    {formationRequest.kit_items.length > 0 &&
                                        formationRequest.kit_items.map( (qmPending, qindex) => {
                                            return (
                                                <div className="col-md-12 qa" key={qindex}>
                                                    <QuarterMaster
                                                        c_request_id={formationRequest.id}
                                                        approveRequest={approveUnitRequest}
                                                        quarterMaster={qmPending}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                {pendingRequest.task_message !== '' && <p className="alert alert-success pull-left"> Sorry! Has more task to do!</p>}
                                <div className="btn btn-primary btn-md pull-right" onClick={()=>taskComplete(formationRequest.id, index)}> Task Complete </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })

        }
    </div>
)

CentralPendingRequest.propTypes = {
    pendingRequest: PropTypes.object,
    approveUnitRequest: PropTypes.func,
    taskComplete: PropTypes.func
}
export default CentralPendingRequest