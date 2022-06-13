// import { UserViewModel, UserSDK, ResourceIdentifier } from '@ultras/core-api-sdk';
// import { generateCRUD, InitStoreParamsInterface } from './generateCRUD';

// type ParamType = InitStoreParamsInterface<UserViewModel>;

// const sdk = new UserSDK('dev');

// const buildUserStore = (params: Partial<ParamType> = {}) => {
//   return generateCRUD<UserViewModel, FilterType, 'list' | 'single'>({
//     keys: ['list', 'single'],
//     ...(params as ParamType),

//     loadAll: (filter: FullFilterable<FilterType>) => {
//       return sdk.getTeams({
//         ...filter,
//       });
//     },

//     loadSingle: (id: ResourceIdentifier) => {
//       return sdk.getTeam(id);
//     },
//   });
// };

// export default buildTeamsStore;
