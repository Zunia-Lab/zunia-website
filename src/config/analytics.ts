/**
 * Google Analytics 4 measurement ID for the zunialab.com web stream ("G-XXXXXXXXXX").
 *
 * Empty means analytics stays off entirely: no consent bar, no footer link,
 * no script, no request. Fill it in to switch the feature on. Even then it
 * runs only in a production build, on the hosts below, after the visitor
 * chooses "Allow analytics".
 */
export const GA_MEASUREMENT_ID: string = "G-RFFYQ1H1SB";

/** The only hosts that may load analytics. Previews, localhost and mirrors never do. */
export const GA_HOSTS = ["zunialab.com", "www.zunialab.com"] as const;
