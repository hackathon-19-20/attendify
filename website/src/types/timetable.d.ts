interface Timetable {
    id: string;
    semester: string;
    courses: Course[];
    noOfWorkingDays: number
}

interface Course {
    courseName: string;
    courseCode: string;
    instructor?: string;
    timings?: Timings[];
}

interface Timings{
    day: string;
    startTime: string;
    endTime: string;
    classroom: string;
}