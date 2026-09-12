import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FEATURED, REST, projectIndex } from "../data/projects";
import { useFinePointer, usePrefersReducedMotion } from "../lib/hooks";
import SectionHeader from "../components/SectionHeader";
import ProjectMedia from "../components/ProjectMedia";
import { Reveal, RevealGroup, RevealItem } from "../components/Reveal";
import { ArrowIcon, ArrowUpRight } from "../components/icons";

/* --- featured case ------------------------------------------------------ */

function FeaturedCase({ project, flip, priority }) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const interactive = fine && !reduced;

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 140, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 140, damping: 22, mass: 0.5 });

  const onMove = (event) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    // deliberately small: the image drifts, the layout never moves
    mx.set(((event.clientX - rect.left) / rect.width - 0.5) * 14);
    my.set(((event.clientY - rect.top) / rect.height - 0.5) * 10);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const n = projectIndex(project.slug);

  return (
    <Reveal as="article" className={`case${flip ? " case--flip" : ""}`} y={26}>
      <div className="case__body">
        <div className="case__index">
          <span className="case__index-num">{n}</span>
          <span className="case__index-rule" />
          <span className="mono">{project.category}</span>
        </div>

        <h3>
          <Link
            to={`/work/${project.slug}`}
            className="case__title"
            data-cursor="project"
            data-cursor-label="View project"
          >
            {project.title}
          </Link>
        </h3>

        <p className="case__desc">{project.summary}</p>

        <div className="case__meta">
          <div className="case__meta-row">
            <span className="mono case__meta-key">Client</span>
            <span className="case__meta-val">{project.client}</span>
          </div>
          <div className="case__meta-row">
            <span className="mono case__meta-key">Stack</span>
            <span className="case__meta-val">{project.tech.join(" · ")}</span>
          </div>
        </div>

        <div className="case__actions">
          <Link to={`/work/${project.slug}`} className="btn btn--primary" data-cursor="link">
            Explore project <ArrowIcon />
          </Link>
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
        </div>
      </div>

      <div className="case__media" onMouseMove={onMove} onMouseLeave={onLeave}>
        <Link
          to={`/work/${project.slug}`}
          aria-label={`${project.title} case study`}
          data-cursor="project"
          data-cursor-label="View project"
          style={{ display: "block" }}
        >
          <motion.span
            style={interactive ? { x, y, display: "block" } : { display: "block" }}
          >
            <ProjectMedia
              project={project}
              priority={priority}
              sizes="(max-width: 1080px) 100vw, 55vw"
            />
          </motion.span>
        </Link>
      </div>
    </Reveal>
  );
}

/* --- compact card ------------------------------------------------------- */

function ProjectCard({ project }) {
  const n = projectIndex(project.slug);
  const soon = project.status === "in-development";

  const body = (
    <>
      <ProjectMedia project={project} sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 30vw" />
      <div className="card__body">
        <div className="card__head">
          <span className="card__title">{project.title}</span>
          <span className="index-tag">{n}</span>
        </div>
        <span className="mono">{project.category}</span>
        <p className="card__desc">{project.summary}</p>
        <div className="card__foot">
          <span className="mono">{project.tech.join(" · ")}</span>
          {soon ? (
            <span className="mono mono--accent">In development</span>
          ) : (
            <ArrowIcon />
          )}
        </div>
      </div>
    </>
  );

  if (soon) {
    return (
      <RevealItem as="article" className="card card--soon" y={20}>
        {body}
      </RevealItem>
    );
  }

  return (
    <RevealItem as="article" className="card" y={20}>
      <Link
        to={`/work/${project.slug}`}
        data-cursor="project"
        data-cursor-label="View project"
        style={{ display: "flex", flexDirection: "column", height: "100%" }}
        aria-label={`${project.title} case study`}
      >
        {body}
      </Link>
    </RevealItem>
  );
}

/* --- section ------------------------------------------------------------ */

export default function Work({ standalone = false }) {
  return (
    <section id="work" className={`section${standalone ? " section--top" : ""}`} aria-labelledby="work-title">
      <div className="container">
        <SectionHeader
          level={standalone ? 1 : 2}
          index="03"
          label="Selected work"
          titleId="work-title"
          title={["Work that earns", "its place online."]}
          lede="Live sites for businesses in Nairobi and Nakuru — restaurants, shops and growing local brands. Every project here is real and running."
        />

        <div className="work__list">
          {FEATURED.map((project, i) => (
            <FeaturedCase
              key={project.slug}
              project={project}
              flip={i % 2 === 1}
              priority={i === 0}
            />
          ))}

          <RevealGroup className="work__grid" gap={0.08}>
            {REST.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
