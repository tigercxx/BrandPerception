export interface Results {
	count: number;
	negative: number;
	positive: number;
	neutral: number;
	data: Array<Data>;
}

export interface ResultsBody {
	reddit: Array<string>;
	predictions: Results;
}

export interface Data {
	input: string;
	output: {
		[key: string]: string;
	};
}

export interface Polarities {
	count: number;
	negative: number;
	positive: number;
	neutral: number;
}

export interface RestaurantDictionary {
	food: string[];
	ambiance: string[];
	service: string[];
	value: string[];
}

export interface RestaurantCategorySentiment {
	[key: string]: Polarities;
}
