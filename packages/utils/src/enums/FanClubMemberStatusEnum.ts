enum FanClubMemberStatusEnum {
  /**
   * User is not a club member.
   */
  notRelated = 'not-related',

  /**
   * Member in club and active.
   */
  active = 'active',

  /**
   * Member requested to join club.
   */
  pendingRequest = 'pending-request',

  /**
   * Member invited.
   */
  pendingInvitation = 'pending-invitation',

  /**
   * Member banned.
   */
  banned = 'banned',
}

export default FanClubMemberStatusEnum;
