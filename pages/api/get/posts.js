const mediumToMarkdown = require("medium-to-markdown");
export default function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    mediumToMarkdown
      .convertFromUrl(data.url)
      .then((markdown) => {
        res.status(200).json({ message:  markdown})
      });
    
  }
}
