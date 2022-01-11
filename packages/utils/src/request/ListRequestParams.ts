import PaginationParams from './PaginationParams';
import OrderEnum from '../enums/OrderEnum';

interface ListRequestParams extends PaginationParams {
  order?: OrderEnum;
  orderAttr?: string;
}

export default ListRequestParams;
