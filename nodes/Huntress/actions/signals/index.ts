import { INodeProperties } from "n8n-workflow";
import { huntressRootProperty } from "../../utilities/GenericFunctions";

const description: INodeProperties[] = [
	{
		displayName: "Operation",
		name: "operation",
		type: "options",
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ["signal"],
			},
		},
		options: [
			{
				name: "Get",
				value: "get",
				action: "Get signal",
				routing: {
					request: {
						url: "=/signals/{{$parameter.id}}",
					},
					output: {
						postReceive: [huntressRootProperty('signal')],
					},
				},
			},
			{
				name: "Get Many",
				value: "getAll",
				action: "Get signals",
				routing: {
					request: {
						url: "/signals",
					},
					output: {
						postReceive: [huntressRootProperty('signals')],
					},
					send: {
						paginate: true,
					},
				},
			},
		],
		default: "getAll"
	},
	/*
	 * Get All filter paramters
	**/
	{
		displayName: "Filters",
		name: "filters",
		type: "collection",
		placeholder: "Add Filter",
		displayOptions: {
			show: {
				resource: ["signal"],
				operation: ["getAll"],
			},
		},
		default: {},
		options: [
			{
				displayName: "Entity Type",
				name: "entityType",
				type: "options",
				default: "agent",
				options: [
					{ name: "Agent", value: "agent" },
					{ name: "Identity", value: "identity" },
					{ name: "Service Principal", value: "service_principal" },
					{ name: "Source", value: "source" },
					{ name: "User", value: "user_entity" },
				],
				routing: {
					send: {
						property: "entity_type",
						value: "={{$value}}",
						type: "query",
					},
				},
			},
			{
				displayName: "Entity ID",
				name: "entityId",
				type: "string",
				default: "",
				routing: {
					send: {
						property: "entity_id",
						value: "={{$value}}",
						type: "query"
					}
				}
			},
			{
				displayName: "Types",
				name: "types",
				type: "multiOptions",
				default: [],
				options: [
					{ name: "Antivirus", value: "Antivirus" },
					{ name: "Favicon Detections", value: "Favicon Detections" },
					{ name: "Footholds", value: "Footholds" },
					{ name: "Managed ITDR", value: "Managed ITDR" },
					{ name: "MDE Detections", value: "MDE Detections" },
					{ name: "Process Insights", value: "Process Insights"},
					{ name: "Ransomware Canaries", value: "Ransomware Canaries" },
					{ name: "SIEM", value: "SIEM" },
				],
				routing: {
					send: {
						property: "types",
						value: "={{$value.join(',')}}",
						type: "query",
					},
				},
			},
			{
				displayName: "Statuses",
				name: "statuses",
				type: "multiOptions",
				default: [],
				options: [
					{ name: "Reported", value: "reported" },
					{ name: "Closed", value: "closed" },
				],
				routing: {
					send: {
						property: "statuses",
						value: "={{$value.join(',')}}",
						type: "query",
					},
				},
			},
		],
	},
	/**
	 * Get filter parameters
	 */
	{
		displayName: 'Signal ID',
		name: 'id',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['signal'],
				operation: ['get'],
			}
		},
	}
];

export { description }
