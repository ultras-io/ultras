import { Transaction } from 'sequelize';
import db from 'core/data/models';
import { commonExcludeFields } from 'core/data/config/config';
import { ResourceIdentifier, ServiceByIdResultType, ServiceListParamsType } from 'types';
import { TransactionException } from 'modules/exceptions';

export type WithTransactionCallback = (transaction: Transaction) => any;

export type RelationGroupType =
  | Array<string | null | undefined>
  | string
  | null
  | undefined;

abstract class BaseService {
  protected static isRelationIncluded(
    includeRelations: RelationGroupType,
    relationName: string
  ): boolean {
    if (!includeRelations) {
      return true;
    }
    if (Array.isArray(includeRelations)) {
      return includeRelations.includes(relationName);
    }
    if (typeof includeRelations === 'string') {
      return includeRelations === relationName;
    }
    return false;
  }

  protected static getRelationsHierarchy(
    relations: RelationGroupType,
    relationNames: Record<string, Array<string>>
  ): RelationGroupType {
    const accumulator: Array<string> = [];
    if (relationNames) {
      for (const parentName in relationNames) {
        for (const relationName of relationNames[parentName]) {
          const name = `${parentName}.${relationName}`;
          if (this.isRelationIncluded(relations || [], name)) {
            accumulator.push(relationName);
          }
        }
      }
    }

    return accumulator;
  }

  protected static includeRelations(
    // eslint-disable-line @typescript-eslint/no-unused-vars
    includeRelations: RelationGroupType = null,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    args: any = {}
  ): any {
    return {};
  }

  public static getIncludeRelations(
    includeRelations: RelationGroupType = null,
    args: any = {}
  ) {
    // get model relations
    const relations = this.includeRelations(includeRelations, args);

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

  protected static queryArrayOrSingle(
    query: any,
    fieldName: string,
    value: any,
    separator = ','
  ) {
    const condition = this.getCondition(value, separator);
    if (!condition) {
      return;
    }

    return this.queryAppend(query, fieldName, condition);
  }

  protected static getCondition(value: any, separator = ',') {
    const list = this.separateIds(value, separator);
    if (!list.length) {
      return null;
    }

    if (list.length > 1) {
      return {
        [db.Sequelize.Op.in]: list,
      };
    }

    return {
      [db.Sequelize.Op.eq]: list[0],
    };
  }

  protected static separateIds(value: any, separator = ',') {
    if (!value) {
      return [];
    }

    const list = Array.isArray(value) ? value : value.split(separator);
    return list.filter((id: null | ResourceIdentifier) => !!id);
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
    includeModelRelations = true,
    moreQueryOptions: any = {}
  ) {
    let queryOptions = {
      limit: params.limit,
      offset: params.offset,
      where: query,
      order: [[params.orderAttr, params.order]],
      include: [],
    };

    if (includeModelRelations) {
      queryOptions = {
        ...queryOptions,
        ...this.includeRelations(),
      };
    }

    if (moreQueryOptions) {
      moreQueryOptions = moreQueryOptions || {};
      if (moreQueryOptions.where) {
        moreQueryOptions.where = {
          [db.Sequelize.Op.and]: {
            ...queryOptions.where[db.Sequelize.Op.and],
            ...moreQueryOptions.where,
          },
        };
      }

      if (moreQueryOptions.include) {
        moreQueryOptions.include = [
          ...(queryOptions.include || []),
          ...moreQueryOptions.include,
        ];

        moreQueryOptions.include = [
          ...new Map(
            moreQueryOptions.include.map((item: any) => [item.as, item])
          ).values(),
        ];
      }

      queryOptions = {
        ...queryOptions,
        ...moreQueryOptions,
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
    id: ResourceIdentifier,
    selectOptions: any = {}
  ): ServiceByIdResultType<T> {
    const data = await model.findByPk(id, {
      ...this.includeRelations(),
      ...selectOptions,
    });

    return data;
  }

  /**
   * Check data exists with provider identifier.
   */
  protected static async checkExistsById(model: any, id: ResourceIdentifier) {
    const count = await model.count({
      where: {
        id: id,
      },
      limit: 1,
    });

    return count == 1;
  }

  /**
   * Execute database actions with transaction.
   */
  public static async withTransaction(callback: WithTransactionCallback) {
    const transaction = await db.sequelize.transaction();

    try {
      const result = await callback(transaction);
      await transaction.commit();

      return result;
    } catch (e) {
      await transaction.rollback();

      throw TransactionException.copyFrom(e as Error);
    }
  }
}

export default BaseService;
