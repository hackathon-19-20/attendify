"use client"
import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"
import { collection, doc, getDoc,updateDoc, setDoc, addDoc, arrayUnion } from 'firebase/firestore';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../../firebaseConfig";
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
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress";
import { Label } from "recharts"
import { Input, Typography } from "@mui/material"
import { Grid } from "lucide-react"
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
    const [submittedData, setSubmittedData] = React.useState<any>(null);
    
    const [courseName, setCourseName] = React.useState("")
    const [classroom, setClassroom] = React.useState("")
    const [startTime, setStartTime] = React.useState("")
    const [endTime, setEndTime] = React.useState("")
    const [daysOfWeek, setDaysOfWeek] = React.useState("")
    
    const [user] = useAuthState(auth); 
    if (!user) {
        console.error("User is not authenticated. Redirecting to login...");
        return;
    }
    const nextStep = () => {
        if (currentStep < totalSteps ) {
            setCurrentStep(currentStep + 1);
        } 
        else {
            handleSubmit();  
        }
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleSubmit = async() => {
        
        const timetableEntry = {
            // userid: user.uid,
            courseName,
            classroom,
            startTime,
            endTime,
            daysOfWeek
        };
        try {
            const userDocRef = doc(db, "timetable", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                
                await updateDoc(userDocRef, {
                    timetableEntries: arrayUnion(timetableEntry),
                });
                console.log("Timetable entry added to existing user document.");
            } else {
                
                await setDoc(userDocRef, {
                    timetableEntries: [timetableEntry],
                    userId: user.uid,
                });
                console.log("New user document created with timetable entry.");
            }

            setSubmittedData(timetableEntry);
            resetForm();
            alert("Timetable entry successfully submitted!");
        } catch (error) {
            console.error("Error writing document: ", error);
            alert("There was an error submitting the timetable. Please try again.");
        }
    };

    const resetForm = () => {
        setCourseName("");
        setClassroom("");
        setStartTime("");
        setEndTime("");
        setDaysOfWeek("");
        setCurrentStep(0);
    };

    const renderForm = () => {
        switch (currentStep) {
            case 0:
                return <FormStep k={1} title="Course Name"  placeholder="Enter course name" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
            case 1:
                return <FormStep k={2} title="Classroom" placeholder="Enter classroom" value={classroom}  onChange={(e) => setClassroom(e.target.value)}/>
            case 2:
                return <FormStep k={3} title="Start Time" placeholder="Enter start time" type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)}/>
            case 3:
                return <FormStep k={4} title="End Time" placeholder="Enter end time" type="time"  value={endTime} onChange={(e) => setEndTime(e.target.value)}/>
            case 4:
                return <FormStep k={5} title="Days of the Week"  placeholder="Enter days (e.g., Mon, Wed)" value={daysOfWeek} onChange={(e) => setDaysOfWeek(e.target.value)} />
            default:
                return <div>Review and Submit</div>
        }
    }

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


function FormStep({ k, title, placeholder, type = "text", value, onChange }: { k: number, title: string, placeholder: string, type?: string, value:string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <h2>Form Step {k}</h2>
            <Label>{title}</Label>
            <Input type={type} placeholder={placeholder} value = {value} className="mt-2" onChange={onChange} />
            
        </div>
    )
}



// interface Timetable {
//     semester: number,
//     courses: { id: string, name: string }[],
// }

// function FormStep({ k }: { k: number }) {
//     const [timetable, setTimetable] = React.useState<Timetable>({ semester: 1, courses: [] });
//     const [courseInput, setCourseInput] = React.useState<string>();

//     function handleCourseInput() {
//         const course = courseInput?.trim();
//         if (course) {
//             setTimetable(prev => ({
//                 ...prev,
//                 courses: [...prev.courses, { id: nanoid(5), name: course }],
//             }))
//             setCourseInput("");
//         }
//     }
//     return (
//         <form className="flex flex-col gap-4">
//             <h2>Form Step {k}</h2>
//             <Input placeholder="Semester" />
//             <div className="flex gap-2">
//                 <Input placeholder="Courses" onChange={(e) => { setCourseInput(e.target.value) }} value={courseInput} />
//                 <Button type="button" onClick={() => { handleCourseInput() }}>+</Button>
//             </div>
//             {timetable.courses.length > 0 && <div className="flex flex-wrap gap-2">
//                 {timetable.courses.map((course) => {
//                     return (
//                         <div
//                             key={course.id}
//                             className="bg-secondary rounded-full w-fit px-3 py-1 flex justify-center items-center"
//                         >
//                             {course.name}
//                             <Button variant="secondary" className="p-0 h-4" type="button" 
//                                 onClick={() => { 
//                                     setTimetable(prev => ({ 
//                                         ...prev, 
//                                         courses: prev.courses.filter(c => c !== course) 
//                                         })
//                                     ); 
//                                 }}>
//                                 <XIcon className="h-4" />
//                             </Button>
//                         </div>
//                     )
//                 })}
//             </div>}
//         </form >
//     );
// }

