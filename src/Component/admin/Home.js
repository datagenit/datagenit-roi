import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DataTable from 'react-data-table-component';
import { customTableStylesForSummery } from '../Utils/customTableStyles';

class Home extends Component {

	constructor() {
		
		const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp"));
		const userId = lStorage.user.userId;
		const userToken = lStorage.token;
		const isAdmin = lStorage.user.isAdmin;

		super();

		this.state = {
			user_id: userId,
			token: userToken,
			userType: isAdmin,
			allUserList: null,
			filterData:null,
			email_count: '',
			smscount: '',
			voice_count: '',
			per_request: '',
			count: '',
			dateFrom: '',
			dateTo: '',
			filterText: '',
			resetPaginationToggle: false,
			userCurrentStatus: '',
			successMessage: false,
			errorMessage: '',
			bgColor: '',
			crossIcons:false,
		}
		this.loginToUserAccount = this.loginToUserAccount.bind(this);
	}

	componentDidMount() {
		this.onserch();
		this.countAll();
	}

	onserch() {
		fetch(`https://authkey.io/api/admin_dashboard.php?user_id=${this.state.user_id}&method=activeusers&type=${this.state.userType}&token=${this.state.token}`).then((response) => {
			response.json().then((result) => {
					// console.log('home',result)
				if (result.success === true) {
					this.setState({ allUserList: result.data, filterData:result.data, count: Object.keys(result.data).length, userCurrentStatus: result.data[0].is_active  });
				} else {
					
					this.setState({
						successMessage: true,
						successBg: "alert alert-danger alert-dismissible",
						errorMessage: result.message
					})
				}
			})
		})
	}

	countAll() {
		fetch(`https://authkey.io/api/admin_dashboard.php?user_id=${this.state.user_id}&method=count&token=${this.state.token}&date_from=${this.state.dateFrom}&date_to=${this.state.dateTo}`).then((response) => {
			response.json().then((result) => {
				 console.log(result);
				if (result.success === true) {
					this.setState({
						smscount: result.message.sms_count,
						email_count: result.message.email_count,
						voice_count: result.message.voice_count,
						per_request: result.message.per_request
					})
				} else {
					this.setState({
						smscount: '0',
						email_count: '0',
						voice_count: '0',
						per_request: '0',
					})
				}
			})
		})
	}

	loginToUserAccount(emailaddress, password) {
		var url = document.location.href;
		const singleTemplateData = ({ username: emailaddress, password: password, admintype:this.state.userType});
		
		fetch('https://authkey.io/api/login.php', {
			method: "post",
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(singleTemplateData)
		}).then((result) => {
			result.json().then((result) => {
				//console.log(result)
				if (result.success === true) {
					result['url'] = url ;
					localStorage.setItem('login', JSON.stringify(result));
					window.location.href = "/dashboard";
				} else {
					this.setState({
						successMessage: true,
						bgColor: "alert alert-danger alert-dismissible",
						errorMessage: result.message
					})
				}
			})
		})
	}

	dateFrom = (date) => {
		let dated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
		this.setState({
			dateFrom: dated,
			SelecteddateFrom: date
		});
	};

	dateTo = (date) => {
		let dated = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + ("0" + date.getDate()).slice(-2);
		this.setState({
			dateTo: dated,
			SelecteddateTo: date
		});
	};

	filterdata = (e) => {
		let searchTeram = e.target.value.toLowerCase();
		var newArray = this.state.allUserList.filter(function (el) {
			return el.username.indexOf(searchTeram) !== -1 ;
		});
		this.setState({
			filterData: newArray,
			crossIcons:true
		})
	}

	resetvalue = () => {
		this.setState({
			filterData: this.state.allUserList,crossIcons:false
		})
	}


	render() {

		const columns = [
			{
				name: 'Action',
				cell: (e) => <FontAwesomeIcon role='button' color="green" onClick={() => this.loginToUserAccount(e.username, e.password)} icon={faSignInAlt} />,
				width: '100px',

			},
			{
				name: 'Email ID / Username',
				selector: row => row.username,
				sortable: true,
			},
			{
				name: 'Request',
				cell: (row) => <strong className='text-primary'> {row.total}</strong>,
				selector: row => row.total,
				sortable: true,

			},
			{
				name: ' Last Request Date Time',
				selector: row => row.lastrequest,
				sortable: true,
			},
			{
				name: 'Action',
				cell: (e) => <Link to={'/admin/api-request/' + e.username}><span className='badge bg-success mr-2'> View Details </span></Link>,
			},
		];

		const oneDayBefore = new Date();
		oneDayBefore.setDate(oneDayBefore.getDate()-1);

		return (

			
			<main className="content">
				<div className="container-fluid p-0">
					<div className="row mb-3 mb-xl-3">
						<div className="col-auto d-none d-sm-block">
							<h3 className="mt-2"><strong>{this.state.userType === 'emp' ? '' : 'Admin'}</strong> Dashboard</h3>
						</div>

						<div className="col-auto ml-auto d-flex text-right mt-n1">

							<DatePicker className="form-control btn-block"
								dateFormat="yyyy/MM/dd"
								//value={this.state.dateFrom}
								onChange={this.dateFrom}
								maxDate={oneDayBefore}
								selected={this.state.SelecteddateFrom}
								placeholderText={this.state.dateFrom}
							/>

							<DatePicker className="form-control btn-block"
								dateFormat="yyyy/MM/dd"
								//value={this.state.dateTo}
								onChange={this.dateTo}
								maxDate={oneDayBefore}
								selected={this.state.SelecteddateTo}
								placeholderText={this.state.dateTo}
							/>

							<button onClick={() => this.countAll()} style={{ borderRadius: 0 + 'px' }} className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faSearch} /> </button>


						</div>


					</div>

					<div className="row">
						<div className="col-xl-12  mt-3 col-xxl-5 d-flex">
							<div className="w-100">
								<div className="row">
									<div className="col-sm-3">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title mb-4">SMS Summary</h5>
												<h2 className="mt-1 mb-3">{this.state.smscount}</h2>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title mb-4">Voice Summary</h5>
												<h2 className="mt-1 mb-3">{this.state.voice_count}</h2>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title mb-4">Email Summary</h5>
												<h2 className="mt-1 mb-3">{this.state.email_count}</h2>
											</div>
										</div>
									</div>
									<div className="col-sm-3">
										<div className="card">
											<div className="card-body">
												<h5 className="card-title mb-4">API Request / Mint </h5>
												<h2 className="mt-1 mb-3">{this.state.per_request}</h2>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>


					<div className="row">
						<div className="col-12 col-lg-12 col-xxl-12 d-flex">
							<div className="card flex-fill">

								<div className="card-header ">
									<h4 className="card-title d-flex justify-content-between mb-0"> <strong className='pt-3 '>Today Active Users : <span className='text-success'> {this.state.count} </span> </strong><strong> <input type='text' onChange={this.filterdata} placeholder='Search' className='form-control' /> 
									{this.state.crossIcons ?

									<FontAwesomeIcon onClick={this.resetvalue} className='reset-value' role='button' icon={faTimesCircle} /> 
									:
									null
									}
									
									</strong> </h4>
								</div>

								<div className="">


									<DataTable
										columns={columns}
										data={this.state.filterData || 0}
										pagination={this.state.allUserList ? true : false}
										customStyles={customTableStylesForSummery}
										highlightOnHover
										paginationRowsPerPageOptions={[10, 25, 50, 100]}
									/>



								</div>
							</div>
						</div>
					</div>

				</div>
			</main>

		);
	}
}
 
export default Home;