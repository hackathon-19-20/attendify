"use client"
import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress";
import { nanoid } from 'nanoid';
import { XIcon } from "lucide-react"

export default function AddTimetable() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const totalSteps = 5;

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Add Timetable</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Timetable</DialogTitle>
                        <DialogDescription>
                            Use this form to add your timetable information.
                        </DialogDescription>
                    </DialogHeader>
                    <MultiStepForm totalSteps={totalSteps + 1} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="outline">Add Timetable</Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Add Timetable</DrawerTitle>
                    <DrawerDescription>
                        Use this form to add your timetable information.
                    </DrawerDescription>
                </DrawerHeader>
                <MultiStepForm totalSteps={totalSteps + 1} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export function MultiStepForm({ totalSteps }: { totalSteps: number }) {
    const [currentStep, setCurrentStep] = React.useState(0);

    const nextStep = () => {
        if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const renderForm = () => {
        switch (currentStep) {
            case 0:
                return <FormStep k={1} />;
            case 1:
                return <FormStep k={2} />;
            case 2:
                return <FormStep k={3} />;
            case 3:
                return <FormStep k={4} />;
            case 4:
                return <FormStep k={5} />;
            case 5:
                return <FormStep k={6} />;
            case 6:
                return <FormStep k={7} />;
            default:
                return <FormStep k={-1} />;
        }
    };

    const progressBar = () => {
        const dots = [] as React.JSX.Element[]
        for (let i = 0; i < totalSteps; i++) {
            if (currentStep > i)
                dots.push(<span key={i} className="h-3 w-3 rounded-full bg-black"></span>)
            else
                dots.push(<span key={i} className="h-3 w-3 rounded-full bg-primary/30 "></span>)
        }
        return dots;
    }

    return (
        <div className="container mx-auto px-4 md:px-0">
            <div className="h-1 w-full flex justify-between">
                <div></div>
                {progressBar()}
            </div>
            <Progress value={((currentStep) / totalSteps) * 100} className="mb-4 h-1" />

            {renderForm()}
            <span className="h-3 w-3 rounded-full bg-black"></span>
            <div className="flex justify-between mt-4">
                <Button onClick={prevStep} disabled={currentStep === 0}>
                    Previous
                </Button>
                <Button onClick={nextStep} disabled={currentStep === totalSteps + 1}>
                    {currentStep === totalSteps ? "Submit" : "Next"}
                </Button>
            </div>
        </div>
    );
}

interface Timetable {
    semester: number,
    courses: { id: string, name: string }[],
}

function FormStep({ k }: { k: number }) {
    const [timetable, setTimetable] = React.useState<Timetable>({ semester: 1, courses: [] });
    const [courseInput, setCourseInput] = React.useState<string>();

    function handleCourseInput() {
        const course = courseInput?.trim();
        if (course) {
            setTimetable(prev => ({
                ...prev,
                courses: [...prev.courses, { id: nanoid(5), name: course }],
            }))
            setCourseInput("");
        }
    }
    return (
        <form className="flex flex-col gap-4">
            <h2>Form Step {k}</h2>
            <Input placeholder="Semester" />
            <div className="flex gap-2">
                <Input placeholder="Courses" onChange={(e) => { setCourseInput(e.target.value) }} value={courseInput} />
                <Button type="button" onClick={() => { handleCourseInput() }}>+</Button>
            </div>
            {timetable.courses.length > 0 && <div className="flex flex-wrap gap-2">
                {timetable.courses.map((course) => {
                    return (
                        <div
                            key={course.id}
                            className="bg-secondary rounded-full w-fit px-3 py-1 flex justify-center items-center"
                        >
                            {course.name}
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
        </form >
    );
}

// function FormStep1() {
//     return (
//         <div>
//             <h2>Form Step 1</h2>
//             {/* Add your form fields here */}
//         </div>
//     );
// }

// function FormStep2() {
//     return (
//         <div>
//             <h2>Form Step 2</h2>
//             {/* Add your form fields here */}
//         </div>
//     );
// }

// function FormStep3() {
//     return (
//         <div>
//             <h2>Form Step 3</h2>
//             {/* Add your form fields here */}
//         </div>
//     );
// }

