[![CI](https://img.shields.io/github/actions/workflow/status/Tox1469/keyword-extractor/ci.yml?style=flat-square&label=ci)](https://github.com/Tox1469/keyword-extractor/actions)
[![License](https://img.shields.io/github/license/Tox1469/keyword-extractor?style=flat-square)](LICENSE)
[![Release](https://img.shields.io/github/v/release/Tox1469/keyword-extractor?style=flat-square)](https://github.com/Tox1469/keyword-extractor/releases)
[![Stars](https://img.shields.io/github/stars/Tox1469/keyword-extractor?style=flat-square)](https://github.com/Tox1469/keyword-extractor/stargazers)

---

# keyword-extractor

Extração de palavras-chave estilo RAKE (Rapid Automatic Keyword Extraction).

## Instalação

```bash
npm install keyword-extractor
```

## Uso

```ts
import { extractKeywords } from "keyword-extractor";

extractKeywords("Aprendizado de máquina é um ramo da inteligência artificial");
// [{ phrase: "aprendizado máquina", score: 4 }, ...]
```

## API

- `extractKeywords(text, { stopwords?, maxKeywords?, minPhraseLength? })`

## Licença

MIT