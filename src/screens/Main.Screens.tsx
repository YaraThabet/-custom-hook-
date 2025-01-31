import { useEffect, useRef, useState } from "react";
import AddForm from "../components/add-form/add-form.component";
import Student from "../components/student/student.component";
import { IStudent } from "../types";
import useLocalStorage from "../hooks/local-storage.hook";




const Main =() =>{
     const [studentsList, setStudentsList] = useState<IStudent[]>([]);
      const [totalAbsents, setTotalAbsents] = useState(0);
      const [ currentPage , setCurrentPage] = useState('main');
      const lastStdRef = useRef<HTMLDivElement>(null);
    
      const { storedData } = useLocalStorage(studentsList, 'students-list');
    
      useEffect(() => {
        const stdList: IStudent[] = storedData || [];
        const totalAbs = stdList.reduce((prev, cur) => { return prev + cur.absents }, 0);
        setTotalAbsents(totalAbs);
        setStudentsList(stdList);
      }, [storedData]);
    

      const removeFirst = () => {
        const newList = [...studentsList];
        newList.shift();  // removes the first item
        setStudentsList(newList);
      }
    
      const handleAbsentChange = (id: string, change: number) => {
        setTotalAbsents(totalAbsents + change);
        setStudentsList(studentsList.map(std => std.id === id ? { ...std, absents: std.absents + change } : std));
      }
    
      const handleAddStudent = (newStudent: IStudent) => {
        setStudentsList([newStudent, ...studentsList]);
      }
    
      const scrollToLast = () => {
        if (lastStdRef.current) {
          lastStdRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }

    return(
        <>
        <AddForm className="addForm" onSubmit={handleAddStudent} />
        <div className='stats'>
          <button onClick={removeFirst}>POP Student</button>
          <button onClick={scrollToLast}>Scroll to Last</button>
          <b style={{ fontSize: '12px', fontWeight: 100, color: 'gray' }}>Total Absents {totalAbsents}</b>
        </div>
        {
          studentsList.map(student => (
            <Student
            key={student.id}
            id={student.id}
            name={student.name}
            age={student.age}
            absents={student.absents}
            isGraduated={student.isGraduated}
            coursesList={student.coursesList}
            onAbsentChange={handleAbsentChange}
            />
          )
        )
      }
        <div ref={lastStdRef}></div>
      </>

    )
    
}
export default Main;

 
