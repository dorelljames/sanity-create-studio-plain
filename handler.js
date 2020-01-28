"use strict";

module.exports.createNewProject = (event, context, callback) => {
  const { APP_TOKEN } = process.env;
  const data = JSON.parse(event.body);

  return fetch("https://api.sanity.io/v1/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + APP_TOKEN
    },
    body: JSON.stringify({
      displayName: data && data.name
    })
  })
    .then(response => response.json())
    .then(response => {
      return response && response.error
        ? {
            statusCode: response.statusCode,
            body: JSON.stringify({
              message: `${response.error} - ${response.message}`
            })
          }
        : {
            statusCode: 201,
            body: JSON.stringify(response)
          };
    })
    .catch(error => ({
      statusCode: 500,
      message: error
    }));
};
