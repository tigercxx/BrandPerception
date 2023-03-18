import { useState } from 'react';

export const BACKEND_DOMAIN = 'http://localhost:4242/';

const TextUploadForm = () => {
	const showFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();

		if (event.target.files && event.target.files.length > 0) {
			console.log(event.target.files[0]);

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
					/>
				</form>
			</div>
		</div>
	);
};
export default TextUploadForm;
