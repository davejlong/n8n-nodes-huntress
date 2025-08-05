import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['billingReport'],
			}
		},
		routing: {
			request: {
				url: '/billing_reports',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get billing report',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'billing_report' }
							}
						]
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get billing reports',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'billing_reports' }
							}
						]
					},
					request: {
						qs: {
							limit: 500,
						},
					},
					send: {
						paginate: true,
					},
				},
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
				resource: ['billingReport'],
				operation: ['getAll'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'open',
				options: [
					{ name: 'Failed', value: 'failed' },
					{ name: 'Full Refund', value: 'full_refund' },
					{ name: 'Open', value: 'open' },
					{ name: 'Paid', value: 'paid' },
					{ name: 'Partial Refund', value: 'partial_refund' },
				],
				routing: {
					request: {
						qs: {
							status: "={{$value}}"
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
		displayName: 'Billing Report ID',
		name: 'billingReportId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['billingReport'],
				operation: ['get'],
			}
		},
		routing: {
			request: {
				url: "=/billing_reports/{{$value}}"
			}
		}
	}
];

export { description }
