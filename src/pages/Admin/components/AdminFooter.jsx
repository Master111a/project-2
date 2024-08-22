export default function AdminFooter() {
    return (
        <div className="flex flex-col gap-1 pb-4">
            <div className="flex items-center justify-center gap-x-1 text-12 leading-18 font-normal text-gray500">
                Powered by
                <span className="font-extrabold text-primary">
                    Laravel Nova
                </span>
                · v4.0.3 (Silver Surfer)
            </div>
            <div className="flex items-center justify-center gap-x-1 text-12 leading-18 font-normal text-gray500">
                © 2022 Laravel LLC · by Taylor Otwell and David Hemphill.
            </div>
        </div>
    );
}
