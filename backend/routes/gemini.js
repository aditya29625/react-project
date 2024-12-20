const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-8b",
  generationConfig:{
    responseMimeType:"application/json",
  } 
});

async function generate(title,type){
  try{
    const prompt = `
    You are a video script generator. Generate a ${type} video script for a video titled ${title}. Provide the output in the following JSON format:
    {
      "title": "Title of the video",
      "script": "Script of the video",
      "description": "Description of the video",
      "tags": ["tag1", "tag2"]
    }
    Include trending and relevant keywords in the title, description, and tags for better SEO.
  `;
    const result = await model.generateContent(prompt);
    const jsonData = JSON.parse(result.response.text());
    return jsonData;
  }
  catch(err){
    console.log("Error in generating content",err);
    return err;
  }
}

module.exports = generate;