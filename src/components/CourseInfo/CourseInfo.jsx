// This component shows information about the current chosen course.

// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#course-info

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../common/Button';
import Input from '../../common/Input';
import styles from './styles.module.css';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import AuthorItem from './components/AuthorItem/AuthorItem';

const CourseForm = () => {
  const navigate = useNavigate();

  // Стани форми
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [allAuthors, setAllAuthors] = useState(mockedAuthorsList);
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [newAuthorName, setNewAuthorName] = useState('');

  // Стани помилок
  const [errors, setErrors] = useState({ title: '', description: '', duration: '', authors: '' });

  const validate = () => {
    const newErrors = {};
    if (!title.trim() || title.trim().length < 2) newErrors.title = 'Title is required (min 2 chars)';
    if (!description.trim() || description.trim().length < 2) newErrors.description = 'Description is required (min 2 chars)';
    if (!duration.trim() || isNaN(duration) || Number(duration) <= 0) newErrors.duration = 'Duration must be a number > 0';
    if (!courseAuthors.length) newErrors.authors = 'At least one author must be added';
    return newErrors;
  };

  const handleAddAuthor = (author) => {
    setAllAuthors(allAuthors.filter((a) => a.id !== author.id));
    setCourseAuthors([...courseAuthors, author]);
  };
  
  const handleRemoveAuthor = (author) => {
    setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
    setAllAuthors([...allAuthors, author]);
  };
  
  const handleCreateAuthor = () => {
    if (newAuthorName.trim().length < 2) {
      alert('Author name must be at least 2 chars long');
      return;
    }
    const newAuthor = {
      id: String(Date.now()),
      name: newAuthorName.trim(),
    };
    setAllAuthors([...allAuthors, newAuthor]);
    setNewAuthorName('');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
  
    const newCourse = {
      id: String(Date.now()),
      title,
      description,
      creationDate: new Date().toLocaleDateString('en-GB'),
      duration: Number(duration),
      authors: courseAuthors.map((a) => a.id),
    };
  
    mockedCoursesList.push(newCourse);
    navigate('/courses');
  };
  
  return (
    <div className={styles.courseForm}>
      <h2>Create a New Course</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            labelText="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <div className={styles.error}>{errors.title}</div>}
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <div className={styles.error}>{errors.description}</div>}
        </div>
        <div>
          <Input
            labelText="Duration (minutes)"
            value={duration}
            onChange={(e) => {
              if (!isNaN(Number(e.target.value))) {
                setDuration(e.target.value);
              }
            }}
          />
          {errors.duration && <div className={styles.error}>{errors.duration}</div>}
        </div>
        <div>
          <Input
            labelText="New Author Name"
            value={newAuthorName}
            onChange={(e) => setNewAuthorName(e.target.value)}
          />
          <Button text="Create Author" onClick={handleCreateAuthor} />
        </div>
        <div className={styles.authors}>
          <div>
            <h3>Available Authors</h3>
            {allAuthors.map((a) => (
              <AuthorItem
                key={a.id}
                author={a}
                onButtonClick={() => handleAddAuthor(a)}
                buttonLabel="Add"
              />
            ))}
          </div>
          <div>
            <h3>Course Authors</h3>
            {courseAuthors.length ? (
              courseAuthors.map((a) => (
                <AuthorItem
                  key={a.id}
                  author={a}
                  onButtonClick={() => handleRemoveAuthor(a)}
                  buttonLabel="Remove"
                />
              ))
            ) : (
              <div>No authors added</div>
            )}
            {errors.authors && <div className={styles.error}>{errors.authors}</div>}
          </div>
        </div>
        <Button text="Create Course" />
      </form>
    </div>
  );
};

export default CourseForm;
