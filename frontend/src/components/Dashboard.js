import React, { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Connections } from "./layout/Connections";
import { Circles } from "./layout/Circles";

const Dashboard = () => {
	return (
 		
			<div>
				<Connections/>
			</div>
		
	);
};

export default Dashboard;
