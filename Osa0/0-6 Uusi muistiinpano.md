```mermaid
sequenceDiagram;
    participant browser;
    participant server;

    Note right of browser: The browser disables default action for the button.;
    Note right of browser: The browser adds the new note to the list of notes.;
    Note right of browser: The browser rerenders the notes.;
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa;
    activate server;
    server->>browser: STATUS 201;
    deactivate server;
```