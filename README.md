# YoutubeCard
Youtube media card for Home Assistant Lovelace UI

## Requirements
You need to use [Youtube Media Player](https://github.com/albionah/YoutubeMediaPlayer) entity and of course, fulfill its requirements.

## Instalation
1) Download file youtube-card.js from the newest release.
2) Put this file into "www" directory in your home assistant config directory.
    1) In my case, in linux, full path is `/home/homeassistant/.homeassistant/www`
    2) In this directory call `wget https://github.com/albionah/YoutubeCard/releases/download/v0.0.2/youtube-card.js` (replace version for the newest one)
3) Inject youtube card into Home assistant. There are 2 ways:
    1) To your configuration.yaml, in your Home assistant config directory, add these lines.
        ```
        lovelace:
          resources:
            - url: /local/light-entity-card.js
              type: module
        ```
    2) Or, go to `config/lovelace dashboard/resources` in your Home assistant web site. You need to enable advanced mode to see `resources`. Add new resource with address `/local/light-entity-card.js`.
4) Go to dashboard and add new card. Now, you should see youtube card (if not, reload the page or add card manually). Click on it and use this config:
    ```
    type: custom:youtube-card
    entity_prefix: media_player.youtubemediaplayer
    youtube_controller_base_url: http://localhost:7790
    ```
