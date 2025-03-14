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
				resource: ['summaryReport'],
			}
		},
		routing: {
			request: {
				url: '/reports',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get summary report',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'report' }
							}
						]
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get summary reports',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'reports' }
							}
						]
					},
					request: {
						qs: {
							limit: 500,
						},
					},
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
				resource: ['summaryReport'],
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
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'monthly_summary',
				options: [
					{ name: 'Monthly', value: 'monthly_summary' },
					{ name: 'Quarterly', value: 'quarterly_summary' },
					{ name: 'Yearly', value: 'yearly_summary' },
				],
				routing: {
					request: {
						qs: {
							type: "={{$value}}"
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
		displayName: 'Summary Report ID',
		name: 'summaryReportId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['summaryReport'],
				operation: ['get'],
			}
		},
		routing: {
			request: {
				url: "=/reports/{{$value}}"
			}
		}
	}
];

export { description }
