import { ICurrentUser } from "@/store/interfaces/CurrentUser";
import { IFlew } from "@/store/interfaces/Flew";
import { ICategory } from "@/store/interfaces/Category";
import { IRoom } from "@/store/interfaces/Room";

/**
 * Vuex State Interface
 * @interface IState
 * @property {ICurrentUser} user - Current user
 * @property {string} token - Authentication token
 * @property {IFlew[]} flews - Accessible flews of the user
 * @property {ICategory[]} currentCategories - Categories of the opened flew
 * @property {IRoom[]} currentRoom - Current room of the opened flew
 */

export interface IState {
  Global: {
    baseUrl: string;
    baseUrlAPI: string;
    baseUrlWS: string;
    socket: any;
    showRooms: boolean;
    showSettings: boolean;
    showCreateRoom: boolean;
    showCreateCategory: boolean;
    view: string;
  };
  User: {
    user: ICurrentUser;
    token: string;
  };
  Flew: {
    flews: IFlew[];
    currentFlew: IFlew;
    currentCategories: ICategory[];
    currentCategory: ICategory;
    currentRoom: IRoom;
    categoryToCreateRoom: ICategory;
  };
}
