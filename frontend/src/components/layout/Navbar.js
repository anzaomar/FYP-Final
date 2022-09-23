import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Navbar.css";

import UserContext from "../../UserContext";

const Navbar = () => {
	const { isLoggedIn, resetAuth } = useContext(UserContext);
	const navigate = useNavigate();
	return (
		<div className="navbar" style={{position: "static"}}>
			<Container>
				<Row className="w-100 justify-content-center">
					<Col xs="12" md="4" className="d-none d-md-block"></Col>
					<Col xs="12" md="4">
						<nav className="text-center">
							<div className="logo">
								<Link to="/">
									<p className="teal lighten-1 theme_white">
										Connections
									</p>
								</Link>
							</div>
						</nav>
					</Col>
					<Col xs="12" md="4">
						{/* Space Left for Logout Button */}
						{isLoggedIn ? (
							<button
								className="btn-floating btn-small waves-effect waves-light logout"
								onClick={() => {
									resetAuth();
									navigate("/");
								}}
								style={{
									position: "absolute",
									top: 27,
									right: 28,
								}}
							>
								<i className="small material-icons teal lighten-1 white-text">
									logout
								</i>
							</button>
						) : (
							<></>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Navbar;
