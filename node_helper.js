(()=>{"use strict";var e={763:(e,t,i)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=i(435),r=i(886);t.default=async function(e,t,i="eyeEnglish"){const n=new o.GraphQLClient("https://www.eyefilm.nl/en/graphql"),s={startDateTime:["and",`> ${e}`,`< ${t}`],siteId:i},a=r.getSdk(n),{shows:u}=await a.shows(s);return u}},886:function(e,t,i){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getSdk=t.ShowsDocument=void 0;const r=o(i(875));t.ShowsDocument=r.default`
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
    `;const n=(e,t)=>e();t.getSdk=function(e,i=n){return{shows:(o,r)=>i((i=>e.request(t.ShowsDocument,o,{...r,...i})),"shows")}}},977:function(e,t,i){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(543),n=o(i(763)),s=i(655);e.exports=r.create({start(){},socketNotificationReceived(e,t){e===s.EyeFilmNotifications.REFRESH_SHOWS&&this.getShows(t.startDateTime,t.endDateTime,t.siteId)},async getShows(e,t,i="eyeEnglish"){try{const o=await n.default(e,t,i);this.sendSocketNotification(s.EyeFilmNotifications.EYE_FILM_SHOWS,{id:this.name,shows:o,error:null})}catch(e){console.error(e),this.sendSocketNotification(s.EyeFilmNotifications.EYE_FILM_ERROR,{id:this.name,shows:[],error:e.toString()})}}})},655:(e,t)=>{var i;Object.defineProperty(t,"__esModule",{value:!0}),t.EyeFilmNotifications=void 0,(i=t.EyeFilmNotifications||(t.EyeFilmNotifications={})).REFRESH_SHOWS="REFRESH_SHOWS",i.EYE_FILM_SHOWS="EYE_FILM_SHOWS",i.EYE_FILM_ERROR="EYE_FILM_ERROR"},435:e=>{e.exports=require("graphql-request")},875:e=>{e.exports=require("graphql-tag")},543:e=>{e.exports=require("node_helper")}},t={},i=function i(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,i),n.exports}(977);module.exports=i})();