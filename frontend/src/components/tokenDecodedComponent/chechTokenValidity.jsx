import { jwtDecode } from 'jwt-decode'; // ייבוא נכון של jwtDecode

const checkTokenValidity = (navigate) => {
  const token = localStorage.getItem('authToken');

  if (token) {
    try {
      const decoded = jwtDecode(token); // שימוש בפונקציה jwtDecode
      const currentTime = Date.now() / 1000; // הזמן הנוכחי בשניות

      if (decoded.exp < currentTime) {
        // הטוקן פג תוקף
        console.log('Token expired');
        localStorage.removeItem('authToken'); // מחיקת הטוקן
        navigate('/'); // ניתוב לדף הראשי או לדף ההתחברות
        return false; // החזר false כי הטוקן לא תקף
      } else {
        // הטוקן תקף
        console.log('Token is valid');
        return true; // החזר true כי הטוקן תקף
      }
    } catch (error) {
      console.error('Invalid token', error);
      localStorage.removeItem('authToken');
      navigate('/'); // ניתוב לדף הראשי במקרה של טוקן לא תקין
      return false; // החזר false כי הטוקן לא תקף
    }
  } else {
    // אין טוקן, ניתוב לדף הראשי
    navigate('/');
    return false; // החזר false כי אין טוקן
  }
};

export default checkTokenValidity;
