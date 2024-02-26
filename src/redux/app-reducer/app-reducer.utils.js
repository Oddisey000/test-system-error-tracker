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
  axios.get(request).then((response) => {
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
  })

  return selectionList
};

export const setWireList = (request) => {
  let selectionList = []
  axios.get(request).then((response) => {
    if (!selectionList.length) {
      response.data.recordset.map((data, index) => {
        let dataObj = { label: data.wire_name.replace(/\s+/g, ''), wire: index }
        selectionList.push(dataObj);
        return selectionList
      })
    }
  }).catch((error) => {
    // handle error
    console.log(error);
  })

  return selectionList
};

export const setErrorList = (request) => {
  let selectionList = []
  axios.get(request).then((response) => {
    if (!selectionList.length) {
      response.data.recordset.map((data) => {
        let dataObj = { label: data.ErrorDesc, ErrorType: data.ErrorType }
        selectionList.push(dataObj);
        return selectionList
      })
    }
  }).catch((error) => {
    // handle error
    console.log(error);
  })

  return selectionList
};
