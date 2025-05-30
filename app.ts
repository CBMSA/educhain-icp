
import { educhain_backend } from "../../declarations/educhain_backend";

const output = document.getElementById("output")!;

(window as any).addCredential = async () => {
  const studentId = (document.getElementById("studentId") as HTMLInputElement).value;
  const credential = (document.getElementById("credential") as HTMLInputElement).value;

  if (!studentId || !credential) {
    output.innerText = "Please enter both fields.";
    return;
  }

  await educhain_backend.addCredential(studentId, credential);
  output.innerText = `✅ Credential added for student ID: ${studentId}`;
};

(window as any).getCredential = async () => {
  const studentId = (document.getElementById("studentId") as HTMLInputElement).value;

  if (!studentId) {
    output.innerText = "Please enter a Student ID.";
    return;
  }

  const credential = await educhain_backend.getCredential(studentId);
  output.innerText = credential
    ? `🎓 Credential for ${studentId}: ${credential}`
    : `⚠️ No credential found for ID: ${studentId}`;
};
