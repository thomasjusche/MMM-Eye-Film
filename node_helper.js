'use strict';

var graphqlRequest = require('graphql-request');
var gql = require('graphql-tag');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var gql__default = /*#__PURE__*/_interopDefaultLegacy(gql);

const ShowsDocument = gql__default["default"] `
    query shows($siteId: [String], $search: String = null, $productionType: Int = null, $startDateTime: [QueryArgument], $label: [String] = null, $productionThemeId: Int = null, $language: String = null) {
  shows(
    site: $siteId
    productionThemeId: $productionThemeId
    productionType: $productionType
    search: $search
    startDateTime: $startDateTime
    label: $label
    language: $language
  ) {
    ... on show_show_Entry {
      id
      language
      startDateTime @formatDateTime(format: "Y-m-d H:i", timezone: "Europe/Amsterdam")
      endDateTime @formatDateTime(format: "Y-m-d H:i", timezone: "Europe/Amsterdam")
      cinemaRoom
      ticketStatus(label: true)
      production {
        ... on production_production_Entry {
          image {
            url
          }
          poster {
            url
          }
          title
          slug
          year
          director
          length
          itemIntroText
          mainTheme {
            title
          }
          tag {
            title
          }
          tagline
          ticketStatus(label: true)
          primaryLanguage
        }
      }
    }
  }
}
    `;
const defaultWrapper = (action, _operationName) => action();
function getSdk(client, withWrapper = defaultWrapper) {
    return {
        shows(variables, requestHeaders) {
            return withWrapper((wrappedRequestHeaders) => client.request(ShowsDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }), 'shows');
        }
    };
}

async function getShows(startDateTime, endDateTime, siteId = "eyeEnglish") {
    const client = new graphqlRequest.GraphQLClient("https://www.eyefilm.nl/en/graphql");
    const variables = {
        startDateTime: ["and", `> ${startDateTime}`, `< ${endDateTime}`],
        siteId
    };
    const sdk = getSdk(client);
    const { shows } = await sdk.shows(variables);
    return shows;
}

var EyeFilmNotifications;
(function (EyeFilmNotifications) {
    EyeFilmNotifications["REFRESH_SHOWS"] = "REFRESH_SHOWS";
    EyeFilmNotifications["EYE_FILM_SHOWS"] = "EYE_FILM_SHOWS";
    EyeFilmNotifications["EYE_FILM_ERROR"] = "EYE_FILM_ERROR";
})(EyeFilmNotifications || (EyeFilmNotifications = {}));

const NodeHelper = require("node_helper");
module.exports = NodeHelper.create({
    socketNotificationReceived(notification, payload) {
        if (notification === EyeFilmNotifications.REFRESH_SHOWS) {
            this.getShows(payload.startDateTime, payload.endDateTime, payload.siteId);
        }
    },
    async getShows(startDateTime, endDateTime, siteId = "eyeEnglish") {
        try {
            const shows = await getShows(startDateTime, endDateTime, siteId);
            this.sendSocketNotification(EyeFilmNotifications.EYE_FILM_SHOWS, {
                id: this.name,
                shows,
                error: null
            });
        }
        catch (e) {
            console.error(e);
            this.sendSocketNotification(EyeFilmNotifications.EYE_FILM_ERROR, {
                id: this.name,
                shows: [],
                error: e.toString()
            });
        }
    }
});
