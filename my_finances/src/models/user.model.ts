/**
 * User entity model
 * Represents a user of the my_finances application
 */
export interface User {
  /**
   * Unique identifier for the user
   */
  user_id: string;

  /**
   * User's email address (used for login)
   */
  email: string;

  /**
   * User's password (hashed)
   */
  password: string;

  /**
   * Date when the user was created
   */
  created_at: Date;

  /**
   * Date when the user was last updated
   */
  updated_at: Date;
}

/**
 * User registration data
 * Used when creating a new user
 */
export interface UserRegistration {
  /**
   * User's email address
   */
  email: string;

  /**
   * User's password (will be hashed before storage)
   */
  password: string;
}

/**
 * User login data
 * Used when authenticating a user
 */
export interface UserLogin {
  /**
   * User's email address
   */
  email: string;

  /**
   * User's password
   */
  password: string;
}

/**
 * User profile data
 * Used for displaying user information
 */
export interface UserProfile {
  /**
   * User's unique identifier
   */
  user_id: string;

  /**
   * User's email address
   */
  email: string;

  /**
   * Date when the user was created
   */
  created_at: Date;
} 