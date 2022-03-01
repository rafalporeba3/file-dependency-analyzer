# File dependency analyzer

Maintaining a project is not easy, especially large ones.
To help, this tool is used to detect and optionally cleanup not dependent files.

You can analyze and cleanup any files you want (`svg, js, etc`). Just provide configuration and you are ready to go.
Tool is fully customizable, you can specify folders you want to analyze files in, or exclude folders from analyzing.

## Installation

---


```
 npm install -D file-dependency-analyzer
```

## Usage

---

To run a script you need `npx` (npm is not currently supported)

```
// package.json

"scripts": {
  "analyze": npx file-dependency-analyzer ./path-to-config-file.json
}

```

## Config

Default ignore patterns (analyzing will be excluded in below folders)
```
[
    'node_modules',
    'git',
    'vscode',
    'idea',
    'package.json',
    'package-lock.json',
    'README.md',
    'dist',
]
```

You can add specific `globalIgnorePatterns` in config

---

| Property             | Type    | Default |                        Description                        |
|----------------------|:--------|:------|:---------------------------------------------------------:|
| `globalIgnorePatterns` | `Array` | `[]`  | List of all folders/paths you want exclude from analyzing |
| `extensions`           | `Object` | `{}`  |      Object of extensions with specific configuration     |


### Extensions
Is a key value object with specific configuration

---


| Property         | Type     | Default   |                          Description                          |
|------------------|:---------|:----------|:-------------------------------------------------------------:|
| `analyzeFrom`    | `Array`  | `[]`      | List of folders where files to analyze are located |
| `analyzeIn`      | `Array`  | `[]`      |           List of folders you want to analyze files           |
| `ignorePatterns` | `Array`  | `[]`      |          List of folders you exclude from analyzing           |
| `mode`           | `String` | `analyze` |   `analyze` or `cleanup` (analyze and remove unused files)    |
| `analyzeComments` | `Boolean` | `true`  |               Analyzing commented dependencies                |

If `analyzeFrom`, `analyzeIn` are empty or not defined, files will be analyzed for all project files.

Config example

---

```
{
  "globalIgnorePatterns": [".docker-cache"],
  "extensions": {
    "svg": {
      "analyzeFrom": [], <- it will search for all svg files throughout the project
      "analyzeIn": ["/components"],
      "ignorePatterns": ["/configs"],
      "mode": "cleanup",
      "analyzeComments": true
    },
    "js": {
      "analyzeFrom": ["/configs", "/assets"],
      "analyzeIn": [], <- files will be analyzed throughout the project
      "ignorePatterns": [],
      "mode": "analyze",
      "analyzeComments": false
    }
  }
}

```

## License

---
Copyright (c) 2022 Rafal Poreba. Licensed under the MIT license.
