# File dependency analyzer

Maintaining a project is not easy, especially large ones.
To help, this tool is used to detect and optionally cleanup not dependent files.

You can analyze and cleanup any files you want (`svg, js, etc`). Just provide configuration and you are ready to go.
Tool is fully customizable, you can specify folders you want to analyze files in, or exclude folders from analyzing.

## Installation

```
 npm install -D file-dependency-analyzer
```

## Usage
To run a script you need `npx` (npm is not currently supported)

```
// package.json

"scripts": {
  "analyze": npx file-dependency-analyzer ./path-to-config-file.json
}

```

## Config
| Property             | Type    | Default |                        Description                        |
|----------------------|:--------|:------|:---------------------------------------------------------:|
| `globalIgnorePatterns` | `Array` | `[]`  | List of all folders/paths you want exclude from analyzing |
| `extensions`           | `Object` | `{}`  |      Object of extensions with specific configuration     |


### Extensions
Is a key value object with specific configuration

| Property         | Type     | Default   |                       Description                        |
|------------------|:---------|:----------|:--------------------------------------------------------:|
| `analyzeFrom`    | `Array`  | `[]`      |    List of folders where files to analyze are located    |
| `analyzeIn`      | `Array`  | `[]`      |        List of folders you want to analyze files         |
| `ignorePatterns` | `Array`  | `[]`      |        List of folders you exclude from analyzing        |
| `mode`           | `String` | `analyze` | `analyze` or `cleanup` (analyze and remove unused files) |
| `analyzeComments` | `Boolean` | `true`  |             Analyzing commented dependencies             |


Config example

```
{
  "globalIgnorePatterns": [],
  "extensions": {
    "svg": {
      "analyzeFrom": [],
      "analyzeIn": [],
      "ignorePatterns": [],
      "mode": "cleanup",
      "analyzeComments": true
    }
  }
}

```
