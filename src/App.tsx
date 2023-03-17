import React from 'react';
import { LineChart } from './components/charts/LineChart';
import Navbar from './components/Navbar';

function App() {
	return (
		<div className="">
			<Navbar></Navbar>
			<h1 className="text-3xl font-bold underline text-red-600">Hi</h1>
			<h2>This is our app</h2>
			<label htmlFor="subreddit">Enter the subreddit</label>
			<br />
			<input
				id="subreddit"
				name="subreddit"
			></input>
			<p>Hi</p>
			{/* <LineChart /> */}
		</div>
	);
}

export default App;
