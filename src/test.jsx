import { useState, useRef } from "react";

export default function SmartTextarea() {
  const [text, setText] = useState("");
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const textareaRef = useRef(null);

  const suggestions = [
    "React",
    "Node",
    "MongoDB",
    "Express",
    "JavaScript",
    "Python",
    "Django",
  ];

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);


   
    const lastWord = value.split(" ").pop();

    if (lastWord.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().startsWith(lastWord.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    const textarea = textareaRef.current;
    const cursorPos = textarea.selectionStart;

    const beforeCursor = text.slice(0, cursorPos);
    const afterCursor = text.slice(cursorPos);

    const words = beforeCursor.split(" ");
    words.pop();

    const newText =
      words.join(" ") +
      (words.length ? " " : "") +
      item +
      " " +
      afterCursor;

    setText(newText);
    setSelectedValues((prev) => [...prev, item]);
    setFilteredSuggestions([]);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        words.join(" ").length + item.length + 2;
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const cursorPos = textareaRef.current.selectionStart;
      const beforeCursor = text.slice(0, cursorPos);

      const words = beforeCursor.split(" ");
      const lastWord = words[words.length - 1];

      if (selectedValues.includes(lastWord)) {
        e.preventDefault();
        words.pop();
        const newText = words.join(" ") + " " + text.slice(cursorPos);
        setText(newText.trimStart());

        setSelectedValues((prev) =>
          prev.filter((val) => val !== lastWord)
        );
      }
    }
  };

  return (
    <div style={{ width: "400px", position: "relative" }}>
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        rows={4}
        style={{ width: "100%", padding: "10px" }}
        placeholder="Type here..."
      />

      {filteredSuggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            width: "100%",
            listStyle: "none",
            margin: 0,
            padding: 0,
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 10,
          }}
        >
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: "10px" }}>
        <strong>Selected Values Array:</strong>
        <pre>{JSON.stringify(selectedValues, null, 2)}</pre>
      </div>
    </div>
  );
}