import type { RequestHandler, RequestEvent } from './$types';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }: RequestEvent) => {
	const data = await request.json();

	console.log(data);

	return json({ message: 'POST' });
};
