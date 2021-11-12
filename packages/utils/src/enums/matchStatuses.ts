enum MatchStatuses {
  /**
   * Till start the match
   */
  preMatch = 1,

  /**
   * Match started [0, 45] [45, 90]
   */
  live,

  /**
   * half time, break time
   */
  halfTime,

  /**
   * 45+, 90 +
   */
  extraTime,

  /**
   *
   */
  penalties,

  /**
   * Match finished
   */
  finished,

  /**
   * Match postponed
   */
  postponed,

  /**
   * Match canceled
   */
  canceled,
}

export default MatchStatuses;
