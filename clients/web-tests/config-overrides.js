// config-overrides.js
module.exports = function override(config, env) {
  config.module.rules = config.module.rules.map(rule => {
    if (!rule.oneOf) {
      return rule;
    }

    return {
      ...rule,
      oneOf: rule.oneOf.map(ruleObject => {
        const pattern = new RegExp(ruleObject.test);
        if (!pattern.test('.ts') || !ruleObject.include) {
          return ruleObject;
        }

        return {
          ...ruleObject,
          include: undefined,
        };
      }),
    };
  });

  return config;
};
