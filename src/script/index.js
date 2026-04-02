/*
    Cerne Website - Script file for the home page.

    Copyright (c) 2026 Cerne Project
    SPDX-License-Identifier: CC-BY-SA-4.0

    This file is part of the Cerne Project.
    See the LICENSE file in the root directory for further details.
*/
const get = (id) => document.getElementById(id),
      click = (id, url="") => get(id).addEventListener("click", () => {

        if(url.length > 0) {
            open(url);
        } else {
            window.location.href = id;
        }

    });

click("docs", "https://docs.cerne.space");
click("package_manager", "https://cerne.run");
click("github");
click("discord");

// generate stars
function generate_stars() {
    const stars = get("stars");
    for(let i = 0; i < 120; i++) {
        const star = document.createElement("div");
        const extra = Math.random() < 0.05 ? (Math.random()*30) : 0;
        star.classList.add("star");
        star.style.top = ((Math.random() * 100) + extra) + "%";
        star.style.left = Math.random() * 100 + "%";
        star.style.animationDuration = (Math.random() * 3 + 2) + "s";

        let size = Math.random() * 2 + 1 + "px";
        star.style.width = size;
        star.style.height = size;
        stars.appendChild(star);
    }
}

function generate_comet() {
    const   comet = document.createElement("div"),
            startX = Math.random() * 100,
            startY = -10,
            duration = Math.random() * 2 + 2;

    // comet element
    comet.classList.add("comet");
    // to get these values in CSS, set the CSS variables to startX and startY
    comet.style.setProperty('--start-x', `${startX}vw`);
    comet.style.setProperty('--start-y', `${startY}vh`);
    comet.style.animationDuration = `${duration}s`;

    get("stars").appendChild(comet);

    // add sparkles to the comet
    for(let i = 0; i < 5; i++) {
        const sparkle = document.createElement("div");
        const size = Math.random() * 3 + 1 + "px";
        sparkle.classList.add("sparkle");
        sparkle.style.top = startX + Math.random() * 20 + "px";
        sparkle.style.left = startY + Math.random() * 20 + "px";
        sparkle.style.width = size;
        sparkle.style.height = size;
        sparkle.style.animationDuration = (Math.random() * 1 + 0.5) + "s";

        get("stars").appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
    
    setTimeout(() => {
        comet.remove();
    }, duration * 1000);
}

const snippets = {
    "hello_world.ce": `import std.io

fun main() -> i32 {
    std::print("Hello, World!")
    return 0
}`,

    "basic_math.ce": `import std.io

fun main() -> i32 {
    std::print("2 + 3 = " + (2 + 3))
    return 0
}`
}

/**
 * Important to note that this is an EXTREMELY simplified version of an actual well implemented syntax highlighter
 * it's only meant for demo code snippets, nothing else
 * @param {string} code 
 */

function highlight_code(code) {
    code = code
        .replace(/->/g, "__ARROW__")
        .replace(/::/g, "__NS__");

    const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    let highlighted = escaped.replace(
        /("(?:\\.|[^"\\])*")|\b(import|fun|return|until|while|export)\b|\b(any|auto|u32|i32|f32|f64|bool|string|List|Map)\b|\b([0-9]+)\b|\b([A-Za-z_][A-Za-z0-9_]*)\b|([{}()\[\],;])/g,
        (match, stringToken, keywordToken, typeToken, numberToken, identifierToken, symbolToken, offset, full) => {
            if (stringToken) return `<span class="string">${stringToken}</span>`;
            if (keywordToken) return `<span class="keyword">${keywordToken}</span>`;
            if (typeToken) return `<span class="type">${typeToken}</span>`;
            if (numberToken) return `<span class="number">${numberToken}</span>`;

            if (identifierToken) {
                const next = full.slice(offset + match.length);
                if (/^\s*\(/.test(next)) {
                    return `<span class="function">${identifierToken}</span>`;
                }
                return `<span class="identifier">${identifierToken}</span>`;
            }

            if (symbolToken) return `<span class="symbol">${symbolToken}</span>`;
            return match;
        }
    );

    highlighted = highlighted
        .replace(/__ARROW__/g, `<span class="symbol">-&gt;</span>`)
        .replace(/__NS__/g, `<span class="symbol">::</span>`);

    return highlighted;
}

get("hello_world").addEventListener("click", (e) => {
    get("demo_code").innerHTML = `<code>${highlight_code(snippets["hello_world.ce"])}</code>`;
    e.target.classList.add("activated");
    get("hello_world").classList.remove("to_activate");
    get("basic_math").classList.remove("activated");
    get("basic_math").classList.add("to_activate");
});

get("basic_math").addEventListener("click", (e) => {
    get("demo_code").innerHTML = `<code>${highlight_code(snippets["basic_math.ce"])}</code>`;
    e.target.classList.add("activated");
    get("basic_math").classList.remove("to_activate");
    get("hello_world").classList.remove("activated");
    get("hello_world").classList.add("to_activate");
});

get("learn_more").addEventListener("click", (e) => {
    window.location.href = "#whatis";
});

window.onload = () => {
    generate_stars();

    // generate a comet every 2 seconds
    setInterval(() => {
        generate_comet();
    }, 2000);
}

export { get };