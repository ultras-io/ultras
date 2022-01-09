enum MatchStatuses {
  /**
   * Till start the match
   */
  preMatch = 'preMatch',

  /**
   * Match started [0, 45] [45, 90]
   */
  live = 'live',

  /**
   * half time, break time
   */
  halfTime = 'halfTime',

  /**
   * 45+, 90 +
   */
  extraTime = 'extraTime',

  /**
   *
   */
  penalties = 'penalties',

  /**
   * Match finished
   */
  finished = 'finished',

  /**
   * Match postponed
   */
  postponed = 'postponed',

  /**
   * Match canceled
   */
  canceled = 'canceled',
}

export default MatchStatuses;
