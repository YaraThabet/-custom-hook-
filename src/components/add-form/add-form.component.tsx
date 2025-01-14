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

  
  const { studentForm, errors, handleChange, handleSubmit, handleClear, handleCoursesChange } = useAddForm(props.onSubmit);


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
          value={studentForm.name}
          onChange={e => handleChange('name', e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="age">Student Age: </label>
        <input
          id="age"
          type="number"
          min={17}
          max={40}
          value={studentForm.age}
          onChange={e => handleChange('age', e.target.value)}
        />
      </div>
      <div className="input">
        <label htmlFor="isGraduated">Is Student Graduated: </label>
        <input
          id="isGraduated"
          type="checkbox"
          checked={studentForm.isGraduated}
          onChange={e => handleChange('isGraduated', e.target.checked)}
        />
      </div>
      <div>
        <CoursesListForm value={studentForm.coursesList} onSubmit={handleCoursesChange} />
      </div>
      <div className="Actions">
        <button
          onClick={handleSubmit}
          style={{ color: errors.length ? 'red' : 'initial' }}
        // disabled={errorsList.length > 0}
        >
          Submit
        </button>
        <button onClick={handleClear}>Clear</button>
      </div>
      {
        Boolean(errors.length) && (
          <div className='report'>
            <h4>You have the following error/s:</h4>
            {
              errors.map(error => <p key={error}>- {error}</p>)
            }
          </div>
        )
      }
    </div>
  )
};

export default AddForm;