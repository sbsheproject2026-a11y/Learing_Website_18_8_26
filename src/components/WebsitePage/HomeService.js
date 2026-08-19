import api from "../api";

export const getWebsiteContent = async (menuId) => {
    const response = await api.get(
        `/website-content/?menu=${menuId}`
    );

    return response.data.results;
};