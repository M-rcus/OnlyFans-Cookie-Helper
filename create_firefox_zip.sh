#!/bin/bash
version="$(jq -r .version ./manifest_v2.json)";
filename="../OnlyFans-Cookie-Helper_v${version}.zip";
rm "${filename}";
zip -x '*.git*' -x '*.sh' -r "${filename}" *;
zip -d "${filename}" "manifest.json";
printf "@ manifest_v2.json\n@=manifest.json\n" | zipnote -w "${filename}";