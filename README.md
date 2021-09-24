# npm-license-check

## Installation

Install globally:

`npm install -g @js-soft/license-check`

Install as dev-dependency:

`npm install --save-dev @js-soft/license-check`

## Usage

Run `npx license-check` (when installed as dev-dependency) or `license-check` (when installed globally)

## Options

```
      --version         Show version number                            [boolean]
  -o, --outFile         Where to write the file.
                                        [string] [default: "./license-out.json"]
  -f, --file            write a file                  [boolean] [default: false]
      --include-dev     Include dev-devpendencies in license-check.
                                                      [boolean] [default: false]
      --ignorePackages  Ignores the license information of given packages
                                                           [array] [default: []]
      --ignoreLicenses  Ignores the given licenses         [array] [default: []]
      --ignoreRegex     Ignore packages that match the given regex.     [string]
      --help            Show help                                      [boolean]
```
