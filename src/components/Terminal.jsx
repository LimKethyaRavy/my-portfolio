import { useEffect, useRef, useState } from "react";
import { ME } from "../data/data";
import { COMMANDS, DIRS, FILES, TUX } from "../terminal";

const WELCOME = [
  "Portfolio terminal",
  "Type 'help' to see available commands.",
];

export default function Terminal({ go, toggleTheme, onClose }) {
  const [cwd, setCwd] = useState("~");
  const [value, setValue] = useState("");
  const [lines, setLines] = useState(WELCOME);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const input = useRef(null);
  const output = useRef(null);

  useEffect(() => {
    input.current?.focus();
  }, []);

  useEffect(() => {
    output.current?.scrollTo(0, output.current.scrollHeight);
  }, [lines]);

  function execute(raw) {
    const [command, ...args] = raw.trim().split(/\s+/);
    const arg = args.join(" ");

    switch (command.toLowerCase()) {
      case "help":
        return [`Available commands: ${COMMANDS.join(", ")}`];
      case "ls": {
        const target = args[0] || cwd;
        const dir = target === "~" || target === "./" ? "~" : target.replace(/^~\/|\/$/g, "");
        return DIRS[dir] ? [DIRS[dir].join("  ")] : [`ls: cannot access '${target}': no such directory`];
      }
      case "cd": {
        if (!arg || arg === "~" || arg === "/") {
          setCwd("~");
          return [];
        }
        if (arg === "..") {
          setCwd("~");
          return [];
        }
        const dir = arg.replace(/^~\/|\/$/g, "");
        if (Object.hasOwn(DIRS, dir) && dir !== "~") {
          setCwd(dir);
          return [];
        }
        return [`cd: ${arg}: no such directory`];
      }
      case "pwd":
        return [cwd === "~" ? "/home/visitor" : `/home/visitor/${cwd}`];
      case "cat": {
        if (!arg) return ["cat: missing file operand"];
        const file = arg.replace(/^\.\//, "").replace(/^~\//, "");
        const path = file.includes("/") || cwd === "~" ? file : `${cwd}/${file}`;
        return FILES[path] !== undefined ? FILES[path].split("\n") : [`cat: ${arg}: no such file`];
      }
      case "tree":
        return [
          ".",
          ...DIRS["~"].flatMap((entry) => {
            const dir = entry.replace(/\/$/, "");
            return DIRS[dir] ? [`|-- ${entry}`, ...DIRS[dir].map((file) => `|   |-- ${file}`)] : [`|-- ${entry}`];
          }),
        ];
      case "whoami":
        return ["visitor"];
      case "hostname":
        return ["portfolio"];
      case "uname":
        return ["Portfolio OS 1.0 browser x86_64"];
      case "date":
        return [new Date().toString()];
      case "echo":
        return [arg];
      case "clear":
        setLines([]);
        return [];
      case "history":
        return [...history, raw].map((entry, index) => `${index + 1}  ${entry}`);
      case "neofetch":
        return [
          ...TUX,
          `${ME.name} @ portfolio`,
          "---------------------",
          `Role: ${ME.roles[0]}`,
          "Shell: portfolio-terminal",
          `Projects: ${DIRS.projects.length}`,
        ];
      case "open": {
        const page = arg.toLowerCase().replace(/^\//, "");
        if (page === "home" || page === "") {
          go("home");
          return ["Opening home…"];
        }
        if (["about", "education", "experience", "projects", "skills", "contact"].includes(page)) {
          go(page);
          return [`Opening ${page}…`];
        }
        return [`open: ${arg}: unknown page`];
      }
      case "theme":
        toggleTheme();
        return ["Theme toggled."];
      case "fib": {
        const n = Number(args[0]);
        if (!Number.isInteger(n) || n < 0 || n > 100) return ["Usage: fib <integer from 0 to 100>"];
        let a = 0, b = 1;
        for (let i = 0; i < n; i++) [a, b] = [b, a + b];
        return [`fib(${n}) = ${a}`];
      }
      case "prime": {
        const n = Number(args[0]);
        if (!Number.isInteger(n) || n < 0) return ["Usage: prime <non-negative integer>"];
        const isPrime = n >= 2 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);
        return [`${n} ${isPrime ? "is" : "is not"} prime.`];
      }
      case "sudo":
        return ["Permission denied: this is a portfolio demo."];
      case "exit":
        onClose();
        return [];
      default:
        return [`${command}: command not found. Type 'help' for commands.`];
    }
  }

  function submit(e) {
    e.preventDefault();
    const raw = value.trim();
    if (!raw) return;
    setHistory((previous) => [...previous, raw]);
    setHistoryIndex(history.length + 1);
    const result = execute(raw);
    setLines((previous) => [...previous, `${cwd} $ ${raw}`, ...result]);
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const index = Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const index = Math.min(history.length, historyIndex + 1);
      setHistoryIndex(index);
      setValue(history[index] || "");
    }
  }

  return (
    <section className="term" aria-label="Portfolio terminal" onClick={() => input.current?.focus()}>
      <header className="lh">
        <span className="lt2">visitor@portfolio: {cwd}</span>
        <div className="lbtn">
          <button type="button" aria-label="Close terminal" onClick={onClose}>
            <i className="x">×</i>
          </button>
        </div>
      </header>
      <div className="tout" ref={output} aria-live="polite">
        {lines.map((line, index) => <div key={`${index}-${line}`}>{line}</div>)}
        <form className="lrow" onSubmit={submit}>
          <span className="pu">{cwd} $&nbsp;</span>
          <input
            ref={input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            spellCheck="false"
          />
        </form>
      </div>
    </section>
  );
}
