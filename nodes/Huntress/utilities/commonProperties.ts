import { IN8nRequestOperations } from "n8n-workflow";

// WARNING: Using this pagination with an action will cause all other querystring params to be ignored...
export const pagination: IN8nRequestOperations = {
	pagination: {
		type: 'generic',
		properties: {
			continue: "={{ $response.body.pagination.next_page }}",
			request: {
				qs: {
					page: "={{ $response.body.pagination.next_page }}",
					limit: 500,
				},
			},
		},
	}
}
