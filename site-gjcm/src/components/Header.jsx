import { useState } from "react";

const links = [
  ["Início", "#inicio"], ["Nossa essência", "#essencia"],
  ["Atividades", "#atividades"], ["Projetos", "#projetos"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <a className="brand" href="#inicio" aria-label="Coração Mariano — início">
        <img src="/logo-coracao-mariano.png" alt="" />
        <span><strong>Coração Mariano</strong><small>Grupo de Jovens</small></span>
      </a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-nav"
        aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      <nav id="main-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="#projetos" onClick={() => setOpen(false)}>Conheça o grupo <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
