import { ICredentialDataDecryptedObject, ICredentialsDecrypted, ICredentialTestFunctions, INodeCredentialTestResult, INodeType, INodeTypeDescription,  } from "n8n-workflow";
import { validateCredentials } from "./transport";

import * as account from './actions/account';
import * as agent from './actions/agent';
import * as billingReport from './actions/billing-report';
import * as incidentReport from './actions/incident-report';
import * as organization from './actions/organization';
import * as summaryReport from './actions/summary-report';
import * as signal from './actions/signals';
import { huntressApiPagination } from "./utilities/GenericFunctions";

export class Huntress implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Huntress',
		name: 'huntress',
		icon: 'file:huntress.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Work with the Huntress API',
		defaults: {
			name: 'Huntress',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'huntressApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.huntress.io/v1',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
			},
		},
		requestOperations: {
			pagination: huntressApiPagination,
			// pagination: {
			// 	type: 'generic',
			// 	properties: {
			// 		continue: "={{ $response.body.pagination.next_page }}",
			// 		request: {
			// 			qs: {
			// 				page: "={{ $response.body.pagination.next_page }}",
			// 				limit: 500,
			// 			},
			// 		},
			// 	},
			// },
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Agent', value: 'agent' },
					{ name: 'Billing Report', value: 'billingReport'},
					{ name: 'Incident Report', value: 'incidentReport'},
					{ name: 'Organization', value: 'organization' },
					{ name: 'Signal', value: 'signal'},
					{ name: 'Summary Report', value: 'summaryReport'},
				],
				default: 'account',
			},
			...account.description,
			...agent.description,
			...billingReport.description,
			...incidentReport.description,
			...organization.description,
			...signal.description,
			...summaryReport.description,
		],
	};

	methods = {
		credentialTest: {
			async huntressCredentialTest(
				this: ICredentialTestFunctions,
				credential: ICredentialsDecrypted,
			): Promise<INodeCredentialTestResult> {
				try {
					await validateCredentials.call(this, credential.data as ICredentialDataDecryptedObject);
				} catch (error) {
					return {
						status: 'Error',
						message: `(${error.statusCode}) ${error.status}`,
					};
				}
				return {
					status: 'OK',
					message: 'Connection successful!',
				};
			}
		},
	};
}
