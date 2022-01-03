const Error = ({ children }: { children: string }) => {
	return (
		<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
			<span className="font-bold">Error: </span> <span className="block sm:inline">{children}</span>
			<span className="absolute top-0 bottom-0 right-0 px-4 py-3" />
		</div>
	);
};

export default Error;
