import { useEffect, useState } from "react";
import { IStudent } from "../types";

const INITIAL_STUDENT = { age: 0, coursesList: [], id: '', isGraduated: false, name: '', absents: 0  };


const validateStudent = (studentForm:IStudent):string[] =>{
    const errors:string[] = [];
    if(! studentForm.name){
        errors.push('Name is required');
    }
    if( studentForm.age == 0){
        errors.push('Age is required');
        
    }
    return errors ;
}


const useAddForm =(onSubmit: (student: IStudent) => void )  => {
    const [studentForm, setStudentForm] = useState<IStudent>(INITIAL_STUDENT);
    const [errors, setErrorsList] = useState<string[]>([]);
    
    
    useEffect(() => {
        console.log("Hello from Add Form component!");
    }, []);
    
    const handleChange = (field: string, value: any) => {
        setStudentForm({ ...studentForm, [field]: value });
    }
    
    const handleSubmit = () => {
        const newStudent: IStudent = { ...studentForm, id: Date.now().toString() };

        const errors = validateStudent(newStudent);
        if (errors.length > 0) {
            setErrorsList(errors);
        } else {
            setErrorsList([]);
            onSubmit(newStudent);
            handleClear();
        }
      }
    
      const handleClear = () => {
        setStudentForm(INITIAL_STUDENT);
      }
    
      const handleCoursesChange = (list: string[]) => {
        setStudentForm({ ...studentForm, coursesList: list });
      }

      return {
        studentForm,
        errors,
        handleChange,
        handleSubmit,
        handleClear,
        handleCoursesChange,
      };

}
export default useAddForm;