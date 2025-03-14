import { ICredentialDataDecryptedObject, ICredentialTestFunctions,  IHttpRequestOptions } from "n8n-workflow";

/**
 * Validate credentials by getting the account information
 */
export async function validateCredentials(
	this: ICredentialTestFunctions,
	decryptedCredentials: ICredentialDataDecryptedObject,
): Promise<any> {
	const options: IHttpRequestOptions = {
		method: 'GET',
		url: '/account',
	};

	return await this.helpers.request(options);
}
