
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as eduFactory } from "../../.dfx/local/canisters/educhain_backend";

const agent = new HttpAgent();
const EduChain = Actor.createActor(eduFactory, {
    agent,
    canisterId: "rrkah-fqaaa-aaaaa-aaaaq-cai" // Replace with your real canister ID
});

async function issueCredential() {
    const student = (document.getElementById("student") as HTMLInputElement).value;
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const desc = (document.getElementById("description") as HTMLInputElement).value;
    const result = await EduChain.issueCredential(student, title, desc);
    alert(JSON.stringify(result));
}

async function getCredentials() {
    const student = (document.getElementById("student") as HTMLInputElement).value;
    const creds = await EduChain.getCredentials(student);
    document.getElementById("output").innerText = JSON.stringify(creds, null, 2);
}

document.body.innerHTML += `
    <h2>EduChain - Issue and Verify Micro-Credentials</h2>
    <input id="student" placeholder="Student Principal ID" /><br/>
    <input id="title" placeholder="Credential Title" /><br/>
    <input id="description" placeholder="Description" /><br/>
    <button onclick="issueCredential()">Issue Credential</button>
    <button onclick="getCredentials()">Get Credentials</button>
    <pre id="output"></pre>
`;

(window as any).issueCredential = issueCredential;
(window as any).getCredentials = getCredentials;


