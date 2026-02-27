/*
    Cerne Website - Script file for the home page.

    Copyright (c) 2026 Cerne Project
    SPDX-License-Identifier: CC-BY-SA-4.0

    This file is part of the Cerne Project.
    See the LICENSE file in the root directory for further details.
*/
const get = (id) => document.getElementById(id),
      click = (id) => get(id).addEventListener("click", () => window.location.href = id);

click("docs");
click("github");
click("discord");

// generate stars
function generate_stars() {
    const stars = get("stars");
    for(let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.top = Math.random() * 100 + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = (Math.random() * 3 + 2) + "s";

        let size = Math.random() * 2 + 1 + "px";
        star.style.width = size;
        star.style.height = size;
        stars.appendChild(star);
    }
}

window.onload = () => {
    generate_stars();
}

export { get };