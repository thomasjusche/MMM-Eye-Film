const NodeHelper = require("node_helper");
import fetchShows from "./api";
import { EyeFilmNotifications } from "../types/EyeFilmNotifications";

interface RefreshShowsNotificationPayload {
  startDateTime: string;
  endDateTime: string;
  siteId: string;
}

module.exports = NodeHelper.create({
  socketNotificationReceived<T extends RefreshShowsNotificationPayload>(
    notification: string,
    payload: T
  ): void {
    if (notification === EyeFilmNotifications.REFRESH_SHOWS) {
      this.getShows(payload.startDateTime, payload.endDateTime, payload.siteId);
    }
  },

  async getShows(
    startDateTime: string,
    endDateTime: string,
    siteId = "eyeEnglish"
  ) {
    try {
      const shows = await fetchShows(startDateTime, endDateTime, siteId);
      this.sendSocketNotification(EyeFilmNotifications.EYE_FILM_SHOWS, {
        id: this.name,
        shows,
        error: null
      });
    } catch (e) {
      console.error(e);
      this.sendSocketNotification(EyeFilmNotifications.EYE_FILM_ERROR, {
        id: this.name,
        shows: [],
        error: (e as any).toString()
      });
    }
  }
});
