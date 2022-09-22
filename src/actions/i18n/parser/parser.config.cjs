"use strict";

const path = require("path");

const cwd = process.cwd();

module.exports = {
  defaultNamespace: "translation",
  // Default namespace used in your i18next config

  defaultValue: (locale, _namespace, key) => {
    if (locale === "zh") {
      return key;
    }

    return "__STRING_NOT_TRANSLATED__";
  },
  // Default value to give to empty keys
  // You may also specify a function accepting the locale, namespace, and key as arguments

  keepRemoved: true,
  // Keep keys from the catalog that are no longer in code

  keySeparator: false,
  // Key separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  // see below for more details

  locales: ["zh", "en"],
  // An array of the locales in your applications

  namespaceSeparator: false,
  // Namespace separator used in your translation keys
  // If you want to use plain english keys, separators such as `.` and `:` will conflict. You might want to set `keySeparator: false` and `namespaceSeparator: false`. That way, `t('Status: Loading...')` will not think that there are a namespace and three separator dots for instance.

  output: "client/static/locales/$LOCALE/$NAMESPACE.json",
  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()

  input: [
    `${cwd}/packages/**/src/**/*.{ts,tsx}`,
    `${cwd}/client/**/*.{ts,tsx}`,
    `${cwd}/!client/.next/**`,
    `${cwd}/!client/_static/**`,
    `${cwd}/!client/**/*.d.ts`,
  ],
  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file

  sort: false,
  // Whether or not to sort the catalog

  verbose: true,
  // Display info about the parsing including some stats
};
