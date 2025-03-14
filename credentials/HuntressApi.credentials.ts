import { IAuthenticateGeneric, ICredentialTestRequest, ICredentialType, INodeProperties } from "n8n-workflow";

export class HuntressApi implements ICredentialType {
	name = 'huntressApi';
	displayName = 'Huntress API';
	documentationUrl = 'https://github.com/davejlong/n8n-nodes-huntress';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'API Secret Key',
			name: 'apiSecret',
			type: 'string',
			typeOptions: { password: true, },
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: "={{$credentials.apiKey}}",
				password: "={{$credentials.apiSecret}}",
			},
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			}
		}

	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.huntress.io/v1',
			url: '/account',
			method: 'GET'
		},
	}
}
