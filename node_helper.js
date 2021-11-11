(()=>{"use strict";var e={763:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=r(435),i=r(886);t.default=async function(e,t,r="eyeEnglish"){const n=new o.GraphQLClient("https://www.eyefilm.nl/en/graphql"),s={startDateTime:["and",`> ${e}`,`< ${t}`],siteId:r},a=i.getSdk(n),{shows:u}=await a.shows(s);return u}},886:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getSdk=t.ShowsDocument=void 0;const i=o(r(875));t.ShowsDocument=i.default`
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
    `;const n=(e,t)=>e();t.getSdk=function(e,r=n){return{shows:(o,i)=>r((r=>e.request(t.ShowsDocument,o,{...i,...r})),"shows")}}},977:function(e,t,r){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(543),n=o(r(763));e.exports=i.create({start(){},socketNotificationReceived(e,t){"REFRESH_SHOWS"===e&&this.getShows(t.startDateTime,t.endDateTime,t.siteId)},async getShows(e,t,r="eyeEnglish"){try{const o=await n.default(e,t,r);this.sendSocketNotification("EYE_FILM_SHOWS",{id:this.name,shows:o,error:null})}catch(e){console.error(e),this.sendSocketNotification("EYE_FILM_ERROR",{id:this.name,shows:[],error:e.toString()})}}})},435:e=>{e.exports=require("graphql-request")},875:e=>{e.exports=require("graphql-tag")},543:e=>{e.exports=require("node_helper")}},t={},r=function r(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,r),n.exports}(977);module.exports=r})();