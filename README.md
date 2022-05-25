# Dicefight

A semi-automated die rolling solution to quickly resolve fights in a Risk-influenced wargame. This was made for a Dutch event, so the texts are in Dutch.
See it in action at https://dice.ghostbird.nl

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## SignalR state synchronisation

Pair it with my [SignalR Share](https://github.com/ghostbird/signalr-share) service, and you can share the URI to someone else, and they'll be able to view your rolls.

Note that this is rather basic. Once you load a shared URI, you still see all the buttons and you can take control of the state. Only once a client receives incoming state, will it switch to read-only mode. Not suitable for adversarial situations, but practical if you want to show the results on a big screen, while controlling the UI on a tablet.
