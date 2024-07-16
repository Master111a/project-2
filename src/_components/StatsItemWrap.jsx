export default function StatsItemWrap({ className, children }) {
    return (
        <div className={`${className} w-full px-6 py-4 h-40 bg-white`}>
            {children}
        </div>
    );
}
