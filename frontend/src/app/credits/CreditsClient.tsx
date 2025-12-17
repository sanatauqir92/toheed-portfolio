'use client';
import { useState } from 'react';
import { IoEllipsisVerticalCircle } from 'react-icons/io5';

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
    onset.data.forEach((option: OnSet) => {
      initialVisible[option.category] = 5;
    });
    return initialVisible;
  });

  const showMoreProjects = (category: string) => {
    setVisibleProjects((prev) => ({
      ...prev,
      [category]: (prev[category] || 5) + 5,
    }));
  };

  return (
    <>
      <h1 className="text-3xl font-bold uppercase">Credits</h1>
      <ul className="flex flex-col lg:flex-row justify-between gap-2">
        {onset.data[0] && (
          <li
            key={onset.data[0].documentId}
            className="text-xl lg:w-1/3 mt-2 justify-between uppercase"
          >
            {onset.data[0].category}

            {onset.data[0].projects && (
              <div className="flex flex-col text-lg gap-1">
                {onset.data[0].projects
                  .slice(0, visibleProjects[onset.data[0].category] || 5)
                  .map((project, index) => (
                    <ul
                      className="border-2 border-dashed border-amber-900 p-2 mt-2"
                      key={index}
                    >
                      {project.url ? (
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
                {onset.data[0].projects.length >
                  (visibleProjects[onset.data[0].category] || 5) && (
                  <button
                    className="flex flex-col items-center text-amber-950 hover:cursor-pointer hover:text-blue-800"
                    onClick={() => showMoreProjects(onset.data[0].category)}
                  >
                    <p className="text-sm">See More</p>
                    <IoEllipsisVerticalCircle className="text-4xl" />
                  </button>
                )}
              </div>
            )}
          </li>
        )}

        {onset.data[1] && (
          <li
            key={onset.data[1].documentId}
            className="text-xl lg:w-1/3 mt-2 justify-between uppercase"
          >
            {onset.data[1].category}
            {onset.data[1].projects && (
              <div className="flex flex-col text-lg gap-1">
                {onset.data[1].projects.map((project, index) => (
                  <ul
                    className="border-2 border-dashed border-amber-900 p-2 mt-2"
                    key={index}
                  >
                    {project.url && project.url.length != 0 ? (
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
                  </ul>
                ))}
              </div>
            )}
          </li>
        )}

        <li className="text-xl lg:w-1/3 mt-2 justify-between uppercase">
          {onset.data.slice(2).map((option) => (
            <div key={option.documentId} className="mb-4">
              <div className="uppercase">{option.category}</div>
              {option.projects && (
                <div className="flex flex-col text-lg gap-1">
                  {option.projects.map((project, index) => (
                    <ul
                      className="border-2 border-dashed border-amber-900 p-2 mt-2"
                      key={index}
                    >
                      {project.url && project.url.length != 0 ? (
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
                    </ul>
                  ))}
                </div>
              )}
            </div>
          ))}
        </li>
      </ul>
    </>
  );
}
