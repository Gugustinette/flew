/**
 * CurrentUser Interface
 * @interface ICurrentUser
 * @property {string} username - Username of the user
 * @property {string} userId - UserId of the user (username#userId)
 * @property {string} avatar - Avatar link of the user
 * @property {string} token - Authentication token of the user
 */

export interface ICurrentUser {
  username: string;
  userId: string;
  avatar: string;
  token: string;
}
