# Matheus Hub — Link de bio com robô 3D

Página de links profissional (tema escuro minimalista) com um **robô 3D interativo (Spline)**
que segue o ponteiro e continua se movendo sozinho no celular. Ícones de redes sociais
animados e clicáveis: **LinkedIn**, **GitHub** e **Instagram (Perceptron)**.

## Rodar

```bash
npm install
npm run dev
```

Abre em http://localhost:3000

## Onde editar

| O quê | Arquivo |
|------|---------|
| Links das redes sociais | `lib/socials.ts` |
| Nome / cargo exibidos | `lib/socials.ts` (`PROFILE`) |
| Cena do robô (Spline) | `app/page.tsx` → `ROBOT_SCENE` |
| Velocidade/movimento automático do robô | `components/useRobotAutoMotion.ts` |
| Cores de fundo / brilhos | `app/page.tsx` |

> ⚠️ **Falta confirmar:** o `@` do Instagram da Perceptron em `lib/socials.ts`
> está com um placeholder (`/perceptron`). Troque pelo usuário exato.

## Trocar o robô

A cena padrão é um robô que segue o cursor. Pra usar outro:
1. Abra/edite no [Spline](https://spline.design), publique e copie a URL `*.splinecode`.
2. Cole em `ROBOT_SCENE` no `app/page.tsx`.

## Publicar

Deploy fácil na [Vercel](https://vercel.com) (sobe o repositório e pronto). A URL gerada
você coloca na bio do Instagram.
