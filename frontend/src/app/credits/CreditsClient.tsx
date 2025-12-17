'use client';
import { useState, useEffect, useRef } from 'react';

type OnSet = {
  category: string;
  documentId: string;
  projects: Project[];
};

type Project = {
  url?: string;
  title: string;
  length: string;
  description: string;
  accolades: string;
  additionalInfo?: string;
};

type SetData = {
  data: OnSet[];
};

export default function CreditsClient({ onset }: { onset: SetData }) {
  const [visibleProjects, setVisibleProjects] = useState<{
    [key: string]: number;
  }>(() => {
    const initialVisible: { [key: string]: number } = {};
    if (onset?.data) {
      onset.data.forEach((option: OnSet) => {
        initialVisible[option.category] = 5;
      });
    }
    return initialVisible;
  });

  // Accordion state for mobile
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    () => new Set(onset?.data?.map(cat => cat.category) || [])
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const loadMoreProjects = (category: string) => {
    setVisibleProjects((prev) => ({
      ...prev,
      [category]: (prev[category] || 5) + 5,
    }));
  };

  // Category component with intersection observer
  const CategorySection = ({ category }: { category: OnSet }) => {
    const observerRef = useRef<HTMLDivElement>(null);
    const isExpanded = expandedCategories.has(category.category);
    const visibleCount = visibleProjects[category.category] || 5;
    const hasMore = category.projects.length > visibleCount;

    // Intersection observer for auto-load on desktop
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && hasMore && window.innerWidth >= 1024) {
            loadMoreProjects(category.category);
          }
        },
        { threshold: 0.1, rootMargin: '100px' }
      );

      if (observerRef.current) {
        observer.observe(observerRef.current);
      }

      return () => observer.disconnect();
    }, [hasMore, category.category]);

    return (
      <li
        key={category.documentId}
        className="text-xl lg:w-1/3 mt-2 justify-between"
      >
        {/* Sticky header for mobile, clickable accordion toggle */}
        <button
          onClick={() => toggleCategory(category.category)}
          className="sticky top-0 bg-white z-10 py-2 w-full text-left flex items-center justify-between uppercase lg:static lg:pointer-events-none lg:pb-0"
        >
          <span>{category.category}</span>
          <span className="lg:hidden text-2xl">
            {isExpanded ? '−' : '+'}
          </span>
        </button>

        {/* Content - collapsible on mobile, always visible on desktop */}
        {category.projects && (
          <div
            className={`flex flex-col text-lg gap-1 transition-all duration-300 overflow-hidden ${
              isExpanded ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-[10000px] lg:opacity-100'
            }`}
          >
            {category.projects
              .slice(0, visibleCount)
              .map((project, index) => (
                <ul
                  className="border-2 border-dashed border-amber-900 p-2 mt-2"
                  key={index}
                >
                  {project.url && project.url.length !== 0 ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <li className="font-bold text-wrap hover:text-blue-800">
                        {project.title}
                      </li>
                    </a>
                  ) : (
                    <li className="font-bold text-wrap">{project.title}</li>
                  )}
                  <li>{project.length}</li>
                  <li>{project.description}</li>
                  <li className="font-bold">{project.accolades}</li>
                  {project.additionalInfo ? (
                    <li className="float-end text-blue-800">
                      {project.additionalInfo}
                    </li>
                  ) : null}
                </ul>
              ))}

            {/* Intersection observer trigger for desktop auto-load */}
            {hasMore && <div ref={observerRef} className="h-4" />}
          </div>
        )}
      </li>
    );
  };

  if (!onset?.data || onset.data.length === 0) {
    return (
      <>
        <h1 className="text-3xl font-bold uppercase">Credits</h1>
        <p className="text-lg mt-4">No credits data available.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold uppercase">Credits</h1>
      <ul className="flex flex-col lg:flex-row justify-between gap-2">
        {onset.data[0] && <CategorySection category={onset.data[0]} />}
        {onset.data[1] && <CategorySection category={onset.data[1]} />}

        {/* Third column with multiple categories */}
        {onset.data.length > 2 && (
          <li className="text-xl lg:w-1/3 mt-2 justify-between">
            {onset.data.slice(2).map((category) => {
              const SmallCategorySection = () => {
                const observerRef = useRef<HTMLDivElement>(null);
                const isExpanded = expandedCategories.has(category.category);
                const visibleCount = visibleProjects[category.category] || category.projects.length;
                const hasMore = category.projects.length > visibleCount;

                // Intersection observer for auto-load on desktop
                useEffect(() => {
                  const observer = new IntersectionObserver(
                    ([entry]) => {
                      if (entry.isIntersecting && hasMore && window.innerWidth >= 1024) {
                        loadMoreProjects(category.category);
                      }
                    },
                    { threshold: 0.1, rootMargin: '100px' }
                  );

                  if (observerRef.current) {
                    observer.observe(observerRef.current);
                  }

                  return () => observer.disconnect();
                }, [hasMore]);

                return (
                  <div key={category.documentId} className="mb-6 last:mb-0">
                    <button
                      onClick={() => toggleCategory(category.category)}
                      className="sticky top-0 bg-white z-10 py-2 w-full text-left flex items-center justify-between uppercase lg:static lg:pointer-events-none lg:pb-0"
                    >
                      <span>{category.category}</span>
                      <span className="lg:hidden text-2xl">
                        {isExpanded ? '−' : '+'}
                      </span>
                    </button>
                    {category.projects && (
                      <div
                        className={`flex flex-col text-lg gap-1 transition-all duration-300 overflow-hidden ${
                          isExpanded
                            ? 'max-h-[10000px] opacity-100'
                            : 'max-h-0 opacity-0 lg:max-h-[10000px] lg:opacity-100'
                        }`}
                      >
                        {category.projects.slice(0, visibleCount).map((project, index) => (
                          <ul
                            className="border-2 border-dashed border-amber-900 p-2 mt-2"
                            key={index}
                          >
                            {project.url && project.url.length !== 0 ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <li className="font-bold text-wrap hover:text-blue-800">
                                  {project.title}
                                </li>
                              </a>
                            ) : (
                              <li className="font-bold text-wrap">
                                {project.title}
                              </li>
                            )}
                            <li>{project.length}</li>
                            <li>{project.description}</li>
                            <li className="font-bold">{project.accolades}</li>
                          </ul>
                        ))}
                        {hasMore && <div ref={observerRef} className="h-4" />}
                      </div>
                    )}
                  </div>
                );
              };

              return <SmallCategorySection key={category.documentId} />;
            })}
          </li>
        )}
      </ul>
    </>
  );
}
