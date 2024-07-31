import React from 'react';
import { MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';
import '../assets/styles/AppBar.css'; // قم بإنشاء هذا الملف لوضع التنسيقات

/**
 * AppBar Component
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Title to be displayed in the AppBar
 * @param {string} props.backLink - URL to navigate to when back button is clicked
 * @returns {JSX.Element} The rendered AppBar component
 * 
 * @example
 * // Usage example
 * import React from 'react';
 * import { BrowserRouter as Router, Route } from 'react-router-dom';
 * import AppBar from './AppBar';
 * 
 * const App = () => {
 *   return (
 *     <Router>
 *       <Route exact path="/">
 *         <AppBar title="هذا هو عنوان طويل جدًا ولا أريده أن يقطع..." backLink="/back" />
 *         <p>محتوى الصفحة هنا...</p>
 *       </Route>
 *       <Route path="/back">
 *         <p>الرجوع إلى الصفحة السابقة...</p>
 *       </Route>
 *     </Router>
 *   );
 * };
 * 
 * export default App;
 */
const AppBar = ({ title, backLink }) => {
    if (typeof title !== 'string') {
        console.error('Invalid prop: "title" must be a string.');
    }
    if (typeof backLink !== 'string') {
        console.error('Invalid prop: "backLink" must be a string.');
    }

    return (
        <div className="app-bar">
            <Link
                to={backLink}
                title="back-button"
                aria-label="back-button"
                onMouseDown={(e) => e.preventDefault()}
                draggable="false"
                className="back-button"
            >
                <MdArrowForward size={24} />
            </Link>
            <div
                title={title}
                aria-label={title}
                className="title"
            >
                <h1>{title}</h1>
            </div>
        </div>
    );
};

export default AppBar;
