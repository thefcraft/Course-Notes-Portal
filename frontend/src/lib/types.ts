// see in the backend/models
export interface User{
    _id: string,
    email: string,
    name: string,
    isVerified: boolean,
    role: 'admin'|'user'|'cr',
    branch: 'AI'|'CB'|'CE'|'CH'|'CM'|'CS'|'CT'|'EC'|'EE'|'ES'|'GT'|'HS'|'MA'|'MC'|'ME'|'MM'|'MT'|'PC'|'PH'|'PR'|'ST'|'VL',
    semester: number,
    enrolledCourses: string[], // [Course._id, ...]
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
    
    uploadedAt: string, // eg: "2024-12-25T09:02:30.955Z"
    createdAt: string, // eg: "2024-12-25T09:02:30.956Z"
    updatedAt: string, // eg: "2024-12-25T09:02:30.982Z"
}
export interface Course{
    _id: string,
    courseName: string,
    courseCode: string,
    branch: ('AI'|'CB'|'CE'|'CH'|'CM'|'CS'|'CT'|'EC'|'EE'|'ES'|'GT'|'HS'|'MA'|'MC'|'ME'|'MM'|'MT'|'PC'|'PH'|'PR'|'ST'|'VL')[],
    semester: number,
    notes: string[], // [Content._id, ...]
};