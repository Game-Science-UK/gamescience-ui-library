## Context focus — shared display

Prefer the shared-display lobby as the first vertical slice:

room code → participant count → waiting → ready

Use `@gamescience/shared-display-lobby` and `@gamescience/shared-display-shell` where appropriate.
Preserve existing application state and handlers; map them into pattern props.
Enforce the shared-display privacy contract: public room-safe data only, no
participant-private information, no operational controls required on the display.
