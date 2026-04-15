# 🎨 Exemplos Visuais - Cyberpunk + Profissional

## 1. CORNER ACCENTS (Bordas Angulares)

### Opção A: Corners Discretos (Recomendado)

```
╔─────────────────╗
║                 ║
║   HOME          ║  ← pequenas L's (~8px)
║                 ║    nos 4 cantos
╚─────────────────╝
```

- Tamanho: 8-12px
- Cor: rgba(168, 85, 247, 0.5) roxa ou rgba(0, 255, 200, 0.3) ciano
- Efeito: Adiciona elegância Cyberpunk **sem ser agressivo**
- Onde: Cards principais, botões CTA, skill bars

### Opção B: Clip-path (Mais direto)

```
    ╱─────────────╲
   │               │  ← borderless, cortes angulares
    ╲─────────────╱     em 2-3 pontos-chave
```

- Aplicar em: CTAs ("ABOUT", "VIEW PROJECTS"), status cards
- Deixar cards normais sem clippath (clean)

---

## 2. GLOWS & TYPOGRAPHY

### Sem Glow (Atual)

```
HIGOR HENRIQUE
FRONT-END DEVELOPER
```

### Com Glow Sutil (Proposto)

```
✨ HIGOR HENRIQUE ✨
   (roxo com edge glow suave)
   text-shadow: 0 0 15px rgba(168, 85, 247, 0.4)

FRONT-END DEVELOPER
(ciano com micro glow)
   text-shadow: 0 0 8px rgba(0, 255, 200, 0.25)
```

**Tipografia:**

- H1/H2: Rajdhani Bold (sci-fi elegante)
- Labels: Share Tech Mono 10px (tags, skill names)
- Corpo: Inter/System sans (legível, profissional)

---

## 3. SCANLINES + GRID (Background)

### Scanlines (Quase imperceptível)

```
─────────────────────────────────────
─────────────────────────────────────  ← linhas horizontais
─────────────────────────────────────     opacity: 0.5-1%
─────────────────────────────────────
```

Efeito: Adiciona textura sem poluir
CSS: `repeating-linear-gradient(0deg, rgba(0,255,200,0.005) 0%, transparent 1px, transparent 2px)`

### Grid Pattern (Fundo Hero)

```
┌─┬─┬─┬─┬─┐
├─┼─┼─┼─┼─┤  ← grid muito sutil
├─┼─┼─┼─┼─┤     opacity: 2-3%
├─┼─┼─┼─┼─┤     distância: 40-60px
└─┴─┴─┴─┴─┘
```

Efeito: "Digital landscape" sem parecer futurista demais
CSS: `radial-gradient(circle, rgba(0,255,200,0.02) 1px, transparent 1px)`

---

## 4. CARDS/SKILL BARS - Antes vs Depois

### SKILLS - Antes

```
REACT          ████████░  88%
TAILWIND       ████████░  82%
TYPESCRIPT     ██████░░░  70%
```

### SKILLS - Depois (Proposto)

```
◇ REACT ◇         ████████░  88%
        ↑
   corner accent
   Border: ciano 1px, box-shadow glow sutil

◇ TAILWIND ◇      ████████░  82%

◇ TYPESCRIPT ◇    ██████░░░  70%
```

Melhorias:

- Corner accents pequenos antes do label
- Bar com glow sutil: `box-shadow: 0 0 6px rgba(0,255,200,0.4), inset 0 0 4px rgba(168,85,247,0.2)`
- Cor da bar: roxo gradiente → ciano (diagonal suave)

---

## 5. CTA BUTTONS - Variações

### Opção A: Clip-path Angular

```
    ╱──────────────╲
   │  ABOUT        │  ← bordas cortadas
    ╲──────────────╱     clip-path: polygon
```

Border: rgba(0,255,200,0.4) 1px
Hover: Glow + cor mais vibrante

### Opção B: Border com Corner Accents

```
┌─ ABOUT ─┐
│         │
└─────────┘
```

Border normal + pequenos accents nos cantos
Mais clean, mesmo impacto

---

## 6. COLOR PALETTE (Roxo + Ciano)

### Aplicação

```
Primário:  #A855F7 (roxo metade-roxo, meia saturação)
  → Titles, borders principais, destaques

Secundário: #00FFE0 (ciano brilhante)
  → Glows, accent lines, hover states

Terciário: #7F5CFF (roxo mais escuro/profundo)
  → Backgrounds, subtexts

Use ratio: 70% roxo, 25% ciano, 5% outros
```

---

## 7. EFEITO COMPLETO - Hero Section Exemplo

```
╔════════════════════════════════════════╗
║                                        ║
║  Grid sutil ao fundo (2% opacity)    ║
║  Scanlines imperceptíveis              ║
║                                        ║
║    ◇ HIGOR HENRIQUE ◇                  ║
║      (roxo com micro-glow)             ║
║      FRONT-END DEVELOPER               ║
║      (ciano subtle text-shadow)        ║
║                                        ║
║    I build interfaces focused on...   ║
║                                        ║
║    ┌─ ABOUT ─┐    ┌─ PROJECTS ─┐   ║
║    │  (hover:│    │ (hover:    │   ║
║    │ brighter)    │ brighter)  │   ║
║    └─────────┘    └────────────┘   ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📋 Checklist de Implementação (em ordem de impacto)

1. **Corner Accents** em skill bars + CTAs (impacto: 8/10)
2. **Glow sutil** em H1 (roxo) + descriptions (ciano) (impacto: 7/10)
3. **Scanlines** background (impacto: 5/10, mas completa a vibe)
4. **Grid pattern** em Hero (impacto: 4/10, nice-to-have)
5. **Tipografia refinada** (Rajdhani + monospace labels) (impacto: 6/10)
6. **Clip-path em CTAs** (impacto: 6/10, mas mais agressivo)

---

## 🎯 Minha Recomendação

**Pro inicio, implementar:**

1. ✅ Corner accents nos skill bars
2. ✅ Glow sutil (roxo no titulo, ciano na descrição)
3. ✅ Scanlines no background
4. ✅ Tipografia Rajdhani nos H1/H2
5. ✅ Clip-path **apenas** nos 2 CTAs principais

Isso dá **80% do impacto profissional** sem parecer "gamer".

Depois, se quiser, adicionar grid pattern para completar.

---

**Qual você prefere? Quer que eu implemente assim? Ou quer ajustar algo?**
