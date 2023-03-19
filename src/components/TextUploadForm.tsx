import { BACKEND_DOMAIN } from '../config/env';

const TextUploadForm = () => {
	const showFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.onload = async (event) => {
				const text = event.target!.result;

				// split by the new lines for both CRLF and LF, and filter only with content
				const data = {
					body: text?.toString().split(/\r?\n/).filter(Boolean),
				};

				const response = await fetch(BACKEND_DOMAIN + 'predict_file', {
					method: 'POST',
					headers: { 'content-type': 'application/json' },
					body: JSON.stringify(data),
				});

				if (!response.ok) {
					throw new Error('Failed to send');
				}
				const result = await response.json();
				console.log(result);
			};
			reader.readAsText(event.target!.files[0]);
		}
	};

	return (
		<div>
			<div>
				<form encType="multipart/form-data">
					<input
						type="file"
						name="text_to_upload"
						onChange={(e) => showFile(e)}
						className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
					/>
				</form>
			</div>
		</div>
	);
};
export default TextUploadForm;
