# MMM Eye Film

Magic mirror module to see which movies are playing in the [Eye Film Museum](https://www.eyefilm.nl/).

This plugin uses the GraphQL API the website uses too, no additional API keys are required.

![Picture of the plugin showing todays movies](img/eye-film.png)

## config options

| Name            | Description                                        | default          |
| --------------- | -------------------------------------------------- | ---------------- |
| refreshInterval | interval in ms in which the plugin should refresh  | every 10 minutes |
| maxEntries      | Max number of movies to show at once               | 20               |
| getStartTime    | Callback that returns the start time as ISO string | now              |
| getEndTime      | Callback that returns the end time to show         | today end of day |
