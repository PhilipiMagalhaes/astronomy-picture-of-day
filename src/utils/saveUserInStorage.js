import filterArrayByDate from "./filterArrayByDate";

export default function saveUserInStorage(user){
  user.APODS = filterArrayByDate(user.APODS);
  localStorage.setItem('currentUser',JSON.stringify(user));
  localStorage.setItem(`${user.email}`,JSON.stringify(user));
}