import React, { useState, useEffect } from 'react';
import DashboardSideMenu from '../../navbar/DashboardSideMenu'
import DashboardTopMenu from '../../navbar/DashboardTopMenu'
import {userid, token, type } from '../../common/UserAuth'
import { URL } from '../../common/Url';
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import { customTableStylesForSummery } from '../../common/customTableStyles'

const UserBalanceHistory = () => {

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [balanceHistory, setbalanceHistory] = useState([]);
    const [pending, setPending] = React.useState(true);
    useEffect(() => {
        getBalanceHistory();
    }, [userid])

    const getBalanceHistory = () => {
       
        fetch(`${URL}add_balance.php?user_id=${userid}&method=trans_history&token=${token}&ret_user_id=${userid}&user_type=${type}`).then((response) => {
            response.json().then((result) => {
              
                if (result.success === true) {
                    setbalanceHistory(result.data)
                    setPending(false)
                }
            })
        })
    }


    const columns = [
        {
            name: 'User Name',
            selector: row => row.username,
            sortable: true,

        },
        {
            name: 'Transaction Type',
            selector: row => row.transaction_id,
            sortable: true,

        },
        {
            name: 'Credit Amount ',
            selector: row => row.amount,
            sortable: true,

        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            wrap: true,
        },

        {
            name: 'Created',
            selector: row => row.created,
            sortable: true,
        },
    ];
  

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">

                <DashboardSideMenu />

                <div className="layout-page">

                    <DashboardTopMenu />

                    <div className="content-wrapper">

                        <div className="container-xxl container-p-y">

                        {
                            error.errarStatus ?
                            <div className={error.bgcolor} role="alert">
                                <strong>Alert!</strong> {error.errorMessage}
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            :
                            null
                        }
 
                            <div className="row">


                                <div className="col-xl-12">

                                    <div className="card mb-4">
                                        <h5 className="card-header">Balance History</h5>

                                        <div className="card-body">

                                        <DataTable
                                                pagination
                                                handleSort
                                                columns={columns}
                                                data={balanceHistory}
                                                customStyles={customTableStylesForSummery}
                                                noDataComponent="No Balance History"
                                            />


                                    </div>
                                   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserBalanceHistory;