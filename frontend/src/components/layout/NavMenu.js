import React from "react";

const NavMenu = ({ pane, paneCenter, zoomControl, zoomReset }) => {
	let top = 70,
		left = 45;

	return (
		<div style={{ position: "relative" }}>
			<div
				className="z-depth-2 card white"
				style={{
					position: "fixed",
					width: "200px",
					height: "300px",
					top: 150,
					left: 20,
					borderRadius: 20,
					overflow: "hidden",
				}}
			>
				<div
					class="card-title center-align teal lighten-1 white-text"
					style={{
						paddingTop: 10,
						paddingBottom: 10,
					}}
				>
					View Controls
				</div>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						pane(0, 250);
					}}
					style={{
						position: "absolute",
						top: top,
						left: left + 40,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						keyboard_arrow_up
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						pane(0, -250);
					}}
					style={{
						position: "absolute",
						top: top + 80,
						left: left + 40,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						keyboard_arrow_down
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						pane(250, 0);
					}}
					style={{
						position: "absolute",
						top: top + 40,
						left: left,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						keyboard_arrow_left
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						pane(-250, 0);
					}}
					style={{
						position: "absolute",
						top: top + 40,
						left: left + 80,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						keyboard_arrow_right
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						paneCenter();
					}}
					style={{
						position: "absolute",
						top: top + 40,
						left: left + 40,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						my_location
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						zoomControl(2);
					}}
					style={{
						position: "absolute",
						top: top + 150,
						left: left,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						add
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						zoomReset(1);
					}}
					style={{
						position: "absolute",
						top: top + 150,
						left: left + 40,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						loop
					</i>
				</button>
				<button
					className="btn-floating btn-small waves-effect waves-light"
					onClick={() => {
						zoomControl(0.5);
					}}
					style={{
						position: "absolute",
						top: top + 150,
						left: left + 80,
					}}
				>
					<i className="small material-icons teal lighten-1 white-text">
						remove
					</i>
				</button>
			</div>
		</div>
	);
};

export default NavMenu;
