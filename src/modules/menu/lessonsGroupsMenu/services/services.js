import Courses from '../../../master/courses/models/model.js';
import LessonsGroups from '../../../master/lessonsGroups/models/model.js';
import Lessons from '../../../master/lessons/models/model.js';
import LessonsContents from '../../../master/lessonsContents/models/model.js';

const lessonsGroupsMenu = async (courseName) => {
    try {
        const course = await Courses.findOne({
            where: { name: courseName },
            include: [
                {
                    model: LessonsGroups,
                    include: [
                        {
                            model: Lessons
                        },
                    ],
                },
            ],
        });

        const menu = course.LessonsGroups.map((lessonGroup) => ({
            id: lessonGroup.id,
            name: lessonGroup.name,
            status: lessonGroup.status,
            subMenu: lessonGroup.Lessons.map((lesson) => ({
                id: lesson.id,
                name: lesson.name,
                status: lesson.status,
            })),
        }));

        return menu;
    } catch (error) {
        console.log(error);
    }
};

export default lessonsGroupsMenu;