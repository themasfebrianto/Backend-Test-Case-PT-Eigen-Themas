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
                            model: Lessons,
                        },
                    ],
                },
            ],
        });

        const menu = course.LessonsGroups.map((lessonGroup) => ({
            name: lessonGroup.name,
            icon: lessonGroup.icon, // assuming you have an 'icon' attribute on the LessonsGroups model
            subMenu: lessonGroup.Lessons.map((lesson) => ({
                name: lesson.name,
            })),
        }));

        return menu;
    } catch (error) {
        // handle error
        console.log(error);
    }
};

export default lessonsGroupsMenu;