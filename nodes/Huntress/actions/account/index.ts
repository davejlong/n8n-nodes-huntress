import { INodeProperties } from "n8n-workflow";

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
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'account' }
							}
						]
					},
				}
			},
		],
		default: 'get'
	}
];

export { description };
