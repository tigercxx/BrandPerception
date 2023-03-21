import React, { useState, useRef } from "react";

import { BACKEND_DOMAIN } from "../../config/env";
import Dashboard from "../charts/Dashboard";
import { Results } from "../../types/types";
import { sentenceResultRenderer } from "./SentenceForm";
import classes from "./Form.module.css";
import { polaritiesAtom } from "../../atoms/atoms";
import { useAtom } from "jotai";

const RedditForm = () => {
    const subredditRef = useRef<HTMLInputElement>(null);
    const contentInRedditRef = useRef<HTMLInputElement>(null);
    const [results, setResults] = useState<Results | null>(null);
    const [, setPolarities] = useAtom(polaritiesAtom);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const redditOnClick = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        if (
            subredditRef.current?.value.length === 0 &&
            contentInRedditRef.current?.value.length === 0
        ) {
            alert("Subreddit and content cannot be empty!");
            return;
        }
        setIsLoading(true);

        const body = {
            subreddit: subredditRef.current?.value,
            q: contentInRedditRef.current?.value,
        };

        const response = await fetch(BACKEND_DOMAIN + "predict-reddit", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error("Failed to send");
        }
        const result = await response.json();
        setIsLoading(false);
        setResults(result.predictions);
        setPolarities({
            count: result.predictions.count,
            positive: result.predictions.positive,
            negative: result.predictions.negative,
            neutral: result.predictions.neutral,
        });
        console.log(result);
        return result;
    };

    return (
        <div>
            <div className="grid sm:grid-cols-3 xs:grid-cols-1 gap-10">
                <div className="col-span-2">
                    <Dashboard />
                </div>
                <div className="col-span-2 sm:col-span-1">
                    <label className="block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373]">
                        Search in Reddit
                    </label>
                    <div className="grid grid-rows-3 gap-2">
                        <div className="grid grid-cols-4 gap-4">
                            <label
                                htmlFor="subreddit"
                                className="col-span-1 block mb-2 text-l md:text-lg  xs:text-sm text-[#d4a373] dark:text-[#d4a373]"
                            >
                                Subreddit
                            </label>
                            <input
                                id="subreddit"
                                ref={subredditRef}
                                name="subreddit"
                                className="col-span-3 block h-10 px-2 text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
                            ></input>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            <label
                                htmlFor="contentInReddit"
                                className="col-span-1 block mb-2 text-l md:text-lg xs:text-sm text-[#d4a373] dark:text-[#d4a373]"
                            >
                                Content
                            </label>
                            <input
                                id="contentInReddit"
                                ref={contentInRedditRef}
                                name="contentInReddit"
                                className="col-span-3 block h-10 px-2 text-[#d4a373] border border-[#d4a373] rounded-md bg-[#fefae0] sm:text-md focus:ring-[#d4a373] focus:border-[#d4a373]"
                            ></input>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {isLoading && (
                                <p className="col-span-1 col-end-2 animate-bounce block mb-2 text-xl font-medium text-[#d4a373] dark:text-[#d4a373] m-2">
                                    Loading...
                                </p>
                            )}
                            <button
                                onClick={redditOnClick}
                                className="col-span-1 col-end-5 bg-[#faedcd] py-2 rounded-md md:text-lg xs:text-sm text-[#d4a373] border border-[#d4a373] hover:bg-[#eaddbd]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {
                <div className="sm:grid row-span-1 grid-cols-5 max-h-10 ">
                    <div className="col-span-1">
                        <p className={classes.slideinleft}>
                            Count: {results?.count}
                        </p>
                        <p className={classes.slideinleft}>
                            Positive: {results?.positive}
                        </p>
                        <p className={classes.slideinleft}>
                            Negative: {results?.negative}
                        </p>
                        <p className={classes.slideinleft}>
                            Neutral: {results?.neutral}
                        </p>
                    </div>
                    <div className="sm:col-span-4 w-full border-2 rounded-2xl">
                        <div className={classes.slideinfromtop}>
                            {results?.data.map((data) => {
                                return (
                                    <div
                                        className="grid grid-rows-1 "
                                        key={data.input}
                                    >
                                        <div className="row-span-1 ">
                                            {data.input}
                                        </div>
                                        <div className="underline">
                                            {sentenceResultRenderer(
                                                data.output
                                            )}
                                        </div>
                                        <br />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default RedditForm;
