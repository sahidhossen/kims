import React from 'react'
import PropTypes from 'prop-types'

export const ItemProblem = ({
    state,
    kit_type,
    addKitProblem,
    onUpdateKitType,
    removeProblemAction,
    onCloseModal,
    saveKitProblem
}) => (
     <div className="kim-modal-shadow">
         <div className="main-modal">
            <div className="modal-header">
                <h3 className="modal-title"> <strong> {kit_type.type_name} </strong> Related Problems </h3>
                <span className="modal-close" onClick={()=>{onCloseModal()}}> ✕ </span>
            </div>
             <div className="modal-body">
                 <div className="kims-form row">
                     <div className="flex-1">
                        <input type="text" onChange={(e)=>{onUpdateKitType(e)}} placeholder="Type problem" value={state.problem} className="form-control" />
                     </div>
                     <a href="#" className="btn btn-success btn-sm" onClick={(e)=>{addKitProblem(e)}}> +Add </a>
                 </div>
                 <div className="problem-list row flex-column">
                     { state.problem_list.length > 0 && state.problem_list.map( (problem, index) => (
                         <div className="problem-name" key={index}>
                             <span className="problem-name-text"> {problem} </span>
                             <span className="delete-problem" onClick={()=>{removeProblemAction(index)}}> ✕ </span>
                         </div>
                     ))
                     }
                     { state.problem_list.length === 0 && <h3 className="empty-title"> Type has no problem </h3> }
                 </div>
             </div>
             <div className="modal-footer">
                 <p className="text-right">
                    <a href="#" className="btn btn-success btn-lg" onClick={(e)=>{saveKitProblem(e)}}> Save </a>
                 </p>
             </div>
         </div>
     </div>
)

ItemProblem.propTypes = {
    addKitProblem: PropTypes.func,
    onCloseModal: PropTypes.func,
    onUpdateKitType: PropTypes.func,
    saveKitProblem: PropTypes.func,
    removeProblemAction: PropTypes.func,
    kit_type: PropTypes.object,
    state: PropTypes.object
}

export default ItemProblem