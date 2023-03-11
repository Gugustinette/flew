/**
 * Flew Interface
 */

// Flew Interface
export interface IFlew {
  _id: string;
  name: string;
  description: string;
}

// Get Flews Interface
export interface IGetFlews {
  userId: string;
}

// Create Flew Interface
export interface ICreateFlew {
  userId: string;
  name: string;
  description: string;
}

// Delete Flew Interface
export interface IDeleteFlew {
  userId: string;
  flewId: string;
}

// Join Flew Interface
export interface IJoinFlew {
  token: string;
}
