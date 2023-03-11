/**
 * UserLogin Interface
 * @interface IUserLogin
 * @property {string} username - Username of the user
 * @property {string} password - Password of the user
 */

export interface IUserLogin {
  username: string;
  password: string;
}

export interface IUserSignup {
  username: string;
  password: string;
  email: string;
}
