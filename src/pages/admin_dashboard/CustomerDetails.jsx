import React from 'react'
import { FaTrash, FaKey } from "react-icons/fa";
import '../../Styles/Customers.css'

export default function CustomerDetails() {
  return (
    <>
        <div className='p-3'>
            <div className='d-flex align-items-center justify-content-between'>
                <h2 className='mt-2'>Customer Details</h2>
                <div className='d-flex'>
                    <div className='btn btn-outline-danger customer-action-btn d-flex justify-content-center align-items-center me-3'><FaTrash className='me-lg-1'/><span id='action-text'>Delete customer</span></div>
                    <div className='btn btn-outline-secondary customer-action-btn d-flex justify-content-center align-items-center'><FaKey className='me-lg-1'/><span id='action-text'>Reset password</span></div>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-7'>
                    <div class="customer-card-details">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            
                        </div>
                    </div>
                </div>
                <div className='col-md-5'>
                    <div class="customer-card-details">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
