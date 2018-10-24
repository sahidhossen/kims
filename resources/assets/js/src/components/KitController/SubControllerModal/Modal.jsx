import React from 'react'
import PropTypes from 'prop-types'

export const checkOfficetype = (office_name) => {
    switch (office_name ){
        case 'units':
            return 'companies'
            break;
        case 'companies':
            return 'solder'
            break;
        case 'quarters':
            return 'units'
            break;
        case 'formation_offices':
            return 'quarters'
            break;
        case 'central_offices':
            return 'formation_offices'
            break;
    }
}

export const Modal= ({
    subOffice,
    state,
    hideModal,
    getSearchOfficeName,
    goForward,
    goBack
}) => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box sub-controller-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h3 className="modal-title">
                        {state.history.length > 1 && <span className="go-back" onClick={()=> goBack(state.history.length-1)}><i className="fa fa-arrow-circle-o-left"/></span>}
                        {state.fetched === true && <span>Office: {state.currentOffice.office.office_name}</span> }
                    </h3>
                </div>
                <span className="close-modal" onClick={() => hideModal() }> <i className="fa fa-close"></i> </span>

            </div>
            <div className="modal-body">
                <div className="sub_office_list">
                    { state.fetched === true && state.offices.map((office, index)=> {
                        let search_office = checkOfficetype(state.currentOffice.search_office)
                        return (
                            <div className="office_list" key={index}>
                                <div className="office_inner_list">
                                    <div className="office_admin_avatar">
                                        { office.head === null || office.head.image === null ?
                                            <img src="../images/avatar.jpg"/>
                                        :   <img src={`../uploads/${office.head.image}`}/> }
                                    </div>
                                    <div className="admin_details">
                                        <div className="row m-0"> <span> Admin: </span>
                                            <span> {office.head === null ? 'Not assigned' : office.head.name } </span>
                                        </div>
                                    </div>
                                    <div className="office_name">
                                        <h4 className="office_name_title"> {office.office_name}
                                            {search_office !== 'solder' &&
                                            <span className="go-details" onClick={() => goForward(state.currentOffice.search_office, search_office, office)}>
                                                <i className="fa fa-arrow-circle-o-right"/>
                                            </span>
                                            }
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    { state.fetched === true && state.offices.length === 0 &&
                    <div className="office_not_found">
                        <h3 className="empty-title"> Office Empty! </h3>
                    </div>
                    }
                </div>
            </div>
        </div>
    </div>

)
Modal.propTypes = {
    subOffice: PropTypes.object,
    state: PropTypes.object,
    hideModal: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
    getSearchOfficeName: PropTypes.func
}
export default Modal