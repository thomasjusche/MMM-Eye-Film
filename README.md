# MMM Eye Film

Magic mirror module to see which movies are playing in the [Eye Film Museum](https://www.eyefilm.nl/).

This plugin uses the GraphQL APi the website uses too, no additional APi keys are required.

![Picture of the plugin showing todays movies](img/eye-film.png)

## config options

| Name            | Description                                       | default          |
| --------------- | ------------------------------------------------- | ---------------- |
| refreshInterval | interval in ms in which the plugin should refresh | every 10 minutes |
| maxEntries      | Max number of movies to show at once              | 20               |
| getStartTime    | Callback                                          |
