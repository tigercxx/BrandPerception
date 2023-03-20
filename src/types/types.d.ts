export interface Results {
    count: number;
    negative: number;
    positive: number;
    neutral: number;
    data: Array<Data>;
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
