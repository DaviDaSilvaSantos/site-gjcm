export function Footer() {
  return (
    <footer className="site-footer" id="contato">
      <div className="footer-main">
        <a className="footer-brand" href="#inicio">
          <img src="/logo-coracao-mariano.png" alt="Símbolo do Grupo de Jovens Coração Mariano" />
          <span><strong>Coração Mariano</strong><small>Grupo de Jovens</small></span>
        </a>
        <p>Mais que um grupo, <strong>uma família.</strong><br />Jovens unidos na fé e no amor de Maria.</p>
        <a className="back-top" href="#inicio">Voltar ao início ↑</a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Coração Mariano</span><span>“Sede santos!”</span></div>
    </footer>
  );
}
