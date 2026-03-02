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

export async function getArtistes() {
    let artistes = await pb.collection("artiste").getFullList({ expand: "evenements" });  
    return artistes;
}

export async function getArtisteById(artisteId) {
    try {
        let artiste = await pb.collection("artiste").getOne(artisteId);
        return artiste;
    } catch(error) {
        console.error("Error fetching artist by ID:", error);
        return null;
    }
}

export async function getOneEvent(id) {
    try {
        const event = await pb.collection("events").getOne(id);
        event.img = pb.files.getURL(event, event.imgUrl);
        event.formattedDate = formatDate(event.date);
        return event;
    } catch (error) {
        return null;
    }
}

export async function updateEvent(id, data) {
    try {
        const event = await pb.collection("events").update(id, data);
        return {
            success: true,
            event: event,
            message: "L'événement a été modifié avec succès.",
        };
    } catch (error) {
        return {
            success: false,
            event: null,
            message: "Une erreur est survenue lors de la modification de l'événement: " + error,
        };
    }
}

export async function allArtists() {
    try {
        let artists = await pb.collection("artists").getFullList();
        return artists
    } catch (error) {
        console.error("error allArtists: ", error);
        return null;
    }
}