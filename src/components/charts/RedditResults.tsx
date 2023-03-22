import { Results } from '../../types/types';
import classes from './Result.module.css';

type Props = {
	state: Results | null;
};

function RedditResults(props: Props) {
	return (
		<div className="w-full overflow-x-hidden border-2 rounded-2xl text-sm md:text-md">
			<div className={classes.slideinfromtop}>
				{props.state?.data
					.filter((data) => Object.keys(data.output).length !== 0)
					.map((data) => {
						return (
							<div
								className="grid grid-rows-1"
								key={data.input}
							>
								<div className="font-medium text-lg">
									{JSON.stringify(data.output).toString()}
								</div>
								<div className="">{data.input}</div>
								<br />
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default RedditResults;
