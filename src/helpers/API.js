import { notify } from "../components/notifications";
import { axiosInstance } from "../libraries/axiosInstance";

const errorHelper = (error, variant) => {
  if (error.response === undefined) {
    notify("Network Error");
    return false;
  }
  if (error.response.data.error !== "") {
    notify(error.response.data.error);
    return false;
  }
  if (error.response.statusText !== "") {
    notify(error.response.statusText);
    return false;
  }
};

class API {
  makeAGetCall = function(url, callback, options) {
    axiosInstance
      .get(url, options)
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        errorHelper(error);
      });
  };

  makeAPostCall = function(url, data, callback, options) {
    axiosInstance
      .post(url, data, options)
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        errorHelper(error);
      });
  };

  makeAPutCall = (path, data, callback) => {
    axiosInstance
      .put(path, data)
      .then(response => {
        return callback(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  makeADeleteCall = (path, data, callback) => {
    var config = {
      data: data
    };
    axiosInstance
      .delete(path, config)
      .then(response => {
        return callback(response);
      })
      .catch(error => {
        errorHelper(error);
      });
  };

  uploadFile = (path, file, callback) => {
    var formData = new FormData();
    formData.append("document", file);
    axiosInstance
      .post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(function(response) {
        callback(response.data);
      })
      .catch(function(error) {
        errorHelper(error);
      });
  };
}

const instance = new API();
export default instance;
