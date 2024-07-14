import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals';

// دالة لتقرير قياس الأداء
function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    getCLS(onPerfEntry);
    getFID(onPerfEntry);
    getLCP(onPerfEntry);
    getFCP(onPerfEntry);
    getTTFB(onPerfEntry);
  }
}

export default reportWebVitals;
