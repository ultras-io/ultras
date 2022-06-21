/**
 * Database primary key identifier:
 *   - number -> big int
 *   - string -> uuid
 */
declare type ResourceIdentifier = number;

/**
 * Declare same type as nullable.
 */
declare type Nullable<T> = null | T;
