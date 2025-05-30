
import {
    Canister,
    query,
    update,
    text,
    Record,
    Vec,
    StableBTreeMap,
    Principal,
    Result,
    Ok,
    Err
} from 'azle';

const Credential = Record({
    id: text,
    student: Principal,
    issuer: Principal,
    title: text,
    description: text,
    issued_at: text
});

type Credential = typeof Credential.tsType;

let credentials = StableBTreeMap<text, Credential>(0);

export default Canister({
    issueCredential: update([text, text, text], Result(Credential, text), (student, title, description) => {
        const id = `${student}-${Date.now()}`;
        const cred: Credential = {
            id,
            student: Principal.fromText(student),
            issuer: ic.caller(),
            title,
            description,
            issued_at: new Date().toISOString()
        };
        credentials.insert(id, cred);
        return Ok(cred);
    }),

    getCredentials: query([text], Vec(Credential), (student) => {
        return credentials.values().filter(c => c.student.toText() === student);
    }),

    verifyCredential: query([text], Result(Credential, text), (id) => {
        const found = credentials.get(id);
        return found.Some ? Ok(found.Some) : Err("Credential not found");
    })
});


