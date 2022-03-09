import db from 'core/data/models';
import { DbIdentifier, ServiceByIdResultType, ServiceListParamsType } from 'types';

abstract class BaseService {
  protected static includeRelations(): any {
    return {};
  }

  protected static queryInit(initialConditions: any = {}): any {
    const query: any = {
      [db.Sequelize.Op.and]: [],
    };

    for (const field in initialConditions) {
      this.queryAppend(query, field, initialConditions[field]);
    }

    return query;
  }

  protected static queryAppend(query: any, fieldName: string, condition: any) {
    query[db.Sequelize.Op.and].push({
      [fieldName]: condition,
    });
  }

  protected static async findAndCountAll<T>(
    model: any,
    query: any,
    params: ServiceListParamsType<T>,
    includeModelRelations = true
  ) {
    let queryOptions = {
      limit: params.limit,
      offset: params.offset,
      where: query,
      order: [[params.orderAttr, params.order]],
    };

    if (includeModelRelations) {
      queryOptions = {
        ...queryOptions,
        ...this.includeRelations(),
      };
    }

    const { rows, count } = await model.findAndCountAll(queryOptions);
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

  protected static async checkExistsById(model: any, id: DbIdentifier) {
    const count = await model.count({
      where: {
        id: id,
      },
      limit: 1,
    });

    return count == 1;
  }
}

export default BaseService;
