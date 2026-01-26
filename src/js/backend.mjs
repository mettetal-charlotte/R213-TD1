import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function getEvents() {
    let evenements = await pb.collection("evenements").getFullList();      
    return evenements;
}

export async function getImageUrl(record, imageField) {
    return pb.files.getURL(record, record[imageField]);
}
