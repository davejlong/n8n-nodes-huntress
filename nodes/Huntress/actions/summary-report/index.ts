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
						postReceive: [huntressRootProperty('report')],
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get summary reports',
				routing: {
					output: {
						postReceive: [huntressRootProperty('reports')],
					},
					request: {
						qs: {
							limit: 500,
						},
					},
					send: {
						paginate: true,
					},
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
					send: {
						property: "organization_id",
						value: "={{$value}}",
						type: "query",
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
					send: {
						property: "type",
						value: "={{$value}}",
						type: "query",
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
