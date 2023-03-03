// import Courses from '../modules/master/courses/models/model.js';
// import LessonsGroups from '../modules/master/lessonsGroups/models/model.js';
// import Lessons from '../modules/master/lessons/models/model.js';
// import LessonsContents from '../modules/master/lessonsContents/models/model.js';

// // Define the associations between the models
// export const defineAssociations = () => {
//     Courses.hasMany(LessonsGroups);
//     LessonsGroups.belongsTo(Courses);

//     LessonsGroups.hasMany(Lessons);
//     Lessons.belongsTo(LessonsGroups);

//     Lessons.hasMany(LessonsContents);
//     LessonsContents.belongsTo(Lessons);
// };