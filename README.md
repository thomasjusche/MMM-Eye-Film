# MMM-Eye-Film

Magic mirror module to see which movies are playing in the [Eye Film Museum](https://www.eyefilm.nl/).

This plugin uses the GraphQL API the website uses too, no API keys are required.

![Picture of the plugin showing todays movies](img/eye-film.png)

## Installation

Clone this repository in the modules folder and install the dependencies

```bash
cd ~/MagicMirror/Modules # Change this if you installed MagicMirror another folder
git clone https://github.com/thomasjusche/MMM-Eye-Film.git
cd MMM-Eye-Film
npm install
```

## config options

| Name              | Description                                        | Default          |
| ----------------- | -------------------------------------------------- | ---------------- |
| `refreshInterval` | Interval in ms in which the plugin should refresh  | Every 10 minutes |
| `maxEntries`      | Max number of movies to show at once               | 20               |
| `getStartTime`    | Callback that returns the start time as ISO string | Now              |
| `getEndTime`      | Callback that returns the end time to show         | Today end of day |

## Example config

```js
{
  module: 'MMM-Eye-Film',
  position: 'top_left',
  config: {
    maxEntries: 30,
    getStartTime: () => moment('16:00', 'HH:mm').toISOString(),
  }
}
```

This will show 30 movies which start at 16:00 or later today.

## Credits

Used the `webpack.config.js` from [MMM-awesome-alexa](https://github.com/dolanmiu/MMM-awesome-alexa)
