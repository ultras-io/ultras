import db from 'core/data/models';
import { DbIdentifier, ServiceByIdResultType, ServiceListParamsType } from 'types';

abstract class BaseService {
  protected static includeRelations(): any {
    return {};
  }

  protected static queryInit(): any {
    return {
      [db.Sequelize.Op.and]: [],
    };
  }

  protected static queryAppend(query: any, fieldName: string, condition: any) {
    query[db.Sequelize.Op.and].push({
      [fieldName]: condition,
    });
  }

  protected static async findAndCountAll<T>(
    model: any,
    query: any,
    params: ServiceListParamsType<T>
  ) {
    const { rows, count } = await model.findAndCountAll({
      limit: params.limit,
      offset: params.offset,
      where: query,
      order: [[params.orderAttr, params.order]],
      ...this.includeRelations(),
    });

    return { rows, count };
  }

  protected static async findById<T>(
    model: any,
    id: DbIdentifier
  ): ServiceByIdResultType<T> {
    const data = await model.findByPk(id, {
      ...this.includeRelations(),
    });

    return data;
  }
}

export default BaseService;
