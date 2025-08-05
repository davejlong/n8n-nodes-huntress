import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['organization'],
			}
		},
		routing: {
			request: {
				url: '/organizations',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get organization',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'organization' }
							}
						]
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get organizations',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'organizations' }
							}
						]
					},
					send: {
						paginate: true,
					}
				}
			},
		],
		default: 'get'
	},
	{
		displayName: 'Organization ID',
		name: 'organizationId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['get'],
			}
		},
		routing: {
			request: {
				url: "=/organizations/{{$value}}"
			}
		}
	}
];

export { description }
