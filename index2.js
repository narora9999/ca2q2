const fs = require("fs");
const async = require("async");
const path = require("path");

module.exports = function(directory, destination) {

  return new Promise((resolve, reject) => {

    fs.readdir(directory, (err, files) => {
        if (err)
            return reject(err);

        files = files.map(file => path.join(directory,file));

        async.map(files, fs.readFile, (err, results) => {
            if (err)
                return reject(err);

            fs.writeFile(destination, results.join("\n"), (err) => {
                if (err)
                    return reject(err);

                resolve();
            }); }); }); }); }
