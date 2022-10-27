import { createSimpleSyntaxHighlighter } from "../../src/simple-syntax-highlighter.js";
import javascriptFilters from "../sample-filters/javascript.filters.js";

const syntaxHighlighter = createSimpleSyntaxHighlighter(javascriptFilters);

async function loadSamples() {
  const root = document.querySelector(':root');

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color');
  const overlayColor = getComputedStyle(document.documentElement).getPropertyValue('--overlay-color');

  const textColorPicker = document.querySelector('#text-color-picker');
  const overlayColorPicker = document.querySelector('#overlay-color-picker');

  textColorPicker.value = textColor;
  overlayColorPicker.value = overlayColor;

  textColorPicker.addEventListener('input', (e) => {
    root.style.setProperty('--text-color', e.target.value);
  });

  overlayColorPicker.addEventListener('input', (e) => {
    root.style.setProperty('--overlay-color', e.target.value);
  });

  const [simpleSyntaxHighlighterFile, htmlFile, jsFile, cssFile] = await Promise.all([
    fetch('../../src/simple-syntax-highlighter.js'),
    fetch('index.html'),
    fetch('js/load-samples.js'),
    fetch('styles/style.css'),
  ]).then(responses => Promise.all(responses.map(res => res.text())));

  const simpleSyntaxHighlighterCode = document.querySelector('#source-example .syntax-highlighter-code');
  const usageCode = document.querySelector('#usage-example .syntax-highlighter-code');
  const cssCode = document.querySelector('#css-example .syntax-highlighter-code');

  simpleSyntaxHighlighterCode.innerText = simpleSyntaxHighlighterFile;
  usageCode.innerText = jsFile;
  cssCode.innerText = cssFile;

  syntaxHighlighter.calcFontWidth({ codeSelector: '#source-example .syntax-highlighter-code' });
  syntaxHighlighter.highlight({ codeSelector: '#source-example .syntax-highlighter-code', filterSelector: '#source-example .syntax-highlighter-filters' });
  syntaxHighlighter.highlight({ codeSelector: '#usage-example .syntax-highlighter-code', filterSelector: '#usage-example .syntax-highlighter-filters' });
  syntaxHighlighter.highlight({ codeSelector: '#css-example .syntax-highlighter-code', filterSelector: '#css-example .syntax-highlighter-filters' });
}

loadSamples();
