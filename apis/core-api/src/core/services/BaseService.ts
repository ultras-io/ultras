import db from 'core/data/models';
import { commonExcludeFields } from 'core/data/config/config';
import { DbIdentifier, ServiceByIdResultType, ServiceListParamsType } from 'types';

abstract class BaseService {
  protected static includeRelations(): any {
    return {};
  }

  public static getIncludeRelations() {
    // get model relations
    const relations = this.includeRelations();

    // append global exclude attribute to child relations
    relations.attributes = relations.attributes || {};
    relations.attributes.exclude = [
      ...(relations.attributes.exclude || []),
      ...commonExcludeFields,
    ];

    // return mutated relations
    return relations;
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

  /**
   * Action will return:
   * 1) rows corresponding condition and pagination.
   * 2) count of rows corresponding condition.
   *
   * You can pass parameter "includeModelRelations = true" to
   * get rows with declared relations.
   *
   * @important Child service must be implement "includeRelations" method.
   */
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

  /**
   * Get model instance from database with their relations.
   *
   * @important Child service must be implement "includeRelations" method.
   */
  protected static async findById<T>(
    model: any,
    id: DbIdentifier
  ): ServiceByIdResultType<T> {
    const data = await model.findByPk(id, {
      ...this.includeRelations(),
    });

    return data;
  }

  /**
   * Check data exists with provider identifier.
   */
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
