import { imageSources } from "../data/projects";

/**
 * A project screenshot inside its frame, or a typographic placeholder when
 * the project has no image yet. Sized by CSS aspect-ratio so nothing shifts
 * while the image loads.
 */
export default function ProjectMedia({ project, sizes, priority = false, className = "" }) {
  if (!project.image) {
    return (
      <span className={`frame ${className}`.trim()}>
        <span className="placeholder" aria-hidden="true">
          <span className="placeholder__letter">
            {project.title.charAt(0)}
            <span className="placeholder__dot">.</span>
          </span>
        </span>
      </span>
    );
  }

  const src = imageSources(project.image);
  return (
    <span className={`frame ${className}`.trim()}>
      <picture>
        <source type="image/webp" srcSet={src.webp} sizes={sizes} />
        <img
          className="frame__img"
          src={src.fallback}
          srcSet={src.jpg}
          sizes={sizes}
          width="1600"
          height="800"
          alt={`${project.title} — website preview`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </span>
  );
}
