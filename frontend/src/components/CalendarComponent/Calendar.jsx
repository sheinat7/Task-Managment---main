import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths,
} from 'date-fns';
import TaskToDo from '../TaskModal/TaskToDo';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasksSlice';
import './Calendar.module.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true); // פתיחת המודל
  };

  const handleTaskSave = (taskData) => {
    dispatch(addTask(taskData)); // שמירת המשימה
    setIsModalOpen(false); // סגירת המודל
    setSelectedDate(null); // לנקות את התאריך הנבחר
  };

  const renderHeader = () => (
    <div className="header">
      <button onClick={handlePrevMonth}>Previous Month</button>
      <span>{format(currentMonth, 'MMMM yyyy')}</span>
      <button onClick={handleNextMonth}>Next Month</button>
    </div>
  );

  const renderDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <thead>
        <tr>
          {daysOfWeek.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = startOfWeek(addDays(monthEnd, 6));

    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, 'd');
        const cloneDay = day;

        if (!isSameMonth(day, monthStart)) {
          days.push(<td key={day} className="empty-cell"></td>);
        } else {
          days.push(
            <td
              key={day}
              className={`cell ${isSameDay(day, selectedDate) ? 'selected' : ''}`}
              onClick={() => handleDateClick(cloneDay)}
            >
              {formattedDate}
            </td>,
          );
        }
        day = addDays(day, 1);
      }
      rows.push(<tr key={day}>{days}</tr>);
      days = [];
    }

    return <tbody>{rows}</tbody>;
  };

  return (
    <div className="calendar">
      {renderHeader()}
      <table>
        {renderDays()}
        {renderCells()}
      </table>
      {isModalOpen && (
        <TaskToDo
          date={format(selectedDate, 'yyyy-MM-dd')}
          onClose={() => setIsModalOpen(false)}
          onSave={handleTaskSave}
        />
      )}
    </div>
  );
};

export default Calendar;
