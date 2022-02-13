![logo](https://user-images.githubusercontent.com/16198896/129204519-78bb6448-246e-4e6d-a456-182792c7b894.png)

# `map-my-shifter`

> STIX-Shifter Connector's Mapping Builder

The map-my-shifter (MMS) project provides a visual editor for building mappings for [STIX-Shifter](https://github.com/opencybersecurityalliance/stix-shifter) modules.
A typical (module) connector requires two types of field mappings:

- **From STIX** pattern mapping - When building the data source query from a STIX query, the STIX fields, for example `file:name`, is mapped to the target data source's field. [Read more...](https://github.com/opencybersecurityalliance/stix-shifter/blob/master/adapter-guide/develop-translation-module.md#step-2-edit-the-from_stix_map-json-files)
- **To STIX** object mapping - When a results object is back from the data source, this object gets translated in the final result as a STIX object. For example `{"filename": "xxxxx"}` should be translated to a STIX object of type `file`. [Read more...](https://github.com/opencybersecurityalliance/stix-shifter/blob/master/adapter-guide/develop-translation-module.md#step-4-edit-the-to_stix_map-json-file)

### Use-cases

- If you just want to use the editor - you can use the [online version](https://ibm.github.io/map-my-shifter/) to:
  - Create a new mapping file from scratch, for a new stix shifter module.
  - Load an existing mapping file, edit the file and save it to a new file.
- You can embed this editor as a react component in your own react carbon app

### Demo

https://ibm.github.io/map-my-shifter/

### Development

MMS is a static client side app, there is no backend involved, except from serving the static content. It is built with the [ReactJS](https://reactjs.org) library, and designed using [Carbon Design System](https://www.carbondesignsystem.com) components.

### Installation

- run `npm install map-my-shifter`
- import modules: `import {FromStix, ToStix} from 'map-my-shifter';`

### Usage

1. map-my-shifter component: a react component that displays the STIX mappings
   - `<FromStix.Mapping/>`
   - `<ToStix.Mapping/>`
   - you can add a property `StixVersion` with the value `V_2_0` or `V_2_1`, defult is V_2_0.
   - for example: `<FromStix.Mapping StixVersion='V_2_1'/>`

##

2. map-my-shifter import function: gets a javaScript object and adds the content to the mapping
   - `FromStix.Import(JSON.parse({"ipv4-addr": {"fields": {"value": ["sourceip"]}}}))`
   - `ToStix.Import(JSON.parse({"ipv4-addr": {"fields": {"value": ["sourceip"]}}}))`

##

3. map-my-shifter export function: gets a string and opens a window to save the mapping to a file.
   - `FromStix.Export('fileName')`
   - `ToStix.Export('fileName')`

### Authors

- [Bar Haim](https://github.com/barvhaim)
- [Ido Hersko](https://github.com/idohersko)
- [Noaa Kless](https://github.com/noaakl)

### Licensing

map-my-shifter is licensed under the Apache License, Version 2.0. See [LICENSE](https://github.com/IBM/map-my-shifter/blob/master/LICENCE) for the full license text.

Built with ❤️ from
[IBM Cyber Security Center of Excellence (CCoE)](https://www.research.ibm.com/haifa/ccoe/)
