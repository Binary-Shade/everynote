export const darkEditorCss = `
  * {
    background-color: #0d0d0d;
    color: white;
    font-family: 'Playfair Display', sans-serif;
  }

  em, i {
    font-family: 'Playfair Display', sans-serif;
    font-style: italic;
  }

  blockquote {
    border-left: 3px solid #babaca;
    padding-left: 1rem;
  }

  .highlight-background {
    background-color: #fff;
  }

  .ProseMirror:empty:before {
    content: "What's on your mind today?";
    color: #fff;
    font-style: italic;
    font-family: 'Playfair Display', serif;
    pointer-events: none;
  }
  .tiptap p.is-editor-empty:first-child::before {
    color: #808080;
    content: "What's on your mind today?";
    float: left;
    height: 0;
    pointer-events: none;
  }
`;
