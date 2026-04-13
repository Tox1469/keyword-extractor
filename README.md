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
