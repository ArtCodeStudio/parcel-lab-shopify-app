/**
 * A list of articles allows you to specify the detailed contents of a delivery by defining for each item in the list the quantity, article number, and article name.
 * It is written into the field articles.
 * @see https://how.parcellab.works/docs/integration-quick-start/data-model#article-list
 */
export interface ParcellabArticle {
  articleNo: string;
  articleName: string;
  articleCategory?: string;
  articleUrl?: string;
  articleImageUrl?: string;
  quantity?: number;
}
