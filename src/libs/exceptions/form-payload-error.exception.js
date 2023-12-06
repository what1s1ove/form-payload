class FormPayloadError extends Error {
	/**
	 * @param {{
	 * 	message: string;
	 * }} params
	 */
	constructor({ message }) {
		super(message);
		this.message = message;
		this.name = 'FormPayloadError';
	}
}

export { FormPayloadError };
