import { handleAsync } from '../../../../helpers/helpers.js';
import lessonsGroupsMenu from '../services/services.js';

export const getLessonsGroupsMenu = handleAsync(async (req, res) => {
    const { lessonsGroups } = req.params;
    const menuData = await lessonsGroupsMenu(lessonsGroups);
    return res.json(menuData);
});