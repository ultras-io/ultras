# Base Generic Types

The function receives a tree generic types

- `TData` - The model data type which we want to work with them.
- `TFilter` - The filter arguments that will be used for filtering data using API _(It
  will call `loadAll` method internally and will pass data to callback function)_.
- `TKey` - The key list for generating CRUD state and methods _(when we add the data type
  we need to specify `keys: [...]` on generator object)_.

Example:

```typescript
import { generateCRUD, Filterable, IInitStoreParams } from './generateCRUD';
import { FanClubViewModel, FilterFanClub } from '@app/view-models';

type ParamType<TScheme> = IInitStoreParams<TData, TScheme>;

type TFilter = Filterable<FilterFanClub>>;
type TKey = 'list' | 'single' | 'add' | 'update' | 'delete';

const storeBuilder = <TScheme>(params: Partial<ParamType<TScheme>> = {}) => {
  return generateCRUD<
    TDataList,
    TDataSingle,
    TDataCreate,
    TDataUpdate,
    TDataDelete,
    TFilter,
    TScheme,
    TKey
  >({
    // CRUD options ...
  });
};

const store = storeBuilder();
```

---

Available options:

```typescript
interface IProps<TData, TKey, TFilter> {
  // common
  keys?: Array<TKey>;

  // list
  limit?: number; // default is 50
  loadAll(filter: FullFilterable<Partial<TFilter>>): GetListPromiseType<TData>;

  // single
  loadSingle(id: ResourceIdentifier): GetSinglePromiseType<TData>;

  // add
  scheme: IScheme;
  beforeSend: IBeforeSend<TData> | null;
  create(data: Partial<TData>): CreatePromiseType<TData>;
}
```
