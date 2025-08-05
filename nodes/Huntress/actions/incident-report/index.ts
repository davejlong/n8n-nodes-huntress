import { INodeProperties } from "n8n-workflow";

const description: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['incidentReport'],
			}
		},
		routing: {
			request: {
				url: '/incident_reports',
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				action: 'Get incident report',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'incident_report' }
							}
						]
					},
				}
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get incident reports',
				routing: {
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: { property: 'incident_reports' }
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
				resource: ['incidentReport'],
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
				displayName: 'Agent ID',
				name: 'agentId',
				type: 'number',
				default: undefined,
				routing: {
					request: {
						qs: {
							'agent_id': "={{$value}}"
						},
					},
				},
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: 'sent',
				options: [
					{ name: 'Sent', value: 'sent' },
					{ name: 'Closed', value: 'closed' },
					{ name: 'Dismissed', value: 'dismissed'},
				],
				routing: {
					request: {
						qs: {
							status: "={{$value}}"
						},
					},
				},
			},
			{
				displayName: 'Severity',
				name: 'severity',
				type: 'options',
				default: 'critical',
				options: [
					{ name: 'Critical', value: 'critical' },
					{ name: 'High', value: 'high' },
					{ name: 'Low', value: 'low' },
				],
				routing: {
					request: {
						qs: {
							severity: "={{$value}}"
						},
					},
				},
			},
			{
				displayName: 'Indicator Type',
				name: 'indicatorType',
				type: 'options',
				default: 'antivirus_detections',
				options: [
					{ name: 'Antivirus Detections', value: 'antivirus_detections' },
					{ name: 'Footholds', value: 'footholds' },
					{ name: 'Managed Identity', value: 'managed_identity' },
					{ name: 'Monitored Files', value: 'monitored_files' },
					{ name: 'Process Detections', value: 'process_detections' },
					{ name: 'Ransomware Canaries', value: 'ransomware_canaries' },
				],
				routing: {
					request: {
						qs: {
							indicator_type: "={{$value}}"
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
					{ name: 'Microsoft 365', value: 'microsoft_365'},
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
		displayName: 'Incident Report ID',
		name: 'incidentReportId',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['incidentReport'],
				operation: ['get'],
			}
		},
		routing: {
			request: {
				url: "=/incident_reports/{{$value}}"
			}
		}
	}
];

export { description }
