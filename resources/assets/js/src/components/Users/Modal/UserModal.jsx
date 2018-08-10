import React from "react"

export const UserModal = () => (
    <div className="kit-modal-box-shadow">
        <div className="kit-modal-box">
            <div className="modal-header d-flex">
                <div className="flex-1">
                    <h1 className="modal-title"> Add User </h1>
                </div>
                <span className="close-modal"> Close </span>
            </div>
            <div className="modal-body">
                <div className="kit-form-body">
                    <div className="form-group">
                        <label> Name </label>
                        <input type="text" className="form-control" placeholder="User Name" name="name" />
                    </div>

                </div>
            </div>
        </div>
    </div>
)

export default UserModal