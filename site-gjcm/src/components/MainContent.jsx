import { useMemo, useState } from "react";
import { eventos } from "../dados-do-grupo/eventos";
import { virtudes } from "../dados-do-grupo/virtudes";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useProjects } from "../hooks/useProjects";

function ProjectForm({ project, onSave, onCancel }) {
  const [form, setForm] = useState(() => ({
    title: project?.title || "", shortDescription: project?.shortDescription || "",
    description: project?.description || "", category: project?.category || "Ação social",
    coverImage: project?.coverImage || "", status: project?.status || "published",
    featured: project?.featured || false,
  }));
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(project?.coverImage || "");

  function change(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }
  function chooseImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Selecione um arquivo de imagem válido."); return; }
    if (file.size > 1024 * 1024) { setError("A imagem deve ter no máximo 1 MB para o armazenamento local."); return; }
    const reader = new FileReader();
    reader.onload = () => { setPreview(String(reader.result)); setForm((current) => ({ ...current, coverImage: String(reader.result) })); setError(""); };
    reader.onerror = () => setError("Não foi possível ler a imagem selecionada.");
    reader.readAsDataURL(file);
  }

  function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) { setError("O título é obrigatório."); return; }
    if (!form.shortDescription.trim()) { setError("A descrição curta é obrigatória."); return; }
    const result = onSave(form);
    if (!result.success) setError(result.message || "Não foi possível salvar o projeto.");
  }

  return (
    <form className="project-form" onSubmit={submit}>
      <div className="form-heading"><div><span className="eyebrow">ÁREA DE GERENCIAMENTO</span><h3>{project ? "Editar projeto" : "Novo projeto"}</h3></div>
        <button type="button" className="icon-button" onClick={onCancel} aria-label="Fechar formulário">×</button></div>
      <label>Título <span>*</span><input name="title" value={form.title} onChange={change} required maxLength={90} placeholder="Nome do projeto" /></label>
      <label>Descrição curta <span>*</span><input name="shortDescription" value={form.shortDescription} onChange={change} required maxLength={180} placeholder="Uma apresentação breve" /></label>
      <label>Descrição completa<textarea name="description" value={form.description} onChange={change} rows="4" placeholder="Conte mais sobre a iniciativa..." /></label>
      <div className="form-row">
        <label>Categoria<select name="category" value={form.category} onChange={change}><option>Ação social</option><option>Formação</option><option>Espiritualidade</option><option>Evento</option><option>Comunidade</option><option>Outra</option></select></label>
        <label>Visibilidade<select name="status" value={form.status} onChange={change}><option value="published">Publicado</option><option value="draft">Rascunho</option></select></label>
      </div>
      <label>Imagem de capa<input type="file" accept="image/*" onChange={chooseImage} /><small className="field-help">Opcional · JPG, PNG ou WebP · até 1 MB</small></label>
      {preview && <div className="image-preview"><img src={preview} alt="Pré-visualização da capa" /><button type="button" className="text-button" onClick={() => { setPreview(""); setForm((current) => ({ ...current, coverImage: "" })); }}>Remover imagem</button></div>}
      <label className="check-label"><input type="checkbox" name="featured" checked={form.featured} onChange={change} /> Destacar este projeto</label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <div className="form-actions"><button className="button button-outline" type="button" onClick={onCancel}>Cancelar</button><button className="button button-red" type="submit">{project ? "Salvar alterações" : "Cadastrar projeto"}</button></div>
    </form>
  );
}

function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-card">
      <div className="project-image">{project.coverImage ? <img src={project.coverImage} alt="" loading="lazy" /> : <div className="image-placeholder"><span>♡</span><small>Coração Mariano</small></div>}
        {project.featured && <span className="featured-label">Em destaque</span>}</div>
      <div className="project-card-body"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.shortDescription}</p>
        {project.description && <details><summary>Saiba mais</summary><p>{project.description}</p></details>}
        <div className="project-actions"><button className="text-button" onClick={onEdit}>Editar</button><button className="text-button danger-text" onClick={onDelete}>Excluir</button></div>
      </div>
    </article>
  );
}

export function MainContent() {
  const { projects, add, edit, remove, storageError, clearStorageError } = useProjects();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Todas");
  const [notice, setNotice] = useState("");
  const categories = useMemo(() => ["Todas", ...new Set(projects.map((item) => item.category))], [projects]);
  const visibleProjects = useMemo(() => projects.filter((item) => item.status === "published")
    .filter((item) => (filter === "Todas" || item.category === filter))
    .filter((item) => `${item.title} ${item.shortDescription} ${item.description}`.toLocaleLowerCase("pt-BR").includes(query.toLocaleLowerCase("pt-BR")))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || new Date(b.createdAt) - new Date(a.createdAt)), [projects, filter, query]);

  function save(data) {
    const result = editing ? edit(editing.id, data) : add(data);
    if (result.success) {
      setShowForm(false); setEditing(null);
      setNotice(editing ? "As alterações foram salvas." : "Projeto cadastrado com sucesso.");
    }
    return result;
  }
  function startEdit(project) { setEditing(project); setShowForm(true); document.getElementById("projetos")?.scrollIntoView({ behavior: "smooth" }); }
  function deleteItem(project) {
    if (!window.confirm(`Deseja realmente excluir “${project.title}”?`)) return;
    const result = remove(project.id);
    setNotice(result.success ? "Projeto excluído." : result.message);
  }

  return (
    <>
      <Header />
      <main>
        <section className="hero" id="inicio">
          <div className="hero-text"><span className="eyebrow hero-eyebrow">FÉ · AMIZADE · DEVOÇÃO</span>
            <h1>Jovens unidos<br />pelo <em>amor de Maria.</em></h1>
            <p>Uma família que caminha na fé, cresce na amizade e busca, a cada dia, aproximar os corações de Cristo.</p>
            <div className="hero-actions"><a className="button button-light" href="#essencia">Conheça nossa essência <span>↓</span></a><a className="hero-link" href="#projetos">Nossas iniciativas <span>↗</span></a></div>
          </div>
          <div className="hero-art"><div className="hero-orbit" /><img src="/logo-coracao-mariano.png" alt="Emblema do Grupo de Jovens Coração Mariano" /><span className="hero-caption">COR · MARIA · JUVENTUDE</span></div>
          <span className="hero-side-note">GRUPO DE JOVENS — CORAÇÃO MARIANO</span>
        </section>

        <section className="intro-section section-wrap" id="essencia">
          <div className="section-kicker"><span>01</span><i /></div>
          <div className="intro-grid"><div><span className="eyebrow">QUEM SOMOS</span><h2>Mais que um grupo,<br /><em>uma família.</em></h2></div>
            <div className="intro-copy"><p>O Coração Mariano é um espaço de encontro, amizade e vivência da fé católica. Caminhamos juntos, inspirados pelo amor de Nossa Senhora e pelo desejo de nos aproximarmos cada vez mais de Deus.</p><p>Na oração, na formação e na fraternidade, buscamos fazer da juventude um tempo fecundo de crescimento e entrega.</p><a className="underlined-link" href="#atividades">Conheça o que nos move <span>→</span></a></div></div>
          <div className="virtue-grid">{virtudes.map((item, index) => <article className="virtue-item" key={item.id}><span className="virtue-symbol">{index === 0 ? "✳" : "♡"}</span><span className="virtue-index">0{index + 1}</span><h3>{item.titulo}</h3><p>{item.descricao}</p></article>)}</div>
        </section>

        <section className="activities-section" id="atividades"><div className="section-wrap">
          <div className="section-kicker light-kicker"><span>02</span><i /></div><div className="section-heading"><div><span className="eyebrow">NOSSA CAMINHADA</span><h2>Fé que se torna <em>vida.</em></h2></div><p>Encontros e iniciativas que fortalecem nossa caminhada comunitária.</p></div>
          <div className="event-grid">{eventos.map((event, index) => <article className="event-card" key={event.id}><div className="event-top"><span>{index === 0 ? "Encontro" : "Iniciativa anual"}</span><span>0{index + 1}</span></div><h3>{event.titulo}</h3><p>{event.descricao}</p><span className="event-rule" /></article>)}</div>
        </div></section>

        <section className="projects-section section-wrap" id="projetos">
          <div className="section-kicker"><span>03</span><i /></div>
          <div className="section-heading projects-heading"><div><span className="eyebrow">INICIATIVAS DO GRUPO</span><h2><em>Projetos que florescem.</em></h2></div><p>Conheça as iniciativas que nascem da fé e se transformam em gestos concretos.</p></div>
          <div className="project-toolbar"><div className="project-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Pesquisar projetos" placeholder="Buscar projetos..." /></div>
            <select aria-label="Filtrar por categoria" value={filter} onChange={(event) => setFilter(event.target.value)}>{categories.map((category) => <option key={category}>{category}</option>)}</select>
            <button className="button button-red" onClick={() => { setEditing(null); setShowForm(true); }}>+ Adicionar projeto</button></div>
          {notice && <p className="notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dispensar mensagem">×</button></p>}
          {storageError && <p className="form-error" role="alert">{storageError}<button onClick={clearStorageError}>Fechar</button></p>}
          {showForm && <ProjectForm key={editing?.id || "new"} project={editing} onSave={save} onCancel={() => { setShowForm(false); setEditing(null); }} />}
          {projects.length > 0 && <details className="manager-panel"><summary>Gerenciar todos os registros ({projects.length})</summary><div className="manager-list">{projects.map((project) => <div className="manager-row" key={project.id}><div><strong>{project.title}</strong><span>{project.category} · {project.status === "draft" ? "Rascunho" : "Publicado"}</span></div><div><button className="text-button" onClick={() => startEdit(project)}>Editar</button><button className="text-button danger-text" onClick={() => deleteItem(project)}>Excluir</button></div></div>)}</div></details>}
          {visibleProjects.length ? <div className="project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onEdit={() => startEdit(project)} onDelete={() => deleteItem(project)} />)}</div>
            : <div className="empty-projects"><span>✳</span><h3>{projects.length ? "Nenhum projeto encontrado." : "Novas iniciativas estão a caminho."}</h3><p>{projects.length ? "Tente alterar sua busca ou selecionar outra categoria." : "Assim que houver projetos cadastrados, eles serão apresentados neste espaço."}</p></div>}
          <p className="manager-note">Gerenciamento local: os projetos cadastrados ficam salvos neste navegador.</p>
        </section>
        <section className="closing-quote"><span>“</span><p>Fazei tudo o que Ele vos disser.</p><small>João 2, 5</small><i /></section>
      </main>
      <Footer />
    </>
  );
}
