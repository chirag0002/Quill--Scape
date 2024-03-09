export const PageSkeleton = () => {
    return <div role="status" className="animate-pulse flex justify-center">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <span className="sr-only">Loading...</span>
    </div>
}


export const BlogPageSkeleton = () => {
    return (
        <div role="status" className="animate-pulse flex justify-center">
            <div className="p-7 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
                <div className="h-8 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                <div className="flex items-center justify-center w-full h-60 bg-gray-200 mb-4">
                    <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2 max-w-[530px]"></div>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2 mt-3"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2 max-w-[330px]"></div>
                </div>
                <div className="text-md font-thin">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2 mt-3"></div>
                </div>
                <div className="text-slate-500 text-sm font-thin pt-4">
                    <div className="h-2 bg-gray-200 rounded-full mb-0 py-2 max-w-[630px]"></div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

