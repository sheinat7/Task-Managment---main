import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import classes from './content.module.css';
import Section from '../../components/sectionComponent/Section';
import AboutUs from '../../components/aboutUsComponent/AboutUs';
import Welcome from '../../components/welcomeComponent/Welcome';
import Login from '../loginPage/Login';
import ProfilePage from '../profilePage/ProfilePage';
import Registration from '../registrationPage/Registration';
import Calendar from '../../components/CalendarComponent/Calendar'; // ייבוא קומפוננטת לוח שנה
import checkTokenValidity from '../../components/tokenDecodedComponent/chechTokenValidity';

const Content = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken'); // קבל את הטוקן ישירות

  useEffect(() => {
    const isValidToken = checkTokenValidity(navigate); // בדוק אם הטוקן תקף
    if (!isValidToken) {
      // כאן אין צורך ב-setToken, הפונקציה כבר מנהלת את הניווט
    }
  }, [navigate]);

  // הפונקציה כדי לקבוע מה להציג בצד שמאל
  const renderLeftSection = () => {
    if (token) {
      return <Calendar />; // הצג את לוח השנה אם יש טוקן
    }
    if (location.pathname === '/register') {
      return <Welcome />; // הצג את ברוכים הבאים אם הכתובת היא /register
    }
    return <AboutUs />; // הצג את 'מי אנחנו' אם אין טוקן
  };

  // הפונקציה כדי לקבוע מה להציג בצד ימין
  const renderRightSection = () => {
    if (token && location.pathname === '/') {
      return <ProfilePage />; // הצג את הפרופיל בדף הראשי אם יש טוקן
    }

    if (token) {
      return <Outlet />; // הצג את התוכן של ה-Outlets אם יש טוקן
    }

    // בדוק אם הכתובת היא עבור טבלת הרישום
    if (location.pathname === '/register') {
      return <Registration />; // הצג את טבלת ההרשמה אם הכתובת היא /register
    }

    return <Login />; // אחרת, הצג את קומפוננטת הכניסה
  };

  return (
    <article className={classes.contentLayout}>
      {/* תוכן שמאל - משתמש בקומפוננטה הנכונה על פי הכתובת */}
      <Section className={classes.leftSection}>{renderLeftSection()}</Section>

      {/* Outlet פנימי - בצד ימין */}
      <Section className={classes.rightSection}>{renderRightSection()}</Section>
    </article>
  );
};

export default Content;
