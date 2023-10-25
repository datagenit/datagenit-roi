import React, { useState, useEffect } from 'react';
import AdminSideMenu from '../../navbar/AdminSideMenu'
import AdminTopMenu from '../../navbar/AdminTopMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faArrowAltCircleLeft,faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { URL } from '../../common/Url';
import { userid, token, type } from '../../common/AdminAuth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import { customTableStylesForSummery } from '../../common/customTableStyles';

const BalanceHistory = () => {

   

    const [error, seterror] = useState({
        errarStatus: false,
        errorMessage: '',
        bgcolor: ''
    });

    const [pending, setPending] = React.useState(true);
    const [balanceHistory, setbalanceHistory] = useState([]);

    useEffect(() => {
        fetch(`${URL}add_balance.php?user_id=${userid}&method=trans_history&token=${token}&ret_user_id=&user_type=${type}`).then((response) => {
            response.json().then((result) => {
                if (result.success === true) {
                    setbalanceHistory(result.data)
                    setPending(false)
                }else{
                    setPending(true)
                }
            })
        })
    }, [])

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

                <AdminSideMenu />

                <div className="layout-page">

                    <AdminTopMenu />

                    <div className="content-wrapper">

                        <div className="container-xxl container-p-y">



                            <div className="row">

                                <div className="col-lg-12 col-md-4 order-1">

                                    {
                                        error.errarStatus ?
                                            <div className={error.bgcolor} role="alert">
                                                {error.errorMessage}

                                            </div>
                                            :
                                            null
                                    }

                            
                                </div>
                            </div>

                            <div className='mt-5'>
                                <div className="card">

                                    <h5 className="card-header">Balance History List</h5>
                                    <div className="card-body">
                                      
                                        <DataTable
                                                pagination
                                                handleSort
                                                columns={columns}
                                                data={balanceHistory}
                                                customStyles={customTableStylesForSummery}
                                                noDataComponent="No balance History"
                                            />
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

export default BalanceHistory;