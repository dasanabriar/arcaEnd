import { Photo } from './photo';
import { SexType } from './sextype';
import { Preference } from './preference';
import { City } from './city';
import { Favorite } from './favorite';

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
}
