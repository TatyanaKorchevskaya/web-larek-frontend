import { Api, ApiListResponse } from './base/api';
import { IProduct, ApiResponse } from './../types/index'
export interface ILarekAPI {
	
}

export class LarekAPI extends Api implements ILarekAPI {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

    getProducts(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiResponse) =>
			data.items.map((item) => ({
				...item,
				image: item.image,
				id: item.id,
				description: item.description,
				title: item.title,
				category: item.category,
				price: item.price,
				selected: false
			}))
			// console.log(data)
		);
	}

	// getProducts(): void {
	// 	this.get('/product').then((data: ApiResponse) =>
	// 		// data.items.map((item) => ({
	// 		// 	...item,
	// 		// 	image: this.cdn + item.image,
	// 		// 	id: this.cdn + item.id,
	// 		// 	description: this.cdn + item.description,
	// 		// 	title: this.cdn + item.title,
	// 		// 	category: this.cdn + item.category,
	// 		// 	price: this.cdn + item.price,
	// 		// 	selected: false
	// 		// }))
	// 		console.log(data, this.cdn)
	// 	);
	// }
}

