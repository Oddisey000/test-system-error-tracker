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

export const setXcodeList = (request) => {
  let selectionList = []
  /*axios.get(request).then((response) => {
    if (!selectionList.length) {
      response.data.recordset.map((data, index) => {
        let dataObj = { label: data.XCode, year: index }
        selectionList.push(dataObj);
        return selectionList
      })
    }
  }).catch((error) => {
    // handle error
    console.log(error);
  })*/

  setTimeout(() => {
    let dataObj = { label: 'ABC34', year: 0 }
    selectionList.push(dataObj)
    dataObj = { label: 'ABC36', year: 1 }
    selectionList.push(dataObj)
    dataObj = { label: 'ABC39', year: 2 }
    selectionList.push(dataObj)
  }, 2000);

  return selectionList
};
