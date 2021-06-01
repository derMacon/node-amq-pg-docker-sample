import React from 'react';

import BatchControl from './BatchControl';

type DashboardProps = {};
type DashboardState = {};

class Dashboard extends React.Component<DashboardProps, DashboardState> {

	constructor(props: DashboardProps) {
        super(props);
	}
	
    render() {
        return (
            <div className="">
				<BatchControl/>
            </div>
        );
    }
}

export default Dashboard;