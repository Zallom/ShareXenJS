# ShareXenJS - Global

[![Zallom's Twitter](https://img.shields.io/badge/Zallom's-Twitter-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/ZallomDEV?ref_src=twsrc%5Etfw "@ZallomDEV - Twitter") 
[![Team Wyvern's Twitter](https://img.shields.io/badge/TeamWyvern's-Twitter-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/WyvernTeam?ref_src=twsrc%5Etfw "@WyvernTeam - Twitter") 
[![Team Wyvern's Discord](https://img.shields.io/badge/TeamWyvern's-Discord-7289DA?style=for-the-badge&logo=discord)](https://gg.discord.fr/Wyvern "WyvernTeam - Discord")
[![ShareXenJS's NPM](https://img.shields.io/badge/ShareXenJS-NPM-CB3837?style=for-the-badge&logo=npm)](https://www.npmjs.com/package/sharexenjs "sharexenjs - NPM")

[ShareXenJS](https://github.com/Zallom/ShareXenJS) is a powerful javascript package for [ShareXen](https://github.com/Xenthys/ShareXen), a ShareX Custom Uploader.

## **Features**

* [File uploads](https://github.com/Zallom/ShareXenJS#upload-a-file)
* [File deletion](https://github.com/Zallom/ShareXenJS#delete-a-file)
* [File renaming](https://github.com/Zallom/ShareXenJS#rename-a-file)
* [File infomations](https://github.com/Zallom/ShareXenJS#get-infomation-from-a-file)
* [Server informations](https://github.com/Zallom/ShareXenJS#obtain-global-information-from-the-server-used)

Please note that this package make easier the integration of [ShareXen](https://github.com/Xenthys/ShareXen) into a nodejs application (in a Discord bot for example). Features may be changed during updates.

## **Installation**

```bash
npm i sharexenjs
```

# ShareXenJS - Usage

Before using this module please have first a functional [ShareXen Server](https://github.com/Xenthys/ShareXen) plus a functional token.

## **Requiring the module and giving the necessary information:**

```javascript
// Requiring the module
const sharexen = require("sharexenjs");

// Give him the necessary information
sharexen.login(WAY, TOKEN);
```
* The WAY is a link to the ShareXen Server PHP file on your webserver.
* The TOKEN is the character sequence that allows you to authenticate yourself on the ShareXen Server.

## **Upload a File**

The function "upload" returns either an error or the response from the ShareXen Server.

#### **In case of classic response, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `api_version`  | String  | Current API version number (SemVer).                   |
| `endpoint`     | String  | Called API endpoint, in this case: "upload".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `filename`     | String  | Name of the file as stored on the server.              |
| `url`          | String  | URL for the new file.                                  |
| `deletion_url` | String  | Full deletion URL for the new file.                    |
| `key`          | String  | Security key for the new file.                         |
| `iterations`   | Integer | Attempts at generating a unique filename.              |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **In case of error, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `endpoint`     | String  | Called API endpoint, in this case: "upload".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `error`        | String  | Error message.                                         |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **JavaScript Example:**
```javascript
await sharexen.upload(FILE).then(res => {
    if (res.err === false) {
        console.log(`Filename: ${res.filename}\nURL: ${res.url}\nDeletion Url: ${res.deletion_url}\n`);
    } else {
        console.error(res.error);
    }
});
```
* The FILE is a link to a basic image or a local image URL.

## **Delete a File**

The function "delete" returns either an error or the response from the ShareXen Server.

#### **In case of classic response, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `api_version`  | String  | Current API version number (SemVer).                   |
| `endpoint`     | String  | Called API endpoint, in this case: "delete".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `filename`     | String  | Name of the file as stored on the server.              |
| `method`       | String  | Authentication method used to call the endpoint.       |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **In case of error, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `endpoint`     | String  | Called API endpoint, in this case: "delete".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `error`        | String  | Error message.                                         |
| `exists`       | boolean | File exist ?                                           |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **JavaScript Example:**
```javascript
await sharexen.delete(FILE).then(res => {
    if (res.err === false) {
        console.log(`Filename: ${res.filename}\nMethod: ${res.method}\n`);
    } else {
        console.error(res.error);
    }
});
```
* The FILE is a link to the image or the name of the image stored on the server.

## **Rename a File**

The function "rename" returns either an error or the response from the ShareXen Server.

#### **In case of classic response, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `api_version`  | String  | Current API version number (SemVer).                   |
| `endpoint`     | String  | Called API endpoint, in this case: "rename".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `old_name`     | String  | Previous name of the file.                             |
| `new_name`     | String  | Name of the file as stored on the server.              |
| `url`          | String  | URL for the new file.                                  |
| `deletion_url` | String  | Full deletion URL for the new file.                    |
| `key`          | String  | Security key for the new file.                         |
| `method`       | String  | Authentication method used to call the endpoint.       |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **In case of error, the response will contain:**
| Name           | Type    | Description                                            |
| -------------- | ------- | ------------------------------------------------------ |
| `err`          | boolean | Presence of error ?                                    |
| `endpoint`     | String  | Called API endpoint, in this case: "rename".           |
| `code`         | Integer | Mirror of the returned HTTP code.                      |
| `error`        | String  | Error message.                                         |
| `exists`       | boolean | File exist ?                                           |
| `time`         | Float   | Script execution time, in seconds.                     |

#### **JavaScript Example:**
```javascript
await sharexen.rename(FILE, NEW_FILE_NAME).then(res => {
    if (res.err === false) {
        console.log(`Old Filename: ${res.old_name}\nNew Filename: ${res.new_name}`);
    } else {
        console.error(res.error);
    }
});
```
* The FILE is a link to the image or the name of the image stored on the server.
* The NEW_FILE_NAME is the new name you want to give to FILE.

## **Get informations on a file**

The "info" function can return different things depending on the existence or not of the requested file (to retrieve information from a file).

#### **In case of an existing file, the response will contain:**
| Name           | Type    | Description                                                         |
| -------------- | ------- | ------------------------------------------------------------------- |
| `err`          | boolean | Presence of error ?                                                 |
| `api_version`  | String  | Current API version number (SemVer).                                |
| `endpoint`     | String  | Called API endpoint, in this case: "info".                          |
| `code`         | Integer | Mirror of the returned HTTP code.                                   |
| `is_admin`     | boolean | Admin status of the caller.                                         |
| `filename`     | String  | Name of the file as stored on the server.                           |
| `filesize`     | Integer | Size of the file in bytes.                                          |
| `url`          | String  | URL for the new file.                                               |
| `deletion_url` | String  | (User must be an administrator) Full deletion URL for the new file. |
| `key`          | String  | (User must be an administrator) Security key for the new file.      |
| `exists`       | boolean | File exist ?                                                        |
| `uploaded_time`| Integer | File upload timestamp.                                              |
| `time`         | Float   | Script execution time, in seconds.                                  |

#### **In case of a nonexisting file, the response will contain:**
| Name           | Type    | Description                                                         |
| -------------- | ------- | ------------------------------------------------------------------- |
| `err`          | boolean | Presence of error ?                                                 |
| `api_version`  | String  | Current API version number (SemVer).                                |
| `endpoint`     | String  | Called API endpoint, in this case: "info".                          |
| `code`         | Integer | Mirror of the returned HTTP code.                                   |
| `is_admin`     | boolean | Admin status of the caller.                                         |
| `exists`       | boolean | File exist ?                                                        |
| `time`         | Float   | Script execution time, in seconds.                                  |

#### **In case of error, the response will contain:**
| Name           | Type    | Description                                                         |
| -------------- | ------- | ------------------------------------------------------------------- |
| `err`          | boolean | Presence of error ?                                                 |
| `api_version`  | String  | Current API version number (SemVer).                                |
| `endpoint`     | String  | Called API endpoint, in this case: "info".                          |
| `code`         | Integer | Mirror of the returned HTTP code.                                   |
| `error`        | String  | Error message.                                                      |
| `time`         | Float   | Script execution time, in seconds.                                  |

#### **JavaScript Example:**
```javascript
await sharexen.info(FILE).then(res => {
    if (res.exists === true) {
        console.log(res.filename);
    } else {
        console.log(res.exists);
    }
});
```
* The FILE is a link to the image or the name of the image stored on the server.

## **Obtain global information from the server used**

The "info" function can return different things depending on the administration status of the user (to retrieve information from the server used).

| Name                 | Type             | Description                                                                                    |
| -------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `err`                | boolean          | Presence of error ?                                                                            |
| `api_version`        | String           | Current API version number (SemVer).                                                           |
| `endpoint`           | String           | Called API endpoint, in this case: "info".                                                     |
| `code`               | Integer          | Mirror of the returned HTTP code.                                                              |
| `is_admin`           | boolean          | Admin status of the caller.                                                                    |
| `endpoints`          | Array of Strings | List of supported API endpoints.                                                               |
| `keyspace`           | String           | Keyspace used by the API.                                                                      |
| `name_length`        | Integer          | Size of random names.                                                                          |
| `allowed_extensions` | Array of Strings | List of allowed file extensions.                                                               |
| `allowed_characters` | String           | Additional allowed characters, for custom filenames.                                           |
| `custom_names`       | boolean          | Whether custom filenames are globally allowed or not.                                          |
| `files_count`        | Integer          | Amount of files (matching allowed extensions) in the current folder.                           |
| `files`              | Array of Strings | (User must be an administrator)  of files (matching allowed extensions) in the current folder. |
| `time`               | Float            | Script execution time, in seconds.                                                             |

#### **In case of error, the response will contain:**
| Name           | Type    | Description                                                         |
| -------------- | ------- | ------------------------------------------------------------------- |
| `err`          | boolean | Presence of error ?                                                 |
| `api_version`  | String  | Current API version number (SemVer).                                |
| `endpoint`     | String  | Called API endpoint, in this case: "info".                          |
| `code`         | Integer | Mirror of the returned HTTP code.                                   |
| `error`        | String  | Error message.                                                      |
| `time`         | Float   | Script execution time, in seconds.                                  |

#### **JavaScript Example:**
```javascript
await sharexen.info(FILE).then(res => {
    if (res.err === false) {
        console.log(`I found ${res.files_count} files !`);
    } else {
        console.error(res.error);
    }
});
```
