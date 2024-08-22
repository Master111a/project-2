export default function LoaderForm() {
    return (
        <div>
            <div
                style={{
                    width: "100%",
                    height: 0,
                    paddingBottom: "100%",
                    position: "relative",
                }}>
                <iframe
                    src="https://giphy.com/embed/xTk9ZvMnbIiIew7IpW"
                    width="100%"
                    height="100%"
                    style={{ position: "absolute" }}
                    frameBorder={0}
                    className="giphy-embed"
                    allowFullScreen
                />
            </div>
            <p>
                <a href="https://giphy.com/gifs/loop-loading-loader-xTk9ZvMnbIiIew7IpW">
                    via GIPHY
                </a>
            </p>
        </div>
    );
}
