interface Project {
  id: string;
  title: string;
  description: string;
  author: string;
}

interface ProjectCardRowProps {
  project: Project;
}

export default function ProjectCardRow(props: ProjectCardRowProps) {
  const { id, title, description, author } = props.project;

  return (
    <div class="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">{author}</p>

      <a
        href={`/project/${id}`}
        class="inline-flex items-center text-blue-600 hover:underline"
      >
        View
      </a>
    </div>
  );
}
