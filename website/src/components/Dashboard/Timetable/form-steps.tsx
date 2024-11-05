import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { XIcon } from "lucide-react";

export function FormStep0({ timetable, setTimetable, nextStep }: { timetable: Timetable, setTimetable: React.Dispatch<React.SetStateAction<Timetable>>, nextStep: () => Promise<void> }) {

    const [courseInput, setCourseInput] = React.useState<Course>();
    function handleCourseInput() {
        const courseName = courseInput?.courseName?.trim();
        const courseCode = courseInput?.courseCode?.trim();
        if (courseName && courseCode) {
            setTimetable(prev => ({
                ...prev,
                courses: [...prev.courses, { courseName: courseName, courseCode: courseCode }],
            }))
            setCourseInput({ courseName: "", courseCode: "" });
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;
        if (e.target.id == 'courseName' || e.target.id == 'courseCode') {
            if (!name || !value) return;
            setCourseInput(prev => ({
                ...prev,
                [name]: value
            } as Course));
        }
        else {
            setTimetable(prev => ({
                ...prev,
                [name]: value,
            }))
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        nextStep();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="semester" className="block font-medium">
                    Semester
                </Label>
                <Input
                    type="text"
                    id="semester"
                    name="semester"
                    value={timetable.semester}
                    onChange={(e) => { handleChange(e) }}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>

            <div>
                <Label htmlFor="noOfWorkingDays" className="block font-medium">
                    Number of Working Days
                </Label>
                <Input
                    type="number"
                    id="noOfWorkingDays"
                    name="noOfWorkingDays"
                    value={timetable.noOfWorkingDays}
                    onChange={(e) => handleChange(e)}
                    className="mt-1 p-2 border rounded w-full"
                />
            </div>
            <p className="p-0 mt-0">Add courses</p>
            <div className="flex gap-2">
                <div>
                    <Label htmlFor="courseName">Name</Label>
                    <Input name="courseName" id="courseName" onChange={(e) => { handleChange(e) }} value={courseInput?.courseName} />
                </div>
                <div>
                    <Label htmlFor="courseCode">Code</Label>
                    <Input name="courseCode" id="courseCode" onChange={(e) => { handleChange(e) }} value={courseInput?.courseCode} />
                </div>
                <Button type="button" className="mt-6" onClick={() => { handleCourseInput() }}>+</Button>
            </div>
            {timetable.courses.length > 0 && <div className="flex flex-wrap gap-2">
                {timetable.courses.map((course) => {
                    if (course.courseName)
                        return (
                            <div
                                key={course.courseCode}
                                className="bg-secondary rounded-full w-fit px-3 py-1 flex justify-center items-center"
                            >
                                {course.courseName}
                                <Button variant="secondary" className="p-0 h-4" type="button"
                                    onClick={() => {
                                        setTimetable(prev => ({
                                            ...prev,
                                            courses: prev.courses.filter(c => c !== course)
                                        })
                                        );
                                    }}>
                                    <XIcon className="h-4" />
                                </Button>
                            </div>
                        )
                })}
            </div>}
        </form>
    );
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function FormStep({ k }: { k: number }) {
    return (
        <div>
            <h2>{`Enter ${days[k]}'s Timetable`}</h2>
        </div>
    );
}