import { DeclarativeRestApiSettings, IExecutePaginationFunctions, INodeExecutionData, IPostReceiveRootProperty } from "n8n-workflow";

export async function huntressApiPagination(
	this: IExecutePaginationFunctions,
	requestData: DeclarativeRestApiSettings.ResultOptions,
): Promise<INodeExecutionData[]> {
	const responseData: INodeExecutionData[] = [];
	requestData.options.qs = requestData.options.qs ?? {};
	let responseMax = 1000;

	// Figure out the root property from the node description.
	// Note: All post receive actions are removed for pagination... this may need to change in the future
	// 			 if other actions are implemented such as sorting.
	const rootPropertyAction = requestData.postReceive[0].actions[0] as IPostReceiveRootProperty;
	const rootProperty = rootPropertyAction.properties.property;
	requestData.postReceive = [];

	do {
		const pageResponseData: INodeExecutionData[] = await this.makeRoutingRequest(requestData);
		const items = pageResponseData[0].json[rootProperty] as [];
		items.forEach(item => responseData.push({ json: item }));

		const pagination = pageResponseData[0].json.pagination as {next_page_token: string | undefined};

		requestData.options.qs.page_token = pagination.next_page_token;
	} while(responseData.length <= responseMax && requestData.options.qs.page_token);

	return responseData;
}
