import React, { useEffect } from 'react';
import '../Dashboard/assets/css/app.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = () => {

	const lStorage = JSON.parse(localStorage.getItem("admin")) || JSON.parse(localStorage.getItem("emp")) || JSON.parse(localStorage.getItem("client"));
	const Id = lStorage.user.userId;
	const name = lStorage.user.name;
	const Token = lStorage.token;
	const type = lStorage.user.isAdmin;

	useEffect(() => {
		const verifyUser = ({ user_id: Id, token: Token, method: 'verify', type: type });
		fetch(`https://authkey.io/api/authentication_data.php`, {
			method: "post",
			headers: {
				'content-Type': 'application/json'
			},
			body: JSON.stringify(verifyUser)
		}).then((result) => {
			result.json().then((resp) => {
				// console.log(resp)
				if (resp.success === true) {
				} else {
					window.location = "/admin/logout";
				}
			})
		})
	}, []);

	return (
		<nav className="navbar navbar-expand navbar-light navbar-bg">
			<div className="navbar-collapse navbarcollapse_none collapse">
				<ul className="navbar-nav navbar-align ">
					<li className="nav-item border-right">
						<div className="position-relative">
							<p className='mr-3 mb-0 mt-2 widthBlock'> <strong> Welcome	: {name} </strong> </p>
						</div>
					</li>
					<li className="nav-item dropdown">
						<Link className="nav-icon" to="/admin/logout">
							<div className="position-relative">
								<FontAwesomeIcon icon={faPowerOff} />
							</div>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default AdminHeader;