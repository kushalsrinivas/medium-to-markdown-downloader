import { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { saveAs } from "file-saver";
import { HashLoader } from "react-spinners";
import path from "path";
export default function Home() {
  const [url, setUrl] = useState("");
  const [md, setMD] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    if (url.trim() !== "") {
      setLoading(true);
      fetch("api/get/posts", {
        method: "POST",
        body: JSON.stringify({ url: url }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMD(data.message);
          setLoading(false);
        });
    }
  };
  const download = () => {
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });

    saveAs(blob, "example.md");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full ">
      <div className="w-3/4 m-auto h-auto">
        <label className="p-8 text-white text-2xl flex items-center justify-center">
          <h1 className="text-2xl ">Paste the medium post url here</h1>
        </label>

        <input
          className="p-4 rounded-md text-white bg-slate-900 w-3/4"
          type="text"
          placeholder="enter medium link over here"
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        {!md & !loading ? (
          <button
            onClick={handleSubmit}
            className="btn p-4 bg-slate-700 hover:bg-slate-800 text-white m-2 rounded-md"
          >
            {loading ? "loading...." : "Generate for free"}
          </button>
        ) : (
          <button
            className="btn p-4 bg-green-500 text-white m-2 rounded-md "
            onClick={download}
          >
            download
          </button>
        )}
      </div>
    </div>
  );
}
