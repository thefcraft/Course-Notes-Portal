// see in the backend/models
export interface User{
    _id: string,
    email: string,
    name: string,
    isVerified: boolean,
    role: 'admin'|'user'|'cr',
    // more if needed
}
// export interface Note{ => changed to Content.model.mjs
//     title: string,
//     content: string,
//     user: User,
//     isDeleted: Boolean,
//     // add more if you want like for timestamp etc...
// };
export interface Content{
    _id: string,
    title: string,
    description: string,
    tags: string[],
    accessType: 'public'|'branch'|'private',
    course: string, // Course._id
    fileUrl: string,
    fileName: string,
    // more if needed
}
export interface Course{
    _id: string,
    courseName: string,
    courseCode: string,
    semester: number,
    notes: string[], // [Content._id, ...]
};