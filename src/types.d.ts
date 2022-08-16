import type { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";

export type Controller = (event: APIGatewayEvent, context: Context) => Promise<ProxyResult>;

export type ResourcePath = `${string} /${string}`;

export type Routes = Record<ResourcePath, Controller>;
