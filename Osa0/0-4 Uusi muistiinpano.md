```mermaid
sequenceDiagram;
    participant browser;
    participant server;

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note;
    activate server;
    server->>browser: Redirect to /exampleapp/notes;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes;
    activate server;
    server->>browser: HTML document;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css;
    activate server;
    server->>browser: CSS file;
    deactivate server;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js;
    activate server;
    server->>browser: JavaScript file;
    deactivate server;

    Note right of browser: The browser begins executing the JavaScript code and fetches the JSON from the server.;

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json;
    activate server;
    server->>browser: [{"content":"joopajoo","date":"2023-01-17T20:33:20.079Z"},...];
    deactivate server;

    Note right of browser: The browser begins calling the callback function to render the notes.;
```