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

/**
 * Common field that can be contains any view-model instance, like:
 *   - id
 *   - createdAt
 *   - updatedAt
 */
declare type ViewModel<T> = T & {
  id: ResourceIdentifier;
};
