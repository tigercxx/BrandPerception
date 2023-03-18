import { useState } from 'react';

export const BACKEND_DOMAIN = 'http://localhost:4242/';

const TextUploadForm = () => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files && event.target.files.length > 0) {
			setFile(event.target.files[0]);
		}
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!file) {
			alert('Please select a file');
			return;
		}

		const formData = new FormData();
		formData.append('avatar', file);
		console.log(formData);
		console.log(file);

		const response = await fetch(BACKEND_DOMAIN + 'predict_text', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(file),
		});

		if (!response.ok) {
			throw new Error('Failed to send');
		}

		const result = await response.json();
		console.log(result);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				method="post"
				encType="multipart/form-data"
			>
				<label>
					Select a file:
					<input
						type="file"
						name="avatar"
						onChange={handleFileChange}
					/>
				</label>
				<button type="submit">Submit</button>
			</form>
			<div>
				<form
					action="/predict_text"
					method="post"
					encType="multipart/form-data"
				>
					<input
						type="file"
						name="avatar"
					/>
				</form>
			</div>
		</div>
	);
};
export default TextUploadForm;
