/**
 * These special keys alter how the system handles the trackings.
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#special-keys
 */
export interface ParcellabSpecialKeys {
  /**
   * If true the delivery is handled as a return,
   * i.e. by default no communication is sent to the set recipient,
   * dispatch delays will not be monitored, and the tracking will not be considered for general reporting
   */
  return: boolean;
  /**
   * If true delivery is cancelled, i.e. no communication is sent to the set recipient, all monitoring and reporting is disabled
   */
  cancelled: boolean;
}
