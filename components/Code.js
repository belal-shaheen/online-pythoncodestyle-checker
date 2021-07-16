import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/snippets/python";
import "ace-builds/src-noconflict/snippets/java";
import "ace-builds/src-noconflict/theme-xcode";

export default function Code({ setCode }) {
  const onChange = (c) => {
    setCode(c);
  };

  return (
    <div>
      <AceEditor
        mode="python"
        theme="xcode"
        name="python"
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        enableSnippets={true}
        onChange={onChange}
        height="70vh"
      />
    </div>
  );
}
