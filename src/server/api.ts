import { GraphQLClient } from "graphql-request";
import { getSdk, Show_Show_Entry, ShowsQueryVariables } from "./graphql";

async function getShows(
  startDateTime: string,
  endDateTime: string,
  siteId = "eyeEnglish"
) {
  const client = new GraphQLClient("https://www.eyefilm.nl/en/graphql");
  const variables: ShowsQueryVariables = {
    startDateTime: ["and", `> ${startDateTime}`, `< ${endDateTime}`],
    siteId
  };
  const sdk = getSdk(client);
  const { shows } = await sdk.shows(variables);

  return shows as Show_Show_Entry[];
}

export default getShows;
