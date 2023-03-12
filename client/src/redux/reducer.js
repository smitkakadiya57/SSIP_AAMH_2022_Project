
  
export const userData=(data={},action)=>{
    switch (action.type) {
        case "SET_USER":
          return action.obj;

        default:
          // no case matched
          return data;
      }
}


  
export const adminData=(data={},action)=>{
  switch (action.type) {
      case "SET_ADMIN":
        return action.obj;

      default:
        // no case matched
        return data;
    }
}
  
export const formData=(data={},action)=>{
  switch (action.type) {
      case "SET_FORM":
        return action.obj;

      default:
        // no case matched
        return data;
    }
}


