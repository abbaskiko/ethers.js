'use strict';

import path from 'path';

import zlib from "browserify-zlib";

import { randomBytes, randomHexString, randomNumber } from "./random";
export { randomBytes, randomHexString, randomNumber };

import * as _data from "./browser-fs.json";

// TypeScript, rollup and friends don't play nice with this JSON
const _anyData: any = <any>_data;
const data = _anyData["default"] ? _anyData["default"]: _anyData;

const Cache: { [ filename: string ]: any } = { };
export function loadTests(tag: string): any {
    let filename = 'testcases/' + tag + ".json.gz";
    if (Cache[filename] == null) {
        console.log("loading:", filename);
        Cache[filename] = JSON.parse(zlib.gunzipSync(new Buffer((<any>data)[filename], "base64")).toString());
    }
    return Cache[filename];
}

export function loadData(filename: string): Buffer {
    // Strip any leading relative paths (e.g. "./foo" => "foo")
    filename = path.join(filename);
    console.log("loading:", filename);
    return new Buffer((<any>data)[filename], "base64");
}
