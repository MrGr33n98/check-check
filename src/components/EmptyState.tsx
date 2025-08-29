interface Props {
  title: string;
  description: string;
}

export const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
      <div className="text-gray-400 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">
        {title}
      </h3>
      <p className="text-gray-500">
        {description}
      </p>
    </div>
  );
};