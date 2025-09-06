# solar-trae

## Fluxo de commits

Este projeto utiliza [Husky](https://typicode.github.io/husky) e [lint-staged](https://github.com/okonet/lint-staged) para formatar os arquivos com [Prettier](https://prettier.io/) antes de cada commit.

1. Instale as dependências com `npm install`.
2. Ao executar `git commit`, o hook de *pre-commit* roda o `lint-staged`, que aplica o Prettier nos arquivos modificados.
