import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, Loader } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  createButton,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { ToastContainer, toast } from "react-toastify";
import { AiChatSession } from "../../../../service/AiModel";

// const PROMPT =
//   "position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give me result in HTML tags only";

const PROMPT = `
Please provide the job experience details for my {positionTitle} position for my resume in JSON format and in 5-7 bullet points max. Ensure that the "experience" field contains an array of HTML list items (\`<li>...</li>\`), like this:

{
  "position_title": {positionTitle},
  "experience": [
    "<li>Designed, developed, and maintained complex Java applications using Spring Boot, Spring MVC, and other related frameworks.</li>",
    "<li>Led the development of microservices architecture and implemented RESTful APIs for seamless integration with other systems.</li>",
    "<li>Collaborated with cross-functional teams, including product managers, designers, and QA, to ensure project success.</li>",
    "<li>Proficient in relational databases (e.g., MySQL, PostgreSQL) and NoSQL databases (e.g., MongoDB).</li>",
    "<li>Experience with continuous integration and continuous delivery (CI/CD) pipelines using tools like Jenkins and GitLab.</li>",
    "<li>Strong understanding of design patterns, object-oriented programming principles, and software engineering best practices.</li>",
    "<li>Successfully delivered high-quality software solutions on time and within budget.</li>"
  ]
}
`;
function ReachTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummeryFromAI = async () => {
    const hasResumeInfo =
      resumeInfo && resumeInfo.experience && resumeInfo.experience[index];
    const hasTitle = hasResumeInfo && resumeInfo.experience[index].title;

    if (!hasTitle) {
      toast.error("Please enter the position title first");
      return;
    }

    setLoading(true);
    const prompt = PROMPT.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    console.log(prompt);
    // .................................................Start of the code (Extracting result Methode 1  )...............................................
    // try {
    //   const result = await AiChatSession.sendMessage(prompt);
    //   const resp = await result.response.text();
    //   console.log(resp);
    //   const cleanedResp = resp
    //     .replace("[", "")
    //     .replace('","', "<br>")
    //     .replace("]", "");
    //   setValue(cleanedResp);
    //   setLoading(false);

    //   onRichTextEditorChange({
    //     target: {
    //       value: cleanedResp,
    //     },
    //   });
    // }
    // .................................................End of the code (Extracting result Methode 1  )...............................................
    try {
      const result = await AiChatSession.sendMessage(prompt);
      const resp = await result.response.text();
      console.log(resp);

      // Parse the JSON response
      const parsedResp = JSON.parse(resp);
      console.log(parsedResp);

      // Extract the experience array
      const experienceArray = parsedResp.experience;

      // Join the experience array elements with line breaks
      const cleanedResp = experienceArray.join("<br>");

      setValue(cleanedResp);
      setLoading(false);

      onRichTextEditorChange({
        target: {
          value: cleanedResp,
        },
      });
    } catch (error) {
      console.error("Error while fetching data from AI", error);
      toast.error("Error while fetching data from AI");
      setLoading(false);
    }
  };

  const BtnAlignCenter = createButton("Align center", "≡", "justifyCenter");
  return (
    <div>
      <ToastContainer />
      <div className="flex justify-between my-2">
        <label htmlFor="" className="text-sm">
          Summary
        </label>
        <Button onClick={GenerateSummeryFromAI}>
          {loading ? (
            <Loader size={24} className="mx-2 animate-spin" />
          ) : (
            <>
              {" "}
              <Brain size={24} className="mx-2" />
              Generate from AI{" "}
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default ReachTextEditor;
