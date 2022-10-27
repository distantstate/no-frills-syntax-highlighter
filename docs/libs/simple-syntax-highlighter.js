function select(selector) {
  return typeof selector === "string" ? document.querySelector(selector) : selector;
}

export function createSimpleSyntaxHighlighter(filters) {
  let fontWidth = 0;
  const span = document.createElement("span");
  span.style.position = "absolute";
  span.innerText = "X";

  return {
    calcFontWidth: ({ codeSelector = "code" } = {}) => {
      const code = select(codeSelector);

      code.appendChild(span);
      fontWidth = span.getBoundingClientRect().width;
      code.removeChild(span);
    },
    highlight: ({ codeSelector = "code", filterSelector } = {}) => {
      const code = select(codeSelector);
      const filterLayer = select(filterSelector);
      const codeHeight = code.getBoundingClientRect().height;
      const lines = code.innerText.split("\n");
      const lineHeight = codeHeight / (lines.length - 1);
      const generated = filters.reduce(
        (acc, { filter, regex }) => {
          return acc.lines.reduce(
            (acc, line, lineNum) => {
              acc.tags = [
                ...acc.tags,
                ...[...line.matchAll(regex)].map((match) => {
                  acc.lines[lineNum] = acc.lines[lineNum].replace(
                    match[0],
                    " ".repeat(match[0].length)
                  );
                  return {
                    x: match.index * fontWidth,
                    y: lineNum * lineHeight,
                    w: match[0].length * fontWidth,
                    filter,
                  };
                }),
              ];
              return acc;
            },
            { lines, tags: acc.tags }
          );
        },
        { lines, tags: [] }
      );
      filterLayer.innerHTML = generated.tags.reduce((acc, d) => {
        return `${acc}
        <div style="height: ${lineHeight - 1}px; width: ${d.w}px; top: ${
          d.y
        }px; left: ${d.x}px; position: absolute; -webkit-backdrop-filter:${
          d.filter
        }; backdrop-filter: ${d.filter};"></div>`;
      }, ``);
    },
  };
}
