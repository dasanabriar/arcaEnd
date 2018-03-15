import { Photo } from './photo';
import { SexType } from './sextype';
import { Preference } from './preference';
import { City } from './city';
import { Favorite } from './favorite';
import { ClientServiceType } from './clientservicetype';
import { ShoppingCart } from './shoppingcart';

export class User{
	idUsers: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	userName: string;
  	creationDate: Date;
	photos: Photo[];
	userType: number;
	city: City;
	favorites: Favorite[]
	sexType: SexType;
	preferences: Preference[];
	isFavorite:boolean;
	isAddedShopCart:boolean;
	dateBirth: Date;
	age: number;
	clientServicesType: ClientServiceType[];
	shoppingcart: ShoppingCart;
	nContracts: number;
}
