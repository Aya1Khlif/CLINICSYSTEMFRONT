export default function EndpointCard({ name, path, description, data }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 animate-fade-in">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">{name}</h3>
      <p className="text-gray-600 mb-2">
        Path: <span className="font-mono text-sm">{path}</span>
      </p>
      <p className="text-gray-700">{description}</p>
      {data.length > 0 && (
        <pre className="text-gray-600 mt-4 text-xs bg-gray-100 p-4 rounded-lg overflow-auto max-h-40">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
        Explore
      </button>
    </div>
  );
}