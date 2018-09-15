import React from 'react'
import PropTypes from 'prop-types'

export const ListModal = ({
    hideModal,
    deleteItem,
    state,
    items
}) => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h3 className="modal-title"> Kit Item List </h3>
                </div>
                <span className="close-modal" onClick={() => {hideModal()} }> <i className="fa fa-close"></i> </span>
            </div>
            <div className="modal-body">
                { state.items !== null && state.items.map( (item, index) => (
                    <div className="bg-slate py-2 px-3 rounded-top  border-top-1 " key={index}>
                        <div className="flex-row d-flex align-items-center">
                            <div className="id p-2">
                                {item.id}
                            </div>
                            <div className="flex-1">
                                {item.kit_name}
                            </div>

                            <div className="operation-area">
                                <a href="#" className="btn btn-danger" onClick={(e)=>{deleteItem(e, item, index)}}> Delete </a>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    </div>
)

ListModal.propTypes = {
    state: PropTypes.object,
    hideModal: PropTypes.func,
    deleteItem: PropTypes.func,
}

export default ListModal