export default function filterArrayByDate(array){
  const filtered = Object.values(
    array.reduce((c, e) => {
      if (!c[e.date]) c[e.date] = e;
      return c;
    }, {})
  ); 
  return filtered;   
}