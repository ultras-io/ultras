enum MatchStatusesEnum {
  /**
   * Time to be defined.
   */
  timeToBeDefined = 'time-to-be-defined',

  /**
   * Till start the match.
   */
  preMatch = 'pre-match',

  /**
   * Match started [0, 45] [45, 90]
   */
  live = 'live',

  /**
   * half time, break time.
   */
  halfTime = 'half-time',

  /**
   * 45+, 90 +
   */
  extraTime = 'extra-time',

  /**
   * Penalties time.
   */
  penalties = 'penalties',

  /**
   * Match finished.
   */
  finished = 'finished',

  /**
   * Match postponed.
   */
  postponed = 'postponed',

  /**
   * Match canceled.
   */
  canceled = 'canceled',

  /**
   * Match suspended.
   */
  suspended = 'suspended',

  /**
   * Match interrupted.
   */
  interrupted = 'interrupted',
}

export default MatchStatusesEnum;
