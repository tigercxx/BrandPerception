import React from 'react';
import RedditForm from '../forms/RedditForm';

function RedditTab() {
	return (
		<div>
			{/* <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-10">
				<div className="col-span-2">
					<Dashboard />
				</div>
			</div>
			<div className="col-span-2 sm:col-span-1"> */}
			<RedditForm />
			{/* </div> */}
		</div>
	);
}

export default RedditTab;
