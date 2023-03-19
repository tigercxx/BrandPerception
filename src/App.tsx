import React from 'react';
import Navbar from './components/Navbar';
import TextUploadForm from './components/TextUploadForm';
import SentenceForm from './components/SentenceForm';
import RedditForm from './components/RedditForm';

function App() {
	return (
		<div className="bg-[#fefcf1] h-screen">
			<Navbar></Navbar>
			<h1 className="text-3xl font-bold text-[#d4a373] text-center">
				Next Generation Brand Research
			</h1>
			<h2 className="text-xl font-bold text-[#d4a373] text-center">Test it out!</h2>
			<div className="grid md:grid-cols-2 xs: grid-cols-1 gap-2 h-max">
				<div className="px-10 xs: px-5">
					<RedditForm />
					<SentenceForm />
					<TextUploadForm />
				</div>
				<div className="p-10 xs: p-5">
					<div className="bg-[#ffeeee] h-full"></div>
				</div>
			</div>
		</div>
	);
}

export default App;
