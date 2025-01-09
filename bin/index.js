#!/usr/bin/env node
import displayVariables from "./utils/displayVariables.js";
import readVariables from "./utils/readVariables.js";

const args = process.argv.slice(2);
const varIndex = args.indexOf('--var');
const varName = varIndex !== -1 ? args[varIndex + 1] : null;

const envVars = readVariables();
displayVariables(envVars, varName);