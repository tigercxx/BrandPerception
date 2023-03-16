import React from "react";
import Navbar from "./Navbar";

function App() {
    return (
        <div className="">
            <Navbar></Navbar>
            <h1 className="text-3xl font-bold underline text-red-600">Hi</h1>
            <h2>This is our app</h2>
            <label htmlFor="subreddit">Enter the subreddit</label>
            <br />
            <input id="subreddit" name="subreddit"></input>
            <p>Hi</p>
        </div>
    );
}

export default App;
