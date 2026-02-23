import PocketBase from "pocketbase";
const pb = new PocketBase("http://127.0.0.1:8090");

export async function getEvents() {
    let evenements = await pb.collection("evenements").getFullList();      
    return evenements;
}

export async function getEventById(eventId) {
    try {
        let evenements = await pb.collection("evenements").getOne(eventId);
        return evenements;
    } catch(error) {
        console.error("Error fetching event by ID:", error);
        return null;
    }
}

export async function setFavori(eventId, favori) {
    try {
        const updatedEvent = await pb.collection("evenements").update(eventId, { favori })
        return updatedEvent;
    } catch (error) {
        console.log("Error updating favori status", error);
        return null;
    }
}

export async function getImageUrl(record, imageField) {
    return pb.files.getURL(record, record[imageField]);
}

export async function addEvent(data) {
    try {
        await pb.collection("evenements").create(data);
        return {
            success: true,
            message: "L'événement a été ajouté avec succès.",
        };
    } catch (error) {
        return {
            success: false,
            message: "Une erreur est survenue lors de l'ajout de l'événement : " + error,
        };
    }
}
