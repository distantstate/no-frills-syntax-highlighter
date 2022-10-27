export default [
  {
    regex:  new RegExp(/^\s*\/\/.*/, 'g'),
    filter: 'grayscale(1) brightness(0.6)'
  },
  {
    regex: new RegExp(`\\.\\.\\.|".*"|'.*'`, "g"),
    filter: "hue-rotate(73deg) brightness(4)",
  },
  {
    regex:  new RegExp(/\w+:/, 'g'),
    filter: 'hue-rotate(266deg) brightness(200%)'
  },
  {
    regex:  new RegExp(/\.\w+/, 'g'),
    filter: 'hue-rotate(266deg) brightness(1.6)'
  },
  {
    regex: new RegExp("import|export", "g"),
    filter: "hue-rotate(90deg) brightness(1.6)",
  },
  {
    regex: new RegExp("const|let|var|return|new|if|for|=>|\[|\|=]", "g"),
    filter: "hue-rotate(115deg) brightness(1.6)",
  },
]
