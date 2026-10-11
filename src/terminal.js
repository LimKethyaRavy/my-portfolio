// The "disk" behind the Linux terminal, generated from your data.
import { ME, EDU, EXP, PROJECTS, SKILLS } from "./data/data";
import { slug } from "./lib";

export const DIRS = {
  "~": [
    "about.txt",
    "contact.txt",
    "README.md",
    "education/",
    "experience/",
    "projects/",
    "skills/",
  ],
  education: EDU.map((e) => slug(e.t) + ".txt"),
  experience: EXP.map((e) => slug(e.r) + ".txt"),
  projects: PROJECTS.map((x) => slug(x.n) + ".md"),
  skills: Object.keys(SKILLS).map((k) => k.toLowerCase() + ".txt"),
};
export const FILES = {
  "about.txt": ME.bio.join("\n\n"),
  "contact.txt": `email:    ${ME.email}\ngithub:   ${ME.github}\nlinkedin: ${ME.linkedin}\nlocation: ${ME.where}`,
  "README.md":
    "# portfolio\n\nType 'ls' to look around, 'cat <file>' to read, 'cd <dir>' to move,\n'open <page>' to jump. Press Ctrl/⌘+K for the launcher.",
};
EDU.forEach(
  (e) =>
    (FILES["education/" + slug(e.t) + ".txt"] =
      `${e.t}\n${e.o} · ${e.y}\n${e.d}`),
);
EXP.forEach(
  (e) =>
    (FILES["experience/" + slug(e.r) + ".txt"] =
      `${e.r} @ ${e.o} (${e.y})\n` + e.d.map((x) => " - " + x).join("\n")),
);
PROJECTS.forEach(
  (x) =>
    (FILES["projects/" + slug(x.n) + ".md"] =
      `# ${x.n}\n${x.d}\n-> ${x.hi}\nstack: ${x.s.join(", ")}\n${x.link}`),
);
Object.entries(SKILLS).forEach(
  ([k, a]) =>
    (FILES["skills/" + k.toLowerCase() + ".txt"] = a
      .map(
        ([n, v]) =>
          n.padEnd(11) +
          "█".repeat(Math.round(v / 10)) +
          "░".repeat(10 - Math.round(v / 10)) +
          " " +
          v +
          "%",
      )
      .join("\n")),
);

export const COMMANDS = [
  "help",
  "ls",
  "cd",
  "pwd",
  "cat",
  "tree",
  "whoami",
  "hostname",
  "uname",
  "date",
  "echo",
  "clear",
  "history",
  "neofetch",
  "open",
  "theme",
  "fib",
  "prime",
  "sudo",
  "exit",
];
export const TUX = [
  "    .--.   ",
  "   |o_o |  ",
  "   |:_/ |  ",
  "  //   \\ \\ ",
  " (|     | )",
  "/'\\_   _/'\\",
  "\\___)=(___/",
];
