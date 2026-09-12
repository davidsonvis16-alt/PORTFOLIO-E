import { Link, Navigate, useParams } from "react-router-dom";
import { MESSAGES, waLink } from "../data/site";
import { getProject, nextProject, projectIndex } from "../data/projects";
import { useSeo } from "../lib/seo";
import ProjectMedia from "../components/ProjectMedia";
import { MaskedLines, Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import {
  ArrowIcon,
  ArrowLeft,
  ArrowUpRight,
  WhatsAppIcon,
} from "../components/icons";

/* Rendered in order, and only when the project actually has the copy. */
const BLOCKS = [
  { key: "problem", index: "01", label: "The problem" },
  { key: "approach", index: "02", label: "The approach" },
  { key: "build", index: "03", label: "The build" },
  { key: "result", index: "04", label: "The result" },
];

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);

  useSeo({
    title: project ? `${project.title} — ${project.category}` : "Selected work",
    description: project
      ? project.desc
      : "Live websites built for businesses in Nairobi and Nakuru.",
    path: project ? `/work/${project.slug}` : "/work",
  });

  if (!project) return <Navigate to="/work" replace />;

  const n = projectIndex(project.slug);
  const next = nextProject(project.slug);
  const study = project.study;
  const blocks = study ? BLOCKS.filter((b) => study[b.key]) : [];

  return (
    <article>
      <section className="section section--top section--tight" aria-labelledby="study-title">
        <div className="container">
          <Reveal y={10} style={{ marginBottom: 28 }}>
            <Link to="/work" className="tlink" data-cursor="link">
              <ArrowLeft /> All work
            </Link>
          </Reveal>

          <div className="study__head">
            <Reveal className="case__index" y={10}>
              <span className="case__index-num">Project {n}</span>
              <span className="case__index-rule" />
              <span className="mono">{project.category}</span>
            </Reveal>

            <h1 className="study__title" id="study-title">
              <MaskedLines lines={[project.title]} />
            </h1>

            <Reveal as="p" className="study__lede" delay={0.1}>
              {project.desc}
            </Reveal>

            <RevealGroup className="study__meta" gap={0.06}>
              <RevealItem className="study__meta-cell" y={12}>
                <span className="mono">Client</span>
                <span className="study__meta-val">{project.client}</span>
              </RevealItem>
              <RevealItem className="study__meta-cell" y={12}>
                <span className="mono">Role</span>
                <span className="study__meta-val">Design &amp; build</span>
              </RevealItem>
              <RevealItem className="study__meta-cell" y={12}>
                <span className="mono">Stack</span>
                <span className="study__meta-val">{project.tech.join(" · ")}</span>
              </RevealItem>
              <RevealItem className="study__meta-cell" y={12}>
                <span className="mono">Status</span>
                <span className="study__meta-val">
                  {project.live ? (
                    <a
                      className="tlink"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                    >
                      Live <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    "In development"
                  )}
                </span>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Only projects with a real screenshot get the full-width preview —
          an empty placeholder that size would say nothing. */}
      {project.image && (
        <div className="container study__hero">
          <Reveal y={24}>
            <ProjectMedia project={project} priority sizes="(max-width: 1080px) 100vw, 1320px" />
          </Reveal>
        </div>
      )}

      <section className="section section--tight" aria-label="Case study">
        <div className="container">
          {blocks.length > 0 ? (
            <div className="study__sections">
              {blocks.map((block) => (
                <Reveal className="study__block" key={block.key} y={18}>
                  <div className="s-head__meta">
                    <span className="index-tag">{block.index}</span>
                    <span className="mono mono--ink">{block.label}</span>
                  </div>
                  <p className="study__block-body">{study[block.key]}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="study__draft" y={18}>
              <span className="mono mono--ink">Case study in progress</span>
              <p>
                The full write-up for this project — the problem, the approach, the
                build and the result — is still being written. The site itself is
                live and is the best look at the work in the meantime.
              </p>
              {project.live && (
                <a
                  className="tlink"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  style={{ marginTop: 6 }}
                >
                  Visit {project.title} <ArrowUpRight />
                </a>
              )}
            </Reveal>
          )}

          <Reveal className="study__nav" y={16}>
            {next && (
              <Link
                to={`/work/${next.slug}`}
                className="tlink"
                data-cursor="project"
                data-cursor-label="View project"
              >
                Next project — {next.title} <ArrowIcon />
              </Link>
            )}
            <span className="mono">{project.tech.join(" · ")}</span>
          </Reveal>

          <Reveal
            y={18}
            style={{ marginTop: "clamp(36px, 5vw, 64px)", display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              className="btn btn--primary"
              href={waLink(MESSAGES.project(project.title))}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              <WhatsAppIcon size={16} /> Build something like this <ArrowIcon />
            </a>
            {project.live && (
              <a
                className="btn btn--ghost"
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
              >
                Visit live site <ArrowUpRight />
              </a>
            )}
          </Reveal>
        </div>
      </section>
    </article>
  );
}
