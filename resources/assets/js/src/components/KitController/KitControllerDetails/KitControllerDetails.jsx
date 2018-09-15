import React from 'react'
import PropTypes from 'prop-types'
import UserForm from './UserForm'
export const KitControllerDetails = ({
    deleteAdmin,
    hideModal,
    onChangeAction,
    saveUser,
    toggleModal,
    addUser,
    office,
    state
}) => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h3 className="modal-title"> {state.office_name} Administrator </h3>
                </div>
                <span className="close-modal" onClick={() => {hideModal()} }> <i className="fa fa-close"></i> </span>
            </div>
            <div className="modal-body">
                { office.head === null && <UserForm
                    error={state.error}
                    user={state.user}
                    addUser={() => {saveUser()}}
                    onChangeAction={onChangeAction()} /> }
                { office.head !== null &&
                    <div className="admin-info">
                        <p><strong> Admin Name : </strong> <span> {office.head.name} </span></p>
                        <p><strong> Secret Id : </strong> <span> {office.head.secret_id} </span></p>
                        <p><strong> Designation : </strong> <span> {office.head.designation} </span></p>
                        <p><strong> Mobile : </strong> <span> {office.head.mobile} </span></p>
                    </div>
                }
            </div>
            { office.head !== null &&
            <div className="modal-footer">
                <p className="text-right"><a href="#" className="btn btn-danger"> Remove Administrator </a></p>
            </div>
            }
        </div>
    </div>
)

KitControllerDetails.propTypes = {
    state: PropTypes.object,
    office: PropTypes.object,
    deleteAdmin: PropTypes.func,
    onChangeAction: PropTypes.func,
    saveUser: PropTypes.func,
    hideModal: PropTypes.func,
    addUser: PropTypes.func,
}

export default KitControllerDetails