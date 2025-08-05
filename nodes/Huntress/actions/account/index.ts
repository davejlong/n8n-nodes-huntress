import { INodeProperties } from "n8n-workflow";
import { huntressRootProperty } from "../../utilities/GenericFunctions";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			}
		},
		routing: {
			request: {
				url: '/account',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get account',
				routing: {
					output: {
						postReceive: [huntressRootProperty('account')]
					},
				}
			},
		],
		default: 'get'
	}
];

export { description };
