const randomWord = document.getElementById("random-word");
new ClipboardJS(".copy-button");

document.querySelectorAll("div.code").forEach((block) => {
  hljs.highlightBlock(block);
  appendCopyBlock(block);
});

window.onload = setRandomWord;

randomWord.addEventListener("click", () => {
  setRandomWord();
});

async function getRandomWord() {
  let data = await fetch(
    "https://random-words-api.vercel.app/word"
  ).then((res) => res.json());

  let word = data[0].word;
  let def = data[0].definition;
  return { word, def };
}

async function setRandomWord() {
  getRandomWord().then(({ word, def }) => {
    randomWord.innerHTML = `<h2>${word}</h2><h3>Definition: <i>${def}</i></h3>`;
  });
}

function createCopyButtonElement(block) {
  let copyButton = document.createElement("button");
  copyButton.innerText = "📥 Copy code";
  copyButton.className = "copy-button";
  copyButton.setAttribute("data-clipboard-text", block.innerText);

  setStyles(copyButton, {
    padding: "5px",
    background: "#282c34",
    border: "lightgreen solid 2px",
    borderRadius: "4px",
    fontSize: "large",
    marginTop: "5px",
    marginBottom: "5px",
    fontFamily: "monospace",
    color: "white",
    cursor: "pointer",
    outline: "none",
  });

  copyButton.onclick = () => {
    copyButton.innerText = "✔️ Copied!";
    setTimeout(() => {
      copyButton.innerText = "📥 Copy code";
    }, 3000);
  };

  return copyButton;
}

function appendCopyBlock(block) {
  let copyBlock = document.createElement("div");
  let copyButton = createCopyButtonElement(block);
  copyBlock.style.position = "relative";
  copyBlock.appendChild(copyButton);
  block.appendChild(copyBlock);
}

function setStyles(element, styles) {
  for (const style of Object.keys(styles)) {
    element.style[style] = styles[style];
  }
}
