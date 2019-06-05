# Discord-Bot
[![ForTheBadge uses-js](https://img.shields.io/badge/nodejs-discordjs-yellowgreen.svg)](https://shields.io) [![PyPI status](https://img.shields.io/pypi/status/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/) [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/Naereen/ama) [![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/Naereen/)

This hobbie project is still a Work In Progress and is not a finished product.

Commands
----------------------------

| Cmd           | Description           | 
| ------------- |:-------------:|
| help      | show all commands |
| ban      | ban member      |  
| play | play Youtube music/ if music currently playing, add song in queue      |
| stop      | stop music      | 
| skip      | skip song      | 
| pause      | pause song      | 
| purge      | ban member      | 
| DailyHoroscope      | get the daily horoscope using horoscope web API      | 
| weather      | get the weather status with city/zip code (available in Finland only, if you want to change to worldwide or specific country, edit the url)      | 
| fortune      | get fortune cookie quotes      |

#### Upcoming plans:

###### music

* `play.` 
 - update with automatically play preset playlist in Youtube
 - search song in youtube by given name [ at the moment only URL ]
 

###### timezone

* `timezone.` Live-update  **clocks** in channel, nice to multinational members
* `set.` set **clocks** in specific member

###### clean

* `autoclean.`
- update for **purge**, bot auto wipe all message in a certain time in channel


Events
----------------------------
- guildMemberAdd
- guildMemberRemove
- ready

### Server Discord:  https://discord.gg/4PJvzeM :relaxed: feel free to experience
:heavy_exclamation_mark: Moo assistant - The bot running through Repl, at the moment Repl has not supported FFmpeg package yet, kindly run node index.js on computer to use Music functions


:heavy_exclamation_mark: Bot run Heroku: music commands available, move tokens to the Config Vars instead config.json
