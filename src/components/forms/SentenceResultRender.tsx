export const sentenceResultRenderer = (result: { [key: string]: string }): string => {
	let output = '';
	if (Object.entries(result).length === 0) {
		return 'No aspects found!';
	}
	if (Object.entries(result).length === 1) {
		return `${Object.entries(result)[0][0]}: ${Object.entries(result)[0][1]}`;
	}
	for (const [key, value] of Object.entries(result)) {
		output = output.concat(`${key}: ${value}, `);
	}
	return output.slice(0, output.length - 2);
};
