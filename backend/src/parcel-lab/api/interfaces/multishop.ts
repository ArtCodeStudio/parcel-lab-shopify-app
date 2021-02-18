/**
 * If several shops (e.g. shops with multiple domains, dedicated shops for specific countries, or otherwise individual CI) are used within one account, each tracking is assigned to a shop using the key client.
 */
export interface ParcellabMultishop {
  /**
   * Client (Mandant in German) of the tracking in internal encoding.
   * E.g. the shop name
   *
   * @see https://how.parcellab.works/docs/integration-quick-start/data-model#multi-shop-setup
   */
  client?: string;
}
