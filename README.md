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

---

## LICENSE

### The MIT License (MIT)

Copyright © 2021 Thomas Jüsche

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

**The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.**
