import SentenceForm from '../forms/SentenceForm';

function SentenceTab() {
	return (
		<div className="w-full md:w-1/2 mx-auto">
			<label className="block mb-2 text-sm md:text-xl font-medium text-[#d4a373] dark:text-[#d4a373]">
				Enter a sentence
			</label>
			<SentenceForm />
		</div>
	);
}

export default SentenceTab;
