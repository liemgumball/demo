import { Button } from "@/components/ui/button.jsx";
import { requestEditor } from "@/services/auth.js";

const RequestEditor = () => {
  const handleClick = () => requestEditor();
  return <Button onClick={handleClick}>Request</Button>;
};

export default RequestEditor;
