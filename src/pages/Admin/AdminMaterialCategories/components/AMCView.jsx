export default function AMCView({ item }) {
    const getType = (type) => {
        if (type === "per_quantity") return 1;
        else if (type === "per_metter") return 2;
    };
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-y-2">
            <h1 className="font-bold text-24">Material Category Information</h1>
            <div className="w-full max-w-[300px] flex justify-center items-center">
                <img
                    alt="image"
                    src={item?.image}
                    className="aspect-video w-full rounded-md shadow-md flex-shrink-0"
                />
            </div>
            <h2 className="text-lg font-semibold text-center">{item?.name}</h2>
            <h4 className="text-sm text-gray-500 font-normal text-center italic">
                Type:{" "}
                {getType(item?.price_type) === 1 ? (
                    <span className="text-sm text-green-600 px-3 py-1 rounded-md bg-green-300/50 font-semibold">
                        Quantity
                    </span>
                ) : (
                    <span className="text-sm text-yellow-600 px-3 py-1 rounded-md bg-yellow-300/50 font-semibold">
                        Metter
                    </span>
                )}
            </h4>
        </div>
    );
}
