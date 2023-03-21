import React from 'react';
import { Results } from '../../types/types';
import { sentenceResultRenderer } from '../forms/SentenceResultRender';
import classes from './Result.module.css';

type Props = {
	state: Results | null;
};

function RedditResults(props: Props) {
	return (
		<div className="sm:grid row-span-1 grid-cols-5 max-h-10 ">
			<div className="col-span-1">
				<p className={classes.slideinleft}>Count: {props.state?.count}</p>
				<p className={classes.slideinleft}>Positive: {props.state?.positive}</p>
				<p className={classes.slideinleft}>Negative: {props.state?.negative}</p>
				<p className={classes.slideinleft}>Neutral: {props.state?.neutral}</p>
			</div>
			<div className="sm:col-span-4 w-full border-2 rounded-2xl">
				<div className={classes.slideinfromtop}>
					{props.state?.data.map((data) => {
						return (
							<div
								className="grid grid-rows-1 "
								key={data.input}
							>
								<div className="row-span-1 ">{data.input}</div>
								<div className="underline">
									{sentenceResultRenderer(data.output)}
								</div>
								<br />
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default RedditResults;
