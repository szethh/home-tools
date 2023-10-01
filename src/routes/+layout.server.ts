export const load = async ({ cookies }) => {
	const user = cookies.get('user') ?? 'anon';

	return { user };
};
