import { db } from '../../../hooks.server';

export const load = async () => {
	const products = await db.product.findMany({
		select: {
			id: true,
			name: true,
			priceInCents: true,
			isAvailableForPurchase: true,
			filePath: true,
			_count: {
				select: {
					Order: true
				}
			}
		},
		orderBy: { name: 'asc' }
	});
	return {
		products
	};
};

export const actions = {
	toggleAvailability: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;
		const isAvailableForPurchase = formData.has('isAvailableForPurchase');
		await db.product.update({
			where: { id },
			data: { isAvailableForPurchase }
		});
	}
};
