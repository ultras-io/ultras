# Base Generic Types

The function receives a tree generic types

- `TData` - The model data type which we want to work with them.
- `TFilter` - The filter arguments that will be used for filtering data using API _(It
  will call `loadAll` method internally and will pass data to callback function)_.
- `TKey` - The key list for generating CRUD state and methods _(when we add the data type
  we need to specify `keys: [...]` on generator object)_.

Example:

```typescript
import { FanClubViewModel, FilterFanClub } from '@app/view-models';
import { generateCRUD, Filterable } from './generateCRUD';

type TFilter = Filterable<FilterFanClub>>;
type TKey = 'list' | 'single' | 'add' | 'update' | 'delete';

const store = generateCRUD<FanClubViewModel, TFilter, TKey>({
  // CRUD options ...
});
```

---

Available options:

```typescript
interface PropsInterface<TData, TKey, TFilter> {
  // common
  keys?: Array<TKey>;

  // list
  limit?: number; // default is 50
  loadAll(filter: FullFilterable<Partial<TFilter>>): GetListPromiseType<TData>;

  // single
  loadSingle(id: ResourceIdentifier): GetSinglePromiseType<TData>;

  // add
  scheme: SchemeInterface;
  beforeSend: BeforeSendInterface<TData> | null;
  create(data: Partial<TData>): CreatePromiseType<TData>;
}
```