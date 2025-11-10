const STORAGE = "rooms";

export const getRooms = () => {
    const data = localStorage.getItem(STORAGE);
    if (!data) return [];
    try {
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export const saveRooms = (rooms) => {
    localStorage.setItem(STORAGE, JSON.stringify(rooms))
}