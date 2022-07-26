var EyeFilmNotifications;
(function (EyeFilmNotifications) {
    EyeFilmNotifications["REFRESH_SHOWS"] = "REFRESH_SHOWS";
    EyeFilmNotifications["EYE_FILM_SHOWS"] = "EYE_FILM_SHOWS";
    EyeFilmNotifications["EYE_FILM_ERROR"] = "EYE_FILM_ERROR";
})(EyeFilmNotifications || (EyeFilmNotifications = {}));

// Copy of MagicMirror/modules-types.ts, here so the typescript compiler can find it when building
var Module$1 = Module;

/// <reference path="../../../../node_modules/moment/moment.d.ts" />
Module$1.register("MMM-Eye-Film", {
    requiresVersion: "2.12.0",
    shows: [],
    error: null,
    // Default module config.
    defaults: {
        refreshInterval: 10 * 60 * 1000,
        maxEntries: 20,
        getStartTime: () => moment().toISOString(),
        getEndTime: () => moment().endOf("day").toISOString()
    },
    start() {
        this.sendRefreshNotification();
        setInterval(() => this.sendRefreshNotification(), this.config.refreshInterval);
    },
    sendRefreshNotification: function () {
        const notificationPayload = {
            startDateTime: this.config.getStartTime(),
            endDateTime: this.config.getEndTime(),
            siteId: this.translate("siteId")
        };
        this.sendSocketNotification(EyeFilmNotifications.REFRESH_SHOWS, notificationPayload);
    },
    getDom: function () {
        return this.getTable();
    },
    getHeader: function () {
        return this.translate("TODAY_IN_EYE");
    },
    getScripts: function () {
        return ["moment.js"];
    },
    getStyles: () => {
        return ["MMM-Eye-Film.css"];
    },
    getTranslations: function () {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json"
        };
    },
    socketNotificationReceived(notification, payload) {
        console.log(notification);
        switch (notification) {
            case EyeFilmNotifications.EYE_FILM_SHOWS:
                this.removeError();
                this.setShows(payload.shows);
                this.updateDom();
                break;
            case EyeFilmNotifications.EYE_FILM_ERROR:
                this.setError(payload.error);
                this.updateDom();
                break;
            //
        }
    },
    setShows(shows) {
        this.shows = shows;
    },
    setError(error) {
        this.error = error;
    },
    removeError() {
        this.setError(null);
    },
    getTable() {
        const table = document.createElement("table");
        table.classList.add("eye-film-table", "light", "small");
        if (this.error) {
            const errorRow = document.createElement("tr");
            errorRow.classList.add("xsmall");
            const errorCell = document.createElement("td");
            errorCell.colSpan = 2;
            errorCell.innerText = this.error;
            errorRow.appendChild(errorCell);
            table.appendChild(errorRow);
        }
        const shows = this.shows.slice(0, this.config.maxEntries);
        shows.forEach((show) => {
            const production = show.production[0];
            if (show.ticketStatus !== "Available") {
                return;
            }
            const tableRow = document.createElement("tr");
            const tableRow2 = document.createElement("tr");
            const startTimeCell = document.createElement("td");
            startTimeCell.innerText = moment(show.startDateTime).calendar();
            startTimeCell.classList.add("no-wrap", "start-time");
            const titleCell = document.createElement("td");
            titleCell.innerText = production.title;
            titleCell.classList.add("bright");
            const taglineCell = document.createElement("td");
            taglineCell.innerText = production.tagline;
            taglineCell.classList.add("tagline", "xsmall");
            taglineCell.colSpan = 2;
            tableRow.appendChild(startTimeCell);
            tableRow.appendChild(titleCell);
            tableRow2.appendChild(taglineCell);
            table.appendChild(tableRow);
            table.appendChild(tableRow2);
        });
        return table;
    }
});
