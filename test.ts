
import { expect } from "vitest";
import { EduChain } from "../src/main";

test("Should issue and retrieve credential", async () => {
    const result = await EduChain.issueCredential(
        "aaaaa-aa",
        "Blockchain Fundamentals",
        "Completed basic blockchain training"
    );

    expect(result.Ok).toBeTruthy();

    const list = await EduChain.getCredentials("aaaaa-aa");
    expect(list.length).toBeGreaterThan(0);
});




