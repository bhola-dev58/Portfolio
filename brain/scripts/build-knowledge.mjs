import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BRAIN_DIR = path.resolve(__dirname, '..');
const KNOWLEDGE_DIR = path.join(BRAIN_DIR, 'knowledge');

if (!fs.existsSync(KNOWLEDGE_DIR)) {
  fs.mkdirSync(KNOWLEDGE_DIR, { recursive: true });
}

function parseFrontMatter(content) {
  const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
  const match = content.match(fmRegex);
  if (!match) {
    return { metadata: {}, body: content };
  }

  const rawFm = match[1];
  const body = content.slice(match[0].length);
  const metadata = {};

  rawFm.split('\n').forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const value = line.slice(colonIdx + 1).trim();
      metadata[key] = value;
    }
  });

  return { metadata, body };
}

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      const relativeName = path.relative(BRAIN_DIR, fullPath);
      if (!['knowledge', 'scripts', '05_logs'].includes(relativeName)) {
        results = results.concat(getFilesRecursively(fullPath));
      }
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

const files = getFilesRecursively(BRAIN_DIR);
const publicChunks = [];
const privateChunks = [];

let totalPublicTokens = 0;
let totalPrivateTokens = 0;

files.forEach((filePath) => {
  const relativePath = path.relative(BRAIN_DIR, filePath);
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { metadata, body } = parseFrontMatter(rawContent);

  const title = metadata.title || path.basename(filePath, '.md');
  const visibility = metadata.visibility || 'public';
  const updated = metadata.updated || new Date().toISOString().split('T')[0];

  const sections = body.split(/\n(?=## )/);

  sections.forEach((section, idx) => {
    const trimmed = section.trim();
    if (!trimmed) return;

    let heading = 'Overview';
    if (trimmed.startsWith('## ')) {
      const headingLine = trimmed.split('\n')[0];
      heading = headingLine.replace('## ', '').trim();
    }

    const approxTokens = Math.ceil(trimmed.length / 4);

    const chunk = {
      id: `${relativePath}#${idx + 1}`,
      path: relativePath,
      title,
      heading,
      visibility,
      updated,
      tokens: approxTokens,
      text: trimmed,
    };

    if (visibility === 'public') {
      publicChunks.push(chunk);
      totalPublicTokens += approxTokens;
    }

    privateChunks.push(chunk);
    totalPrivateTokens += approxTokens;
  });
});

const publicFile = path.join(KNOWLEDGE_DIR, 'public.jsonl');
const privateFile = path.join(KNOWLEDGE_DIR, 'private.jsonl');

fs.writeFileSync(
  publicFile,
  publicChunks.map((c) => JSON.stringify(c)).join('\n') + '\n',
  'utf-8'
);

fs.writeFileSync(
  privateFile,
  privateChunks.map((c) => JSON.stringify(c)).join('\n') + '\n',
  'utf-8'
);

console.log('✅ Knowledge Build Complete!');
console.log(`Public chunks: ${publicChunks.length} (~${totalPublicTokens} tokens) -> ${publicFile}`);
console.log(`Private chunks: ${privateChunks.length} (~${totalPrivateTokens} tokens) -> ${privateFile}`);
