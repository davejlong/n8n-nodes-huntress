import { INodeProperties } from "n8n-workflow";
// import { pagination } from "../../utilities/commonProperties";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['agent'],
			}
		},
		routing: {
			request: {
				url: '/agents',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get agent',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'agent' }
							}
						]
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get agents',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'agents' }
							}
						]
					},
					request: {
						qs: {
							limit: 500,
						}
					}
					// operations: pagination,
					// send: {
					// 	paginate: true,
					// },
				}
			},
		],
		default: 'get'
	},
	/*
	 * Get All filter parameters
	**/
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['getAll'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Organization ID',
				name: 'organizationId',
				type: 'number',
				default: undefined,
				routing: {
					request: {
						qs: {
							'organization_id': "={{$value}}"
						},
					},
				},
			},
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				default: 'windows',
				options: [
					{ name: 'Windows', value: 'windows' },
					{ name: 'Mac OS', value: 'darwin' },
				],
				routing: {
					request: {
						qs: {
							platform: "={{$value}}"
						},
					},
				},
			},
		],
	},
	/*
	 * Get filter parameters
	**/
	{
		displayName: 'Agent ID',
		name: 'agentId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['agent'],
				operation: ['get'],
			}
		},
		routing: {
			request: {
				url: "=/agents/{{$value}}"
			}
		}
	}
];

export { description }
