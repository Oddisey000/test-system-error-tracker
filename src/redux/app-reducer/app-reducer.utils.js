import axios from "axios";

export const setHarnessList = (request) => {
  let dataArr = [];
  axios.get(request).then((response) => {
    response.data.recordset.map((data) => {
      dataArr.push(data)
      return dataArr;
    })
  }).catch((error) => {
    // handle error
    console.log(error);
  })
  return dataArr;
}
