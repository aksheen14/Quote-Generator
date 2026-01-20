const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const genQuoteBtn = document.getElementById("gen-quote");
const authorImage = document.getElementById("author-image");


const API_KEY = "1pXAljDOMJ8ozH2p96spbfwdAsT3OQ9vea9AcsiT";
const API_URL = "https://api.api-ninjas.com/v2/randomquotes";

async function generateQuote() {
    try{
        const response = await fetch("https://api.api-ninjas.com/v2/randomquotes", {
        headers: {
            "X-Api-Key": API_KEY
        }
    });
    const data = await response.json();
    quoteText.innerText = `"${data[0].quote}"`;
    quoteAuthor.innerText = `- ${data[0].author}`;
    fetchAuthorImage(data[0].author);
    }
    catch(error){
        quoteText.innerText = "An error occurred while fetching the quote.";
        quoteAuthor.innerText = "";
        authorImage.src = "";
        console.error("Error fetching quote:", error);
    }
}


async function fetchAuthorImage(author) {
    try {
        const formattedAuthor = author.replaceAll(" ", "_");
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formattedAuthor}`);
        const data = await response.json();
        if (data.thumbnail && data.thumbnail.source) {
            authorImage.src = data.thumbnail.source;
        } else {
            authorImage.src = "unknown-author.png";
        }
    } catch (error) {
        console.error("Error fetching author image:", error);
    }
}
genQuoteBtn.addEventListener("click", generateQuote);

generateQuote();

// Star animation

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    const starsContainer = document.getElementById("stars");
    starsContainer.appendChild(star);
    star.style.animationDuration = (Math.random() * 3 + 2) + "s";
    setTimeout(() => {
        star.remove();
    }, 5000);

}

setInterval(createStar, 10);
//shooting star animation

function createShootingStar() {
    const shootingstar = document.createElement("div");
    shootingstar.classList.add("shootingstar");
    shootingstar.style.left = Math.random() * 100 + "%";
    shootingstar.style.top = Math.random() * 100 + "%";
    const starsContainer = document.getElementById("stars");
    starsContainer.appendChild(shootingstar);
    const dx = Math.random() * 300 + 100; // 100–400px
    const dy = Math.random() * 300 + 100;
    shootingstar.style.setProperty("--dx", dx + "px");
    shootingstar.style.setProperty("--dy", dy + "px");
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);
    shootingstar.style.transform = `rotate(${angleDeg}deg)`;
    setTimeout(() => {
        shootingstar.remove();
    }, 1000);
}

function spawnShootingStar(){
    createShootingStar();
    setTimeout(spawnShootingStar, Math.random() * 3000 + 2000);
}
spawnShootingStar();










