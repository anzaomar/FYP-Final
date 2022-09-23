import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import DoughnutChartMF from "./DoughnutChartMF";

const Analytics = () => {
	return (
		<Container>
			<Row className="align-items-center">
				<div className="text-center mt-5 pt-2 mb-5 pb-5">
					<h1>Analytics Dashboard</h1>
				</div>
			</Row>
			<Row className="align-items-center justify-content-between">
				<Col xs="12" md="6" xl="3">
					<div className="text-center">
						<DoughnutChart />
					</div>
				</Col>
				{/* <Col xs="12" md="6" xl="4">
					<div className="text-center">
						<LineChart />
					</div>
				</Col> */}
				<Col xs="12" md="6" xl="4">
					<div className="text-center">
						<BarChart />
					</div>
				</Col>
				<Col xs="12" md="6" xl="4">
					<div className="text-center">
						<DoughnutChartMF />
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Analytics;
