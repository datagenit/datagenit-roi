import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignJustify, faUser, faUsers, faAssistiveListeningSystems, faChartBar, faCreditCard, faBroadcastTower, faAtom, faBan, faPlus, faTicketAlt, faPhotoVideo, faInbox, faBlog, faStarOfLife } from '@fortawesome/free-solid-svg-icons'
import logoUrl from '../../assets/img/logo.png'
import whstappLogo from '../../assets/img/whatsapp.png'

const DashboardLeftMenu = () => {

	const [menuId, setMenuId] = useState('sidebar');
	const [pName, setPName] = useState('');
	const [empMenu, setempMenu] = useState(true);

	const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp"));
	const isAdmin = lStorage.user.isAdmin;


	const checkActive = (match, location) => {

		if (isAdmin === 'emp') {
			setempMenu(false)
		} else {
			setempMenu(true)
		}

		//some additional logic to verify you are in the home URI
		if (!location) return false;
		const { pathname } = location;
		// console.log(pathname);
		setPName(pathname);
	}

	const menuHideShow = () => {

		if (menuId === 'sidebar') {
			setMenuId('sidebar collapsed');
		} else {
			setMenuId('sidebar');
		}
	}

	return (

		<nav style={{ background: '#f8f8f8' }} id="sidebar" className={menuId}>
			<div style={{ background: '#f8f8f8' }} className="sidebar-content admin-menu-bar js-simplebar">
				<NavLink className="sidebar-brand border-right" to="/">
					<img className="Logo" alt="logo" src={logoUrl} />
				</NavLink>

				<span onClick={menuHideShow} className="sidebar-toggle d-flex">
					<i className="hamburger align-self-center"></i>
				</span>

				<ul className="sidebar-nav mt-4">


					<li className={pName === '/admin' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin">
							<FontAwesomeIcon icon={faAlignJustify} />  <span className="align-middle"> {isAdmin === 'emp' ? '' : 'Admin'} Dashboard</span>
						</NavLink>
					</li>





					<li className={pName === '/admin/user-management' || pName === '/admin/all-user-management' ? 'sidebar-item active' : 'sidebar-item'}>
						<a href="#userManagement" data-target="#userManagement" data-toggle="collapse" className="sidebar-link collapsed">
							<FontAwesomeIcon icon={faUser} /> <span className="align-middle">User Management  </span>
						</a>
						<ul id="userManagement" className={pName === '/admin/user-management' || pName === '/admin/all-user-management' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">

							<li className={pName === '/admin/user-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/user-management"> Users List </Link></li>

							<li className={pName === '/admin/all-user-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/all-user-management">All Users list</Link></li>

						</ul>
					</li>


					<li className={pName === '/admin/analytics' ? 'sidebar-item active' : 'sidebar-item '}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/analytics">
							<FontAwesomeIcon icon={faChartBar} />  <span className="align-middle">User Analytics</span>
						</NavLink>
					</li>

					<li className={pName === '/admin/add-new-client' ? 'sidebar-item active' : 'sidebar-item '}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/add-new-client">
							<FontAwesomeIcon icon={faPlus} />  <span className="align-middle">Add New Client</span>
						</NavLink>
					</li>


					<li className={pName === '/admin/assign-plan' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/assign-plan">
							<FontAwesomeIcon icon={faAssistiveListeningSystems} />  <span className="align-middle"> Assign Plan </span>
						</NavLink>
					</li>

					<li className={pName === '/admin/whatsapp-account-list' || pName === '/admin/whatsapp-summary' || pName === '/admin/whatsapp-api' ? 'sidebar-item active' : 'sidebar-item'}>
						<a href="#whatsappManagement" data-target="#whatsappManagement" data-toggle="collapse" className="sidebar-link collapsed">
							<img className="dashboardIcons" alt='icons' src={whstappLogo} /> <span className="align-middle">WhatsApp</span>
						</a>
						<ul id="whatsappManagement" className={pName === '/admin/whatsapp-account-list' || pName === '/admin/whatsapp-summary' || pName === '/admin/whatsapp-api' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">

							<li className={pName === '/admin/whatsapp-account-list' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/whatsapp-account-list"> Manage Users </Link></li>

							<li className={pName === '/admin/whatsapp-summary' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/whatsapp-summary"> All Users Summary </Link></li>
							<li className={pName === '/admin/whatsapp-api' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/whatsapp-api"> All Users Api </Link></li>
						</ul>
					</li>



					<li className={pName === '/admin/affiliate-management' || pName === '/admin/affilite-commision-hostory' ? 'sidebar-item active' : 'sidebar-item'}>
						<a href="#affiliateManagement" data-target="#affiliateManagement" data-toggle="collapse" className="sidebar-link collapsed">
							<FontAwesomeIcon icon={faStarOfLife} /> <span className="align-middle">Affiliate Management</span>
						</a>
						<ul id="affiliateManagement" className={pName === '/admin/affiliate-management' || pName === '/admin/affilite-commision-hostory' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">

							<li className={pName === '/admin/affiliate-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/affiliate-management"> Affiliate Users </Link></li>

							<li className={pName === '/admin/affilite-commision-hostory' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/affilite-commision-hostory">Affiliate Commision List </Link></li>

						</ul>
					</li>



					{/* 					
					<li  className={pName==='/admin/traffic-management'?'sidebar-item active':'sidebar-item '}>
						<NavLink className="sidebar-link " isActive={checkActive} to="/admin/traffic-management">
						<FontAwesomeIcon icon={faGlobe} />  <span className="align-middle">Traffic Management</span>
			            </NavLink>
					</li> */}

					{empMenu ?
						<>
							<li className={pName === '/admin/employee-management' ? 'sidebar-item active' : 'sidebar-item'}>
								<NavLink className="sidebar-link" isActive={checkActive} to="/admin/employee-management">
									<FontAwesomeIcon icon={faUsers} />  <span className="align-middle">Employee Management</span>
								</NavLink>
							</li>






							<li className={pName === '/admin/change-user-route' || pName === '/admin/route-management' || pName === '/admin/shift-router' ? 'sidebar-item active' : 'sidebar-item'}>
								<a href="#Route" data-target="#Route" data-toggle="collapse" className="sidebar-link collapsed">
									<FontAwesomeIcon icon={faBroadcastTower} />  <span className="align-middle"> Route Management  </span>
								</a>
								<ul id="Route" className={pName === '/admin/change-user-route' || pName === '/admin/route-management' || pName === '/admin/shift-router' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">
									<li className={pName === '/admin/route-management' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/route-management">Route List</Link></li>

									<li className={pName === '/admin/shift-router' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/shift-router">Shift Router</Link></li>

									<li className={pName === '/admin/change-user-route' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/change-user-route">Change Route</Link></li>

								</ul>
							</li>

							<li className={pName === '/admin/rich-media' ? 'sidebar-item active' : 'sidebar-item'}>
								<NavLink className="sidebar-link" isActive={checkActive} to="/admin/rich-media">
									<FontAwesomeIcon icon={faPhotoVideo} />  <span className="align-middle"> Rich Media Request </span>
								</NavLink>
							</li>

						</>

						:

						null
					}

					<li className={pName === '/admin/transaction-history' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/transaction-history">
							<FontAwesomeIcon icon={faCreditCard} />  <span className="align-middle"> Transaction History </span>
						</NavLink>
					</li>

					<li className={pName === '/admin/login-history' || pName === '/admin/signup-history' || pName === '/admin/entity-history' || pName === '/admin/voice-template-history' || pName === '/admin/sernder-history' || pName === '/admin/aws-setup-history' || pName === '/admin/api-request' || pName === '/admin/email-template-history' || pName === '/admin/sms-template-history' ? 'sidebar-item active' : 'sidebar-item'}>

						<a href="#activity" data-target="#activity" data-toggle="collapse" className="sidebar-link collapsed">
							<FontAwesomeIcon icon={faAtom} /> <span className="align-middle"> User Activity  </span>
						</a>
						<ul id="activity" className={pName === '/admin/login-history' || pName === '/admin/signup-history' || pName === '/admin/entity-history' || pName === '/admin/email-template-history' || pName === '/admin/sms-template-history' || pName === '/admin/aws-setup-history' || pName === '/admin/voice-template-history' || pName === '/admin/api-request' || pName === '/admin/sernder-history' || pName === '/admin/invalid-api-request' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">


							<li className={pName === '/admin/login-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/login-history">Login History</Link></li>
							<li className={pName === '/admin/signup-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/signup-history">Signup History</Link></li>
							<li className={pName === '/admin/entity-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/entity-history">Entity History</Link></li>
							<li className={pName === '/admin/sernder-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/sernder-history">Sender History</Link></li>

							<li className={pName === '/admin/sms-template-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/sms-template-history">SMS Template History</Link></li>

							<li className={pName === '/admin/voice-template-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/voice-template-history">Voice Template History</Link></li>

							<li className={pName === '/admin/email-template-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/email-template-history">Email Template History</Link></li>

							<li className={pName === '/admin/aws-setup-history' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/aws-setup-history"> AWS Setup History </Link></li>

							<li className={pName === '/admin/api-request' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/api-request"> API Request </Link></li>

							<li className={pName === '/admin/invalid-api-request' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/invalid-api-request">  Invalid API Request </Link></li>

						</ul>
					</li>


					<li className={pName === '/admin/spam-word' || pName === '/admin/spam-report' ? 'sidebar-item active' : 'sidebar-item'}>
						<a href="#spam" data-target="#spam" data-toggle="collapse" className="sidebar-link collapsed">
							<FontAwesomeIcon icon={faBan} /> <span className="align-middle"> Spam Management  </span>
						</a>
						<ul id="spam" className={pName === '/admin/spam-word' || pName === '/admin/blacklist' || pName === '/admin/spam-report' ? 'sidebar-dropdown list-unstyled collapse show' : 'sidebar-dropdown list-unstyled collapse'} data-parent="#sidebar">
							<li className={pName === '/admin/spam-report' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/spam-report">Spam Report</Link></li>
							<li className={pName === '/admin/spam-word' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/spam-word">Spam Word</Link></li>
							<li className={pName === '/admin/blacklist' ? 'sidebar-item active' : 'sidebar-item'}><Link className="sidebar-link" to="/admin/blacklist">Black List</Link></li>

						</ul>
					</li>


					<li className={pName === '/admin/support' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/support">
							<FontAwesomeIcon icon={faTicketAlt} />  <span className="align-middle">   Support Ticket </span>
						</NavLink>
					</li>





					<hr className="mb-0" />

					<li className={pName === '/admin/faq-list' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/faq-list">
							<FontAwesomeIcon icon={faAlignJustify} />  <span className="align-middle"> Add FAQ </span>
						</NavLink>
					</li>


					<li className={pName === '/admin/blog-list' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/blog-list">
							<FontAwesomeIcon icon={faBlog} />  <span className="align-middle"> Blog </span>
						</NavLink>
					</li>


					<li className={pName === '/admin/feedback' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/feedback">
							<FontAwesomeIcon icon={faInbox} />  <span className="align-middle"> Feedback </span>
						</NavLink>
					</li>

					<li className={pName === '/admin/contact-us-enquiry' ? 'sidebar-item active' : 'sidebar-item'}>
						<NavLink className="sidebar-link" isActive={checkActive} to="/admin/contact-us-enquiry">
							<FontAwesomeIcon icon={faInbox} />  <span className="align-middle"> Contact us </span>
						</NavLink>
					</li>


				</ul>
			</div>
		</nav>


	);
}

export default DashboardLeftMenu;