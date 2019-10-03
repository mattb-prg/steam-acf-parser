A Javascript parser for Steam app manifest files(.acf). You can find them in your steam library under the `steamapps` directory. They look something like this:

```
"AppState"
{
	"appid"		"47410"
	"Universe"		"1"
	"name"		"Stronghold Kingdoms"
	"StateFlags"		"4"
	"installdir"		"Stronghold Kingdoms"
	"LastUpdated"		"1543992348"
	"UpdateResult"		"0"
	"SizeOnDisk"		"50333184"
	"buildid"		"3354190"
	"LastOwner"		"12345"
	"BytesToDownload"		"0"
	"BytesDownloaded"		"0"
	"AutoUpdateBehavior"		"0"
	"AllowOtherDownloadsWhileRunning"		"0"
	"ScheduledAutoUpdate"		"0"
	"UserConfig"
	{
		"language"		"english"
	}
	"InstalledDepots"
	{
		"47411"
		{
			"manifest"		"6777399203159127119"
		}
	}
	"MountedDepots"
	{
		"47411"		"6777399203159127119"
	}
}
```

# Using the Parser

```javascript
const parse = require('module')
const fs = require('fs')

// file contents are as above
const file = fs.readFileSync('./appmanifest_id.acf', 'utf8')
console.log(parse(file))

```

outputs this:

```json
{
    "AppState": {
        "appid": "47410",
        "Universe": "1",
        "name": "Stronghold Kingdoms",
        "StateFlags": "4",
        "installdir": "Stronghold Kingdoms",
        "LastUpdated": "1543992348",
        "UpdateResult": "0",
        "SizeOnDisk": "50333184",
        "buildid": "3354190",
        "LastOwner": "12345",
        "BytesToDownload": "0",
        "BytesDownloaded": "0",
        "AutoUpdateBehavior": "0",
        "AllowOtherDownloadsWhileRunning": "0",
        "ScheduledAutoUpdate": "0",
        "UserConfig": {
            "language": "english"
        },
        "InstalledDepots": {
            "47411": {
                "manifest": "6777399203159127119"
            }
        },
        "MountedDepots": {
            "47411": "6777399203159127119"
        }
    }
}
```

Parser made with [Nearley](https://github.com/kach/nearley)