import React from "react";
import Navbar from "./Navbar";
import { useRef } from "react";

function App() {
    const redditRef = useRef<HTMLInputElement>(null);
    const redditOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(redditRef.current?.value);
    };

    const sentenceRef = useRef<HTMLInputElement>(null);
    const sentenceOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(sentenceRef.current?.value);
    };

    // still can do an input for file

    return (
        <div className="bg-[#fefae0">
            <Navbar></Navbar>
            <div className="mb-6 p-10">
                <h1 className="text-3xl font-bold text-[#d4a373] text-center">
                    Next Generation Brand Research
                </h1>
                <h2 className="text-xl font-bold text-[#d4a373] text-center">
                    Test it out!
                </h2>
                {/* Reddit input */}
                <div className="h-10"></div>
                <label
                    htmlFor="subreddit"
                    className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373"
                >
                    Enter the subreddit you are interested in
                </label>
                <div className="grid grid-cols-4">
                    <input
                        id="subreddit"
                        ref={redditRef}
                        name="subreddit"
                        className="col-span-2 block w-full p-4 text-[#d4a373] border border-[#d4a373] rounded-lg bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
                    ></input>
                    <div className="col-span-1 flex justify-center items-center">
                        <button
                            onClick={redditOnClick}
                            className="bg-[#faedcd] h-1/2 w-1/3 rounded-lg text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd] min-w-fit	"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="col-span-1 "></div>
                </div>
                {/* Sentence input */}
                <div className="h-10"></div>
                <label
                    htmlFor="subreddit"
                    className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373"
                >
                    Enter a sentence to test out our ABSA model
                </label>
                <div className="grid grid-cols-4">
                    <input
                        id="subreddit"
                        ref={sentenceRef}
                        name="subreddit"
                        className="col-span-2 block w-full p-4 text-[#d4a373] border border-[#d4a373] rounded-lg bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
                    ></input>
                    <div className="col-span-1 flex justify-center items-center">
                        <button
                            onClick={sentenceOnClick}
                            className="bg-[#faedcd] h-1/2 w-1/3 rounded-lg text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd] min-w-fit	"
                        >
                            Submit
                        </button>
                    </div>
                    <div className="col-span-1 "></div>
                </div>
            </div>
        </div>
    );
}

export default App;
