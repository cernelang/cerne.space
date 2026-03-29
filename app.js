/*
    Cerne Website - Main entry point for the Cerne website server.

    Copyright (c) 2026 Cerne Project
    SPDX-License-Identifier: CC-BY-SA-4.0

    This file is part of the Cerne Project.
    See the LICENSE file in the root directory for further details.
*/
const app = require("express")(), 
    fs = require("fs"), 
    path = require("path");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src/pages/index.html"));
});

// links
app.get("/github", (req, res) => {
    res.redirect("https://github.com/cernelang/cerne");
})

app.get("/discord", (req, res) => {
    res.redirect("https://discord.gg/psYzcQ3AtE");
})

// not found or file
app.get(/.*/, (req, res) => {
    try {
        if(fs.existsSync(path.join(__dirname, `src/${req.path}`))) {
            res.sendFile(path.join(__dirname, `src/${req.path}`));
        } else {
            res.status(404).sendFile(__dirname + "/src/pages/notfound.html");
        }
    } catch(e) {
        res.status(404).sendFile(__dirname + "/src/pages/notfound.html");
    }
});

app.listen(3000, () => {
    console.log("\x1b[38;5;82;1m[INFO]\x1b[38;5;255m: Server is running on port 3000\x1b[0m ");
});