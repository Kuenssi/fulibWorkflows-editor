# fulibWorkflows-editor
## Web-Editor for fulibWorkflows

### Editor features
- Write workflows descriptions in fulibWorkflows yaml syntax (via Codemirror)

- The yaml description gets send to the backend, where it is processed by fulibWorkflows

### Special displays
The `page` and the `data` events are processed differently. From those mockups and diagrams are created and displayed in the editor.
#### Page
- Html mockups are styled via bootstrap and are automatically displayed in the editor
- Fxml Files also get created having the same content as the html mockups. Those do net get displayed but can be downloaded

#### Data
`Data` events are processed as objects and get displayed as objectdiagrams. The more `data` events exist, the bigger the later objectDiagrams get.

From all `data` events one classdiagram gets created.

------------------
#### Editor available at
https://workflows-editor-frontend.herokuapp.com/

------------------
#### Local Development
Frontend(Angular):
Run the `npm run start:dev` command in the frontend directory.

Backend(Spring Boot):
Run BackendApplication.main

For use in Intellij -> There exists a `LaunchApplication` Run configuration which can be used to launch Frontend and Backend.

------------------
### fulibWorkflows
For more information about the fulibWorkflows yaml syntax check out the documentation on [fulibWorkflows](https://github.com/fujaba/fulibWorkflows#usage)
