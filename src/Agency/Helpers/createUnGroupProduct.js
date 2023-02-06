import { findProductsByHBL } from "../hooks/useFetchTrackingByHBL";

export const createUnGroupedProduct = async (productsInContainer, HBL, ContainerId, UserId=null,) => {
	let productToUngroup = {};
	let product = await productsInContainer?.find((prodContainer) => prodContainer?.HBL == HBL);
	if (product)
		productToUngroup = {
			LocationId: 2,
			InvoiceId: product?.InvoiceId,
			HBL: product?.HBL,
			UserId: UserId,
			Description: product?.Description,
			CustomerId: product?.CustomerId,
			RecieverId: product?.RecieverId,
			Location: product?.Location,
			ContainerName: product?.ContainerName,
			ContainerId: product?.ContainerId,
			CityId: product?.CityId,
			StateId: product?.StateId,
			PalletId: product?.PalletId,
			Agency: product?.Agency,
			ProductWeight: product?.ProductWeight,
			StatusId: 2,
		};
	else {
		const HBLToFind = [];
		HBLToFind.push({ HBL: HBL });
		let productResult = await findProductsByHBL(HBLToFind);
		if (productResult) {
			let product = productResult[0];
			if (product)
				productToUngroup = {
					LocationId: 2,
					InvoiceId: product?.InvoiceId,
					HBL: product?.HBL,
					UserId: UserId,
					Description: product?.Description,
					CustomerId: product?.CustomerId,
					RecieverId: product?.RecieverId,
					Location: product?.Location,
					ContainerName: product?.ContainerName,
					ContainerId: ContainerId,
					CityId: product?.CityId,
					StateId: product?.StateId,
					PalletId: product?.PalletId,
					Agency: product?.Agency,
					ProductWeight: product?.ProductWeight,
					StatusId: 3,
				};
			console.log(productToUngroup, "FIND PRODUCT APIIIIIIIIIIIIIIIIIIIIIIIIIII");
			return productToUngroup;
		}
	}

	console.log(productToUngroup, "PREPARIN PRODUCTS FROM INSERT");
	return productToUngroup;
};
