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
                            include: [
                                {
                                    model: LessonsContents,
                                    attributes: ['content', 'quiz', 'status'],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        const menu = course.LessonsGroups.map((lessonGroup) => ({
            name: lessonGroup.name,
            icon: lessonGroup.icon,
            subMenu: lessonGroup.Lessons.map((lesson) => ({
                name: lesson.name,
                contents: lesson.LessonsContents, // Add contents to the subMenu object
            })),
        }));

        return menu;
    } catch (error) {
        console.log(error);
    }
};

export default lessonsGroupsMenu;