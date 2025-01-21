import { useEffect, useState } from 'react';
import './add-form.css';
import { IStudent } from '../../types';
import CoursesListForm from '../courses-list-form/courses-list-form.component';
import { validateStudent } from '../../utils/validation.ts';
import useAddForm from '../../hooks/add-form.hook.ts';

const INITIAL_STUDENT = { age: 0, coursesList: [], id: '', isGraduated: false, name: '', absents: 0 };

interface IProps {
  className?: string;
  onSubmit: (std: IStudent) => void;
}

const AddForm = (props: IProps) => {

  const [isOpen, setIsOpen] = useState(false);

  // const allStudent = { studentForm, errors, handleChange, handleSubmit, handleClear, handleCoursesChange } ;
  const allStudent  = useAddForm( props.onSubmit);


  return (
    <div className={`wrapper ${props.className} ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <span>&and; Close </span> : <span>&or; Open </span>}
        Add Form
      </button>
      <div className="input">
        <label htmlFor="name">Student Name: </label>
        <input
          id="name"
          type="text"
          value={allStudent.studentForm.name}
          onChange={e =>allStudent.handleChange('name', e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="age">Student Age: </label>
        <input
          id="age"
          type="number"
          min={17}
          max={40}
          value={allStudent.studentForm.age}
          onChange={e => allStudent.handleChange('age', e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="isGraduated">Is Student Graduated: </label>
        <input
          id="isGraduated"
          type="checkbox"
          checked={allStudent.studentForm.isGraduated}
          onChange={e => allStudent.handleChange('isGraduated', e.target.checked)}
        />
      </div>
      <div>
        <CoursesListForm value={allStudent.studentForm.coursesList} onSubmit={allStudent.handleCoursesChange} />
      </div>
      <div className="Actions">
        <button
          onClick={allStudent.handleSubmit}
          style={{ color: allStudent.errors.length ? 'red' : 'initial' }}
        // disabled={errorsList.length > 0}
        >
          Submit
        </button>
        <button onClick={allStudent.handleClear}>Clear</button>
      </div>
      {
        Boolean(allStudent.errors.length) && (
          <div className='report'>
            <h4>You have the following error/s:</h4>
            {
              allStudent.errors.map(error => <p key={error}>- {error}</p>)
            }
          </div>
        )
      }
    </div>
  )
};

export default AddForm;